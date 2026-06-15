const express = require("express");

const spotifyController = require(
  "../controllers/spotify.controller"
);

const router = express.Router();

router.get(
  "/search",
  spotifyController.search
);

router.get(
  "/playlists",
  spotifyController.playlists
);

module.exports = router;