import express from "express";

const debug = require("debug")("server");

const app = express();

const PORT = process.env.PORT || 4041;
app.listen(PORT, () => debug("Server running on port " + PORT));
