const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "artist"],
      default: "user",
    },

    spotifyId: String,

    profileImage: String,

    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "music",
      },
    ],

    followedArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    recentlyPlayed: [
      {
        music: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "music",
        },

        playedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "user",
  userSchema
);