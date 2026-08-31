const path = require("path");
const express = require("express");
const hbs = require("hbs");
const randomWord = require("./utils/random");
const meaning = require("./utils/meaning");
const translate = require("./utils/translate");

const app = express();

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {});
});

app.get("/randomword", (req, res) => {
  randomWord((error, { data } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send({ word: data[0] });
  });
});

app.get("/wordmeaning", (req, res) => {
  const word = req.query.word;

  if (!word) {
    return res.send({
      error: "You must provide a valid word",
    });
  }

  meaning(word, (error, { data } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send({ word: data });
  });
});

app.get("/translate", (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.send({
      error: "You must provide valid text",
    });
  }

  translate(text, (error, result) => {
    if (error) {
      return res.send({
        error,
      });
    }

    res.send({ text: result });
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
