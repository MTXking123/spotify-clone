const express = require("express");
const musicController = require("../controllers/music.controller");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});
router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.fields([
    {
      name: "music",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
  ]),
  musicController.createMusic,
);

router.post("/album", authMiddleware.authArtist, musicController.createAlbum);

router.get("/", authMiddleware.authUser, musicController.getAllMusics);

router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);

router.get(
  "/albums/:id",
  authMiddleware.authUser,
  musicController.getAlbumById,
);

router.post("/:id/like", authMiddleware.authUser, musicController.likeSong);

router.post("/:id/play", authMiddleware.authUser, musicController.playMusic);

router.get(
  "/artist/me",
  authMiddleware.authArtist,
  musicController.getMyArtistProfile,
);

router.get("/artist/:id", musicController.getArtistProfile);

router.get("/search/:query", authMiddleware.authUser, musicController.search);

router.get(
  "/recent",
  authMiddleware.authUser,
  musicController.getRecentlyPlayed,
);

router.get("/song/:id", authMiddleware.authUser, musicController.getMusicById);

router.get("/artists", authMiddleware.authUser, musicController.getArtists);

router.get(
  "/suggest/:query",
  authMiddleware.authUser,
  musicController.getSuggestions
);



module.exports = router;
