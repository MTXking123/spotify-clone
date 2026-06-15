const axios = require("axios");

async function searchSpotify(query, accessToken) {
  const response = await axios.get(
    "https://api.spotify.com/v1/search",
    {
      params: {
        q: query,
        type: "track,artist,album",
        limit: 20,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}

async function getUserPlaylists(accessToken) {
  const response = await axios.get(
    "https://api.spotify.com/v1/me/playlists",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}

module.exports = {
  searchSpotify,
  getUserPlaylists,
};