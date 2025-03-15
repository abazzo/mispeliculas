let movies = [];

// Cargar películas desde el almacenamiento local al iniciar
function loadMovies() {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
        movies = JSON.parse(storedMovies);
    }
}

// Guardar películas en el almacenamiento local
function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movies));
}

// Función para agregar una película
document.getElementById('addMovieForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;
    const artMovement = document.getElementById('artMovement').value;
    const genre = document.getElementById('genre').value;

    const movie = {
        title,
        director,
        year,
        artMovement,
        genre,
        rating: 0,
        watched: false
    };

    movies.push(movie);
    saveMovies(); // Guardar en localStorage
    displayMovies();
    document.getElementById('addMovieForm').reset();
});

// Función para mostrar las películas
function displayMovies(filteredMovies = movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '<h2>Mis Películas</h2>';

    filteredMovies.forEach((movie, index) => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `
            <h3>${movie.title} (${movie.year})</h3>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Corriente Artística:</strong> ${movie.artMovement}</p>
            <p><strong>Género:</strong> ${movie.genre}</p>
            <p><strong>Vista:</strong> ${movie.watched ? 'Sí' : 'No'}</p>
            ${movie.watched ? `<p><strong>Calificación:</strong> ${movie.rating}</p>` : ''}
            <button onclick="markAsWatched(${index})">Marcar como vista</button>
            ${movie.watched ? `<input type="number" id="rating${index}" min="1" max="5" placeholder="Calificar (1-5)">
            <button onclick="rateMovie(${index})">Calificar</button>` : ''}
        `;
        movieList.appendChild(movieItem);
    });
}

// Función para marcar una película como vista
function markAsWatched(index) {
    movies[index].watched = true;
    saveMovies(); // Guardar en localStorage
    displayMovies();
}

// Función para calificar una película
function rateMovie(index) {
    const rating = document.getElementById(`rating${index}`).value;
    if (rating >= 1 && rating <= 5) {
        movies[index].rating = rating;
        saveMovies(); // Guardar en localStorage
        displayMovies();
    } else {
        alert('Por favor, ingresa una calificación válida (1-5).');
    }
}

// Función para filtrar películas
function filterMovies() {
    const title = document.getElementById('filterTitle').value.toLowerCase();
    const director = document.getElementById('filterDirector').value.toLowerCase();
    const year = document.getElementById('filterYear').value;
    const artMovement = document.getElementById('filterArtMovement').value.toLowerCase();
    const genre = document.getElementById('filterGenre').value.toLowerCase();

    const filteredMovies = movies.filter(movie => {
        return (movie.title.toLowerCase().includes(title) &&
               movie.director.toLowerCase().includes(director) &&
               (year === '' || movie.year == year) &&
               movie.artMovement.toLowerCase().includes(artMovement) &&
               movie.genre.toLowerCase().includes(genre));
    });

    displayMovies(filteredMovies);
}

// Cargar películas al iniciar la página
loadMovies();
displayMovies();