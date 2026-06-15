const musicModel = require("../models/music.model");
const uploadFile = require("../services/storage.services");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {
  const { title } = req.body;
  const musicFile = req.files.music?.[0];

  const coverFile = req.files.cover?.[0];

  console.log(musicFile);
  console.log(coverFile);

 const musicResult = await uploadFile(
  musicFile.buffer.toString("base64")
);

const coverResult = await uploadFile(
  coverFile.buffer.toString("base64")
);

  const music = await musicModel.create({
    uri: musicResult.url,
    coverImage: coverResult.url,
    title,
    artist: req.user.id
})

  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function createAlbum(req, res) {
  const album = await albumModel.create({
    title,
    artist: req.user.id,
    music: musicIds,
  });

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      uri: album.uri,
      title: album.title,
      artist: album.artist,
    },
  });
}

async function getAllMusics(req, res) {
  const musics = await musicModel
    .find()
    .limit(20)
    .populate("artist", "username email");

  res.status(200).json({
    message: "Musics Fetched Successfully",
    musics: musics,
  });
}

async function getAllAlbums(req, res) {
  const musics = await musicModel
    .find()
    .select("title artist")
    .populate("artist", "username email");

  res.status(200).json({
    message: "Albums Fetched Successfully",
    musics: musics,
  });
}

async function getAlbumById(req, res) {
  try {
    const album = await albumModel
      .findById(req.params.id)
      .populate({
        path: "artist",
        select: "username",
      })
      .populate({
        path: "musics",
        populate: {
          path: "artist",
          select: "username",
        },
      });

    if (!album) {
      return res.status(404).json({
        message: "Album not found",
      });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function likeSong(req, res) {
  try {
    const musicId = req.params.id;

    const userId = req.user._id;

    await userModel.findByIdAndUpdate(userId, {
      $addToSet: {
        likedSongs: musicId,
      },
    });

    res.status(200).json({
      message: "Song liked successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
}

async function addRecentlyPlayed(req, res) {
  try {
    const userId = req.user._id;

    const musicId = req.params.id;

    await userModel.findByIdAndUpdate(userId, {
      $push: {
        recentlyPlayed: {
          music: musicId,
          playedAt: new Date(),
        },
      },
    });

    res.status(200).json({
      message: "Added to recently played",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
}

async function playMusic(req, res) {
  try {
    const musicId = req.params.id;

    await musicModel.findByIdAndUpdate(musicId, {
      $inc: {
        plays: 1,
      },
    });

    await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        recentlyPlayed: {
          music: musicId,
        },
      },
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function getArtistProfile(req, res) {
  try {
    const artistId = req.params.id;

    const artist = await userModel.findById(artistId);

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found",
      });
    }

    const songs = await musicModel
      .find({
        artist: artistId,
      })
      .populate("artist", "username");

    const albums = await albumModel.find({
      artist: artistId,
    });

    const totalPlays = songs.reduce(
      (total, song) => total + (song.plays || 0),
      0,
    );

    res.json({
      artist,
      songs,
      albums,
      totalSongs: songs.length,
      totalAlbums: albums.length,
      totalPlays,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function search(req, res) {
  try {
    const query = req.params.query;

    const songs = await musicModel
      .find({
        title: {
          $regex: query,
          $options: "i",
        },
      })
      .populate("artist", "username");

    const albums = await albumModel.find({
      title: {
        $regex: query,
        $options: "i",
      },
    });

    const artists = await userModel.find({
      username: {
        $regex: query,
        $options: "i",
      },

      role: "artist",
    });

    res.json({
      songs,
      albums,
      artists,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function getRecentlyPlayed(req, res) {
  try {
    const user = await userModel.findById(req.user._id).populate({
      path: "recentlyPlayed.music",
      populate: {
        path: "artist",
        select: "username",
      },
    });

    return res.status(200).json(user.recentlyPlayed);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getArtists(req, res) {
  try {
    const artists = await userModel.find({
      role: "artist",
    });

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
  likeSong,
  addRecentlyPlayed,
  playMusic,
  getArtistProfile,
  search,
  getRecentlyPlayed,
  getArtists,
};
