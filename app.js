const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

const convertToJson = require("./controllers/convert");

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.post("/convert", convertToJson);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening ion port " + port);
});
