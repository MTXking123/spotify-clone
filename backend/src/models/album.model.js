const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    musics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "music",
      },
    ],

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "album",
  albumSchema
);