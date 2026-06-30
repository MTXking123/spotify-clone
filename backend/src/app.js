const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.route");
const musicRoutes = require("./routes/music.route");
const playlistRoutes = require("./routes/playlist.route");

const app = express();

app.use(
  cors({
      origin: true,
      credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);
app.use("/playlist", playlistRoutes);


module.exports = app;

