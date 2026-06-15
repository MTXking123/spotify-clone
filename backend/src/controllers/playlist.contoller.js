const playlistModel = require(
  "../models/playlist.model"
);

async function createPlaylist(
  req,
  res
) {
  try {
    const { name, description } =
      req.body;

    const playlist =
      await playlistModel.create({
        name,
        description,
        owner: req.user._id,
      });

    return res.status(201).json(
      playlist
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getPlaylists(
  req,
  res
) {
  try {
    const playlists =
      await playlistModel
        .find({
          owner: req.user._id,
        })
        .populate(
          "musics"
        );

    return res.json(playlists);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getPlaylistById(
  req,
  res
) {
  try {
    const playlist =
      await playlistModel
        .findById(
          req.params.id
        )
        .populate({
          path: "musics",
          populate: {
            path: "artist",
            select:
              "username",
          },
        });

    return res.json(
      playlist
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function addSong(
  req,
  res
) {
  try {
    const {
      playlistId,
      musicId,
    } = req.body;

    const playlist =
      await playlistModel.findByIdAndUpdate(
        playlistId,
        {
          $addToSet: {
            musics:
              musicId,
          },
        },
        {
          new: true,
        }
      );

    return res.json(
      playlist
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function removeSong(
  req,
  res
) {
  try {
    const {
      playlistId,
      musicId,
    } = req.body;

    const playlist =
      await playlistModel.findByIdAndUpdate(
        playlistId,
        {
          $pull: {
            musics:
              musicId,
          },
        },
        {
          new: true,
        }
      );

    return res.json(
      playlist
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  addSong,
  removeSong,
};