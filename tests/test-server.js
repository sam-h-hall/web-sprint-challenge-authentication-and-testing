const express = require("express");
const testServer = express();

testServer.get("/api/jokes", (req, res) => {
  res.send(200);
});

module.exports = testServer;
