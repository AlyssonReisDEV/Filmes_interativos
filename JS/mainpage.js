document.addEventListener('DOMContentLoaded', function () {
    let movieList = JSON.parse(localStorage.getItem("movieList")) || [];

    const addMovieButton = document.getElementById("add-movie-btn");

    addMovieButton.addEventListener("click", (e) => {
        e.preventDefault();

        // Pega os campos do forms
        const name = document.getElementById("movie-name").value.trim();
        const director = document.getElementById("movie-director").value.trim();
        const year = document.getElementById("movie-year").value.trim();
        const duration = document.getElementById("movie-duration").value.trim();
        const comments = document.getElementById("movie-comments").value.trim();
        const genre = document.getElementById("movie-genre").value;
        const image = document.getElementById("movie-image").value.trim();
        const ratingRadio = document.querySelector('input[name="movie-rating"]:checked');
        const rating = ratingRadio ? ratingRadio.value : "";

        if (!name || !director || !year || !duration || !comments || !genre || !rating) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const movie = {
            name,
            director,
            year,
            duration,
            comments,
            genre,
            rating,
            image,
            favorite: false
        };

        movieList.push(movie);
        saveMovieList();
        renderMovie(movie);
        clearForm();
    });

    function saveMovieList() {
        localStorage.setItem("movieList", JSON.stringify(movieList));
    }

    function clearForm() {
        document.getElementById("movie-name").value = "";
        document.getElementById("movie-director").value = "";
        document.getElementById("movie-year").value = "";
        document.getElementById("movie-duration").value = "";
        document.getElementById("movie-comments").value = "";
        document.getElementById("movie-genre").selectedIndex = 0;
        document.getElementById("movie-image").value = "";
        document.querySelectorAll('input[name="movie-rating"]').forEach(r => r.checked = false);
    }

    function renderMovie(movie) {
        let list = document.getElementById("movies");
        if (!list) {
            list = document.createElement("ul");
            list.id = "movies";
            document.querySelector("main").appendChild(list);
        }

        const listItem = document.createElement("li");
        listItem.className = "movie-item";

        if (movie.image) {
            const thumbnail = document.createElement("img");
            thumbnail.src = movie.image;
            thumbnail.alt = movie.name;
            thumbnail.className = "thumb";
            listItem.appendChild(thumbnail);
        }

        const title = document.createElement("span");
        title.className = "movie-title";
        title.textContent = `${movie.name} (${movie.year})`;
        listItem.appendChild(title);

        const statusSpan = document.createElement("span");
        statusSpan.className = "movie-status";
        statusSpan.textContent = " | Status: À assistir";

        const assistidoBtn = document.createElement("button");
        assistidoBtn.textContent = "Assistido";
        assistidoBtn.onclick = () => {
        
        };

        const aAssistirBtn = document.createElement("button");
        aAssistirBtn.textContent = "À assistir";
        aAssistirBtn.onclick = () => {
            statusSpan.textContent = " | Status: À assistir";
        };

        const favBtn = document.createElement("button");
        favBtn.textContent = movie.favorite ? "★ Favorito" : "☆ Favoritar";
        favBtn.onclick = () => {
            movie.favorite = !movie.favorite;
            favBtn.textContent = movie.favorite ? "★ Favorito" : "☆ Favoritar";
            saveMovieList();
        };

        listItem.appendChild(statusSpan);
        listItem.appendChild(assistidoBtn);
        listItem.appendChild(aAssistirBtn);
        listItem.appendChild(favBtn);

        listItem.addEventListener("click", () => showMovieModal(movie));
        list.appendChild(listItem);
    }

    function salvarComoAssistido(movie) {
        let assistidos = JSON.parse(localStorage.getItem('assistidos')) || [];
        assistidos.push(movie);
        localStorage.setItem('assistido', JSON.stringify(assistidos));
    }

    function showMovieModal(movie) {
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";

        const modal = document.createElement("div");
        modal.className = "modal";

        const closeButton = document.createElement("span");
        closeButton.className = "close-btn";
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => overlay.remove());
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) overlay.remove();
        });

        if (movie.image) {
            const modalImage = document.createElement("img");
            modalImage.src = movie.image;
            modalImage.alt = movie.name;
            modalImage.className = "modal-img";
            modal.appendChild(modalImage);
        }

        modal.innerHTML += `
            <h2>${movie.name}</h2>
            <p><strong>Diretor:</strong> ${movie.director}</p>
            <p><strong>Ano:</strong> ${movie.year}</p>
            <p><strong>Duração:</strong> ${movie.duration} min</p>
            <p><strong>Gênero:</strong> ${movie.genre}</p>
            <p><strong>Nota:</strong> ${"★".repeat(movie.rating)}${"☆".repeat(5 - movie.rating)}</p>
            <p><strong>Comentário:</strong> ${movie.comments}</p>
        `;

        modal.appendChild(closeButton);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    
    movieList.forEach(renderMovie);
});