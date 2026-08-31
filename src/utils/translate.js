const { default: axios } = require("axios");
const deepl = require("deepl-node");

const endLang = "es"
const sourceLang = "en"

const randomWord = (text, callback) => {
  const url = `https://random-word-api.herokuapp.com/${encodeURI(text)}`;


  const authKey = "302dfd3e-a947-419f-a160-13d3abc2c23b:fx"; // replace with your key
  const deeplClient = new deepl.DeepLClient(authKey);

  (async () => {
    await deeplClient.translateText(
      text,
      sourceLang,
      endLang,
    ).then((result) => {
      
    callback(undefined, result);
    })
  })();
};

module.exports = randomWord;
