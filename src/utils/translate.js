const deepl = require("deepl-node");

const endLang = "he";
const sourceLang = "en";

const translate = (text, callback) => {
  const authKey = "302dfd3e-a947-419f-a160-13d3abc2c23b:fx";
  const deeplClient = new deepl.DeepLClient(authKey);

  (async () => {
    await deeplClient
      .translateText(text.split("!"), sourceLang, endLang)
      .then((response) => {
        callback(undefined, response);
      })
      .catch((error) => {
        if (
          error.message.includes(
            "texts parameter must be a non-empty string or array of non-empty strings",
          )
        ) {
          callback(
            "Unable to connect to the service, check your internet connection.",
            undefined,
          );
        }
      });
  })();
};

module.exports = translate;
