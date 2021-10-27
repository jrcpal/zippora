"use strict";

const express = require('express');
const app = require("./app.js");
const { PORT } = require("./config");
app.use(express.static("../frontend/build/index.html"))
app.get("/", (res,req) => {
  res.send({"message":"Hello?"})
})
app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});