const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: String,

    coverImage: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    musics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "music",
      },
    ],

    spotifyId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "playlist",
  playlistSchema
);