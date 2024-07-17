Group Leader: 
Manuel Villanueva

Group Members:
Jerome Bautista and 
Christian Villaveza

Link: https://tiano31.github.io/Spotify/

Spotify Artist Search Documentation
Overview
The Spotify Artist Search project allows users to search for artists on Spotify, view their top tracks, and redirect to their Spotify profile. The application utilizes the Spotify Web API to interact with Spotify's music catalog and retrieve artist information.

Features
Search for Artists: Users can search for artists by name.
View Top Tracks: Displays the top tracks for a selected artist.
Redirect to Music: Provides a link to the artist’s Spotify profile for further exploration.
API
1. Spotify Web API
The main API used in this project is the Spotify Web API. This API provides endpoints for accessing Spotify's catalog of music, including artist information and track details.

Key Endpoints Used
Search for an Artist

Endpoint: GET https://api.spotify.com/v1/search

Parameters:

q: Search query (artist name)
type: Type of search (set to artist)
limit: Number of results to return (optional)
Example Request:

http
Copy code
GET https://api.spotify.com/v1/search?q=artistName&type=artist&limit=1
Get Top Tracks of an Artist

Endpoint: GET https://api.spotify.com/v1/artists/{id}/top-tracks

Parameters:

id: Artist ID
market: Market code (e.g., US)
Example Request:

http
Copy code
GET https://api.spotify.com/v1/artists/{id}/top-tracks?market=US
Get Artist’s Spotify Profile

Endpoint: GET https://api.spotify.com/v1/artists/{id}

Parameters:

id: Artist ID
Example Request:

http
Copy code
GET https://api.spotify.com/v1/artists/{id}
2. Authentication
To access the Spotify Web API, you need an OAuth token. You can obtain the token using the Client Credentials Flow.

Authorization Endpoint: POST https://accounts.spotify.com/api/token

Parameters:

grant_type: Set to client_credentials
client_id: Your Spotify API client ID
client_secret: Your Spotify API client secret
Example Request:

http
Copy code
POST https://accounts.spotify.com/api/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64encoded(client_id:client_secret)}

grant_type=client_credentials
3. API Keys
To use the Spotify Web API, you must obtain your Client ID and Client Secret from the Spotify Developer Dashboard.

Repository Structure
1. /src Directory
app.js: Main application file.
routes.js: Defines API endpoints and their handlers.
spotify.js: Handles communication with the Spotify Web API.
views/: Contains HTML templates for the frontend.
2. /public Directory
styles.css: Contains styles for the application’s frontend.
scripts.js: Contains frontend JavaScript for interactivity.
3. /config Directory
config.js: Stores configuration settings, including API keys and other constants.
4. /tests Directory
spotify.test.js: Contains test cases for the Spotify API integration.
Getting Started
Clone the Repository
bash
Copy code
git clone https://github.com/Tiano31/Spotify.git
cd Spotify


makefile
Copy code
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret

Open your browser and navigate to https://tiano31.github.io/Spotify/.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Contributions are welcome! Please submit a pull request or open an issue for discussion.

Feel free to adjust the details based on the specifics of your project!
