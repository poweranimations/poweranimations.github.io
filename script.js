document.addEventListener("DOMContentLoaded", () => {
    loadFeaturedGames();
    loadSocialFeed();
    initializeCarousel();
});

async function loadFeaturedGames() {
    const gameGrid = document.querySelector('.game-grid');
    const defaultImage = 'path/to/placeholder-image.jpg'; // Placeholder image path

    const games = [
        { title: "Game One", image: "C:\Users\gamer\OneDrive\Pictures\Screenshots\Smear.png", rating: "★★★★☆" },
        { title: "Game Two", image: "", rating: "★★★★★" },
        { title: "Game Three", image: "", rating: "★★★☆☆" },
    ];

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        const gameImage = game.image ? game.image : defaultImage;
        gameCard.innerHTML = `
            <img src="${gameImage}" alt="${game.title}" />
            <h3>${game.title}</h3>
            <p>Rating: ${game.rating}</p>
            <button>View Details</button>
        `;
        gameGrid.appendChild(gameCard);
    });
}

function loadSocialFeed() {
    const feedContainer = document.querySelector('.feed-container');

    const posts = [
        { developer: "Developer A", message: "Check out our new game release!" },
        { developer: "Developer B", message: "Update on the upcoming expansion!" },
        { developer: "Developer C", message: "We just launched a new trailer!" },
    ];

    posts.forEach(post => {
        const feedPost = document.createElement('div');
        feedPost.className = 'feed-post';
        feedPost.innerHTML = `
            <p><strong>${post.developer}:</strong> ${post.message}</p>
            <button>Like</button>
            <button>Comment</button>
        `;
        feedContainer.appendChild(feedPost);
    });
}

function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    showImage(currentIndex);
}
