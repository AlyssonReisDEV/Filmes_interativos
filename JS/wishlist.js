document.addEventListener("DOMContentLoaded", () => {
    const movies = JSON.parse(localStorage.getItem("movieList")) || [];
    const favoriteMovies = movies.filter(movie => movie.favorite);

    const list = document.createElement("ul");
    list.id = "favorite-movies";
    document.querySelector("main").appendChild(list);

    favoriteMovies.forEach(movie => {
        const listItem = document.createElement("li");
        listItem.className = "movie-item";

        if (movie.image) {
            const img = document.createElement("img");
            img.src = movie.image;
            img.alt = movie.name;
            img.className = "thumb";
            listItem.appendChild(img);
        }

        const title = document.createElement("span");
        title.className = "movie-title";
        title.textContent = `${movie.name} (${movie.year})`;
        listItem.appendChild(title);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remover dos Favoritos";
        removeBtn.onclick = () => {
            movie.favorite = false;
            localStorage.setItem("movieList", JSON.stringify(movies));
            listItem.remove();
        };

        listItem.appendChild(removeBtn);
        list.appendChild(listItem);
    });
});