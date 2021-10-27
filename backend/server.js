"use strict";

const app = require("./app.js");
const { PORT } = require("./config");
app.get("/", (res,req) => {
  res.send({"message":"Hello?"})
})
app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
