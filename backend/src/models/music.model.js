const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema(
  {
    uri: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 0,
    },

    plays: {
      type: Number,
      default: 0,
    },

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "album",
    },

    genre: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "music",
  musicSchema
);