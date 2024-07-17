const clientId = '3129c9d56d8f4740bbaa05fd4e532563';
const clientSecret = 'd7b9f33b335f49a3b536f084b35061be';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('artistId');

    if (artistId) {
        fetchToken().then(token => {
            fetchArtistInfo(token, artistId);
            fetchTopTracks(token, artistId);
        }).catch(error => {
            console.error('Error fetching token or artist data:', error);
        });
    } else {
        console.error('No artist ID found in URL');
    }
});

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

async function fetchArtistInfo(token, artistId) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch artist info');
    }

    const artist = await response.json();
    console.log('Artist Info:', artist);
    displayArtistInfo(artist);
}

function displayArtistInfo(artist) {
    const artistName = document.querySelector('header h1');
    const artistImage = document.getElementById('artist-image');

    artistName.textContent = artist.name;
    if (artist.images && artist.images.length > 0) {
        artistImage.src = artist.images[0].url;
    } else {
        artistImage.src = 'https://via.placeholder.com/300';  // Placeholder image URL
    }
}

async function fetchTopTracks(token, artistId) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch top tracks');
    }

    const data = await response.json();
    console.log('Top Tracks:', data.tracks);
    displayTopTracks(data.tracks);
}

function displayTopTracks(tracks) {
    const trackList = document.getElementById('track-list');
    trackList.innerHTML = '';

    if (!tracks || tracks.length === 0) {
        trackList.innerHTML = '<li>No top tracks available</li>';
        return;
    }

    tracks.forEach(track => {
        const li = document.createElement('li');

        // Track details
        const trackName = document.createElement('span');
        trackName.textContent = track.name;

        // Track image
        const trackImage = document.createElement('img');
        trackImage.src = track.album.images[0]?.url || 'https://via.placeholder.com/50';
        trackImage.alt = track.name;
        trackImage.style.width = '50px';
        trackImage.style.height = '50px';
        trackImage.style.marginRight = '10px';

        // Append elements to the list item
        li.appendChild(trackImage);
        li.appendChild(trackName);

        // Add click event to redirect to track page
        li.addEventListener('click', () => {
            window.location.href = `https://open.spotify.com/track/${track.id}`; // Redirect to Spotify track page
        });

        trackList.appendChild(li);
    });
}