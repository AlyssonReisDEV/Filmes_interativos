const addMovieButton = document.getElementById("add-movie-btn");

addMovieButton.addEventListener("click", () => {
    // Pega os campos do forms
    const nameField = document.getElementById("movie-name");
    const genreField = document.getElementById("movie-genre");
    const ratingField = document.getElementById("movie-rating");
    const imageField = document.getElementById("movie-image");
// Pega os valores digitados
    const name = namerField.value.trim();
    const genre = genreField.value;
    const rating = ratingField.value.trim();
    const image = imageField.value.trim();
// Verificação dos campos obrigatórios
    if (!name || !genre || !rating) {
        alert("Por favor, preencha todos os campos obrigat´rios.");
        return;
    }
// Cria o objeto do filme
    const movie = { name, genre, rating, image };
// Função para adicionar o filme à lista
    renderMovie(movie);
// Limpa os campos após adicionar o filme
    nameField.value = "";
    genreField.value = "";
    ratingField.value = "";
    imageField.value = "";
});

function renderMovie(movie){
    const list = document.getElementById("movies");
    const listItem = document.getElementById("li");
    listItem.className = "movie-item";
// Adiciona a imagem se o ul for preenchido
    const thumbnail = document.createElement("img");
    thumbnail.src = movie-image;
    thumbnail.alt = movie.name;
    thumbnail.className = "thumb";

    const title = document.getElementById("span");
    title.className = "movie-title";
    title.textContent = mpvie.name;

    listItem.appendChild(thumbnail);
    listItem.appendChild(title);
// Abre o modal ao clicar no filme
    listItem.addEventListenner("click", () => showMovieModal(movie));
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
        if (movie.image){
    const modalImage = document.createElement("img");
    modalImage.src = movie.image;
    modalImage.alt = movie.name;
    modalImage.className = "modal-img";
        }

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = movie.name;

    const modalGenre = document.createElement("p");
modalGenre.innerHTML = `<strong>Gênero</strong> ${movie.genre}`;

    const modalRating = document.createElement("p");
    modalGenre.innerHTML = `<strong>Nota:</strong> ${movie.rating}`;
// Fecha o modal clicando no X
    closeButton.addEventListener("click", () => overlay.remove());
    // Fecha o modal cliando fora dele 
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) overlay.remove();
    });
// Monta o conteúdo do modal
    modal.appendChild(closeButton);
    modal.appendChild(modalImage);
    modal.appendChild(modalTitle);
    modal.appendChild(modalGenre);
    modal.appendChild(modalRating);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}
