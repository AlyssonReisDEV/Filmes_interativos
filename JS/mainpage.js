document.addEventListener('DOMContentLoaded', function () {
    let movieList = [];

    // Função para salvar no localStorage
    function saveMovieList() {
        localStorage.setItem("movieList", JSON.stringify(movieList));
    }

    // Função para limpar o formulário
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

    // Função para renderizar a lista de filmes (usada para filtros e reordenação)
    function renderMovieList(filmes) {
        let list = document.getElementById("movies");
        if (!list) {
            list = document.createElement("ul");
            list.id = "movies";
            document.querySelector("main").appendChild(list);
        }
        list.innerHTML = ""; // Limpa antes de renderizar
        filmes.forEach((movie, idx) => renderMovie(movie, idx, filmes));
    }

    // Função para renderizar um filme individual
    function renderMovie(movie, idx, filmesArr) {
        let list = document.getElementById("movies");
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

        // Status
        const statusSpan = document.createElement("span");
        statusSpan.className = "movie-status";
        if (movie.status === "assistido") {
            listItem.classList.add("assistido");
            statusSpan.textContent = " | Status: Assistido";
        } else {
            statusSpan.textContent = " | Status: À assistir";
        }

        // Botões de status
        const assistidoBtn = document.createElement("button");
        assistidoBtn.textContent = "Assistido";
        assistidoBtn.onclick = () => {
            statusSpan.textContent = " | Status: Assistido";
            listItem.classList.add("assistido");
            movie.status = "assistido";
            saveMovieList();
            fetch(`http://localhost:3000/filmes/${movie.id || movie.name}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "assistido" })
            });
        };

        const aAssistirBtn = document.createElement("button");
        aAssistirBtn.textContent = "À assistir";
        aAssistirBtn.onclick = () => {
            statusSpan.textContent = " | Status: À assistir";
            listItem.classList.remove("assistido");
            movie.status = "aAssistir";
            saveMovieList();
            fetch(`http://localhost:3000/filmes/${movie.id || movie.name}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "aAssistir" })
            });
        };

        // Botão de favorito
        const favBtn = document.createElement("button");
        favBtn.textContent = movie.favorite ? "★ Favorito" : "☆ Favoritar";
        favBtn.onclick = () => {
            movie.favorite = !movie.favorite;
            favBtn.textContent = movie.favorite ? "★ Favorito" : "☆ Favoritar";
            saveMovieList();
        };

        // Botões de mover
        const upBtn = document.createElement("button");
        upBtn.textContent = "↑";
        upBtn.title = "Mover para cima";
        upBtn.onclick = () => {
            if (idx > 0) {
                [movieList[idx - 1], movieList[idx]] = [movieList[idx], movieList[idx - 1]];
                saveMovieList();
                renderMovieList(movieList);
            }
        };

        const downBtn = document.createElement("button");
        downBtn.textContent = "↓";
        downBtn.title = "Mover para baixo";
        downBtn.onclick = () => {
            if (idx < filmesArr.length - 1) {
                [movieList[idx + 1], movieList[idx]] = [movieList[idx], movieList[idx + 1]];
                saveMovieList();
                renderMovieList(movieList);
            }
        };

        // Adiciona elementos ao item
        listItem.appendChild(statusSpan);
        listItem.appendChild(assistidoBtn);
        listItem.appendChild(aAssistirBtn);
        listItem.appendChild(favBtn);
        listItem.appendChild(upBtn);
        listItem.appendChild(downBtn);

        // Modal ao clicar (exceto nos botões)
        listItem.addEventListener("click", (event) => {
            if ([assistidoBtn, aAssistirBtn, favBtn, upBtn, downBtn].includes(event.target)) return;
            showMovieModal(movie);
        });

        list.appendChild(listItem);
    }

    // Função para mostrar o modal
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

    // Carrega filmes do backend ou do localStorage
    function loadMovies() {
        fetch("http://localhost:3000/filmes")
            .then(res => {
                if (!res.ok) throw new Error("Backend offline");
                return res.json();
            })
            .then(filmes => {
                movieList = filmes;
                renderMovieList(movieList);
            })
            .catch(() => {
                movieList = JSON.parse(localStorage.getItem("movieList")) || [];
                renderMovieList(movieList);
            });
    }

    // Adiciona filme novo
    const addMovieButton = document.getElementById("add-movie-btn");
    addMovieButton.addEventListener("click", (e) => {
        e.preventDefault();

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
            favorite: false,
            status: "aAssistir"
        };

        movieList.push(movie);
        saveMovieList();
        renderMovieList(movieList);
        clearForm();

        // Envia o filme para o backend
        fetch("http://localhost:3000/filmes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movie),
        })
        .then((res) => {
            if (!res.ok) throw new Error("Erro ao enviar filme para o backend");
            console.log("Filme enviado com sucesso para o backend!");
        })
        .catch((err) => {
            console.error("Erro ao enviar para o backend:", err);
        });
    });

    // FILTROS
    // Exemplo: Adicione no HTML botões ou selects com esses IDs
    const filtroTodos = document.getElementById("filtro-todos");
    const filtroAssistidos = document.getElementById("filtro-assistidos");
    const filtroAAssistir = document.getElementById("filtro-aAssistir");
    const filtroGenero = document.getElementById("filtro-genero");

    if (filtroTodos) filtroTodos.onclick = () => renderMovieList(movieList);
    if (filtroAssistidos) filtroAssistidos.onclick = () => renderMovieList(movieList.filter(f => f.status === "assistido"));
    if (filtroAAssistir) filtroAAssistir.onclick = () => renderMovieList(movieList.filter(f => f.status !== "assistido"));
    if (filtroGenero) filtroGenero.onchange = (e) => {
        const genero = e.target.value;
        if (!genero) renderMovieList(movieList);
        else renderMovieList(movieList.filter(f => f.genre === genero));
    };

    // Carrega os filmes ao iniciar
    loadMovies();
});