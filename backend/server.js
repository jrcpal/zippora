"use strict";

const express = require('express');
const app = require("./app.js");
const { PORT } = require("./config");



app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});