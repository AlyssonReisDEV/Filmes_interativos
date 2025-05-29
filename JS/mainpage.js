document.addEventListener('DOMContentLoaded', function() {
    const addMovieButton = document.getElementById("add-movie-btn");

    addMovieButton.addEventListener("click", (e) => {
        e.preventDefault();

        // Pega os campos do forms
        const nameField = document.getElementById("movie-name");
        const directorField = document.getElementById("movie-director");
        const yearField = document.getElementById("movie-year");
        const durationField = document.getElementById("movie-duration");
        const commentsField = document.getElementById("movie-comments");
        const genreField = document.getElementById("movie-genre");
        const imageField = document.getElementById("movie-image");

        // Pega o valor da estrela selecionada
        const ratingRadio = document.querySelector('input[name="movie-rating"]:checked');
        const rating = ratingRadio ? ratingRadio.value : "";

        // Pega os valores digitados
        const name = nameField.value.trim();
        const director = directorField.value.trim();
        const year = yearField.value.trim();
        const duration = durationField.value.trim();
        const comments = commentsField.value.trim();
        const genre = genreField.value;
        const image = imageField ? imageField.value.trim() : "";

        // Verificação dos campos obrigatórios
        if (!name || !director || !year || !duration || !comments || !genre || !rating) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Cria o objeto do filme
        const movie = { name, director, year, duration, comments, genre, rating, image };

        // Função para adicionar o filme à lista
        renderMovie(movie);

        // Limpa os campos após adicionar o filme
        nameField.value = "";
        directorField.value = "";
        yearField.value = "";
        durationField.value = "";
        commentsField.value = "";
        genreField.selectedIndex = 0;
        if (imageField) imageField.value = "";
        document.querySelectorAll('input[name="movie-rating"]').forEach(r => r.checked = false);
    });

    function renderMovie(movie) {
        let list = document.getElementById("movies");
        if (!list) {
            list = document.createElement("ul");
            list.id = "movies";
            document.querySelector("main").appendChild(list);
        }
        const listItem = document.createElement("li");
        listItem.className = "movie-item";

        // Imagem
        if (movie.image) {
            const thumbnail = document.createElement("img");
            thumbnail.src = movie.image;
            thumbnail.alt = movie.name;
            thumbnail.className = "thumb";
            listItem.appendChild(thumbnail);
        }

        // Título
        const title = document.createElement("span");
        title.className = "movie-title";
        title.textContent = `${movie.name} (${movie.year})`;
        listItem.appendChild(title);

        // Botões de status
        const statusSpan = document.createElement("span");
        statusSpan.className = "movie-status";
        statusSpan.textContent = " | Status: À assistir";

        const assistidoBtn = document.createElement("button");
        assistidoBtn.textContent = "Assistido";
        assistidoBtn.type = "button";
        assistidoBtn.onclick = () => {
            statusSpan.textContent = " | Status: Assistido";
        };

        const aAssistirBtn = document.createElement("button");
        aAssistirBtn.textContent = "À assistir";
        aAssistirBtn.type = "button";
        aAssistirBtn.onclick = () => {
            statusSpan.textContent = " | Status: À assistir";
        };

        listItem.appendChild(statusSpan);
        listItem.appendChild(assistidoBtn);
        listItem.appendChild(aAssistirBtn);

        // Abre o modal ao clicar no filme
        listItem.addEventListener("click", () => showMovieModal(movie));
        list.appendChild(listItem);
    }

    function showMovieModal(movie) {
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";

        const modal = document.createElement("div");
        modal.className = "modal";

        const closeButton = document.createElement("span");
        closeButton.className = "close-btn";
        closeButton.innerHTML = "&times;";

        // Adiciona a imagem no modal
        if (movie.image) {
            const modalImage = document.createElement("img");
            modalImage.src = movie.image;
            modalImage.alt = movie.name;
            modalImage.className = "modal-img";
            modal.appendChild(modalImage);
        }

        const modalTitle = document.createElement("h2");
        modalTitle.textContent = movie.name;

        const modalDirector = document.createElement("p");
        modalDirector.innerHTML = `<strong>Diretor:</strong> ${movie.director}`;

        const modalYear = document.createElement("p");
        modalYear.innerHTML = `<strong>Ano:</strong> ${movie.year}`;

        const modalDuration = document.createElement("p");
        modalDuration.innerHTML = `<strong>Duração:</strong> ${movie.duration} min`;

        const modalGenre = document.createElement("p");
        modalGenre.innerHTML = `<strong>Gênero:</strong> ${movie.genre}`;

        const modalRating = document.createElement("p");
        modalRating.innerHTML = `<strong>Nota:</strong> ${"★".repeat(movie.rating)}${"☆".repeat(5 - movie.rating)}`;

        const modalComments = document.createElement("p");
        modalComments.innerHTML = `<strong>Comentário:</strong> ${movie.comments}`;

        // Fecha o modal clicando no X
        closeButton.addEventListener("click", () => overlay.remove());
        // Fecha o modal clicando fora dele 
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) overlay.remove();
        });

        // Monta o conteúdo do modal
        modal.appendChild(closeButton);
        modal.appendChild(modalTitle);
        modal.appendChild(modalDirector);
        modal.appendChild(modalYear);
        modal.appendChild(modalDuration);
        modal.appendChild(modalGenre);
        modal.appendChild(modalRating);
        modal.appendChild(modalComments);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }
});
