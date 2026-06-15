const spotifyService = require(
  "../services/spotify.services"
);

async function search(req, res) {
  try {
    const { q } = req.query;

    const token =
      req.headers.authorization?.split(
        " "
      )[1];

    const result =
      await spotifyService.searchSpotify(
        q,
        token
      );

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Spotify search failed",
    });
  }
}

async function playlists(req, res) {
  try {
    const token =
      req.headers.authorization?.split(
        " "
      )[1];

    const result =
      await spotifyService.getUserPlaylists(
        token
      );

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message:
        "Failed to get playlists",
    });
  }
}

module.exports = {
  search,
  playlists,
};