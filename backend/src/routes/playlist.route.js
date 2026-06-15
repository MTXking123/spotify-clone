const express = require(
  "express"
);

const router =
  express.Router();

const playlistController = require(
  "../controllers/playlist.contoller"
);

const authMiddleware = require(
  "../middlewares/auth.middlewares"
);

router.post(
  "/create",
  authMiddleware.authUser,
  playlistController.createPlaylist
);

router.get(
  "/",
  authMiddleware.authUser,
  playlistController.getPlaylists
);

router.get(
  "/:id",
  authMiddleware.authUser,
  playlistController.getPlaylistById
);

router.put(
  "/add-song",
  authMiddleware.authUser,
  playlistController.addSong
);

router.delete(
  "/remove-song",
  authMiddleware.authUser,
  playlistController.removeSong
);



module.exports = router;