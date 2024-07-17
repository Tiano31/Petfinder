const clientId = '3129c9d56d8f4740bbaa05fd4e532563';
const clientSecret = 'd7b9f33b335f49a3b536f084b35061be';

document.getElementById('search').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

document.getElementById('search-btn').addEventListener('click', function() {
    performSearch();
});
 
async function performSearch() {
    const query = document.getElementById('search').value;
    if (query.trim() !== "") {
        try {
            const token = await fetchToken();
            await searchArtists(token, query);
        } catch (error) {
            console.error('Error during search:', error);
        }
    } else {
        document.getElementById('results').innerHTML = ''; // Clear results if the input is empty
    }
}

async function fetchToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch token');
    }

    const data = await response.json();
    return data.access_token;
}

async function searchArtists(token, query) {
    const response = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(query)}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch artists');
    }

    const data = await response.json();
    console.log('Artists Data:', data); // Log the artist data to the console
    displayResults(data.artists.items);
}

function displayResults(artists) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    if (artists.length === 0) {
        results.textContent = 'No artists found.';
        return;
    }

    artists.forEach(artist => {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = artist.images.length > 0 ? artist.images[0].url : 'default_image_url'; // Replace with a default image URL if needed
        img.alt = artist.name;
        li.appendChild(img);

        const text = document.createElement('span');
        text.textContent = artist.name;
        li.appendChild(text);

        li.addEventListener('click', () => {
            window.location.href = `artist.html?artistId=${artist.id}&artistName=${encodeURIComponent(artist.name)}`;
        });
        results.appendChild(li);
    });
}
