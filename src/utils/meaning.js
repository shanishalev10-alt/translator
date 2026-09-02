const { default: axios } = require("axios");

const meaning = (word, callback) => {
  const url = `https://freedictionaryapi.com/api/v1/entries/en/${word}`;

  axios
    .get(url)
    .then((response = undefined) => {
      if (response.data.entries.length === 0) {
        return callback("Could not find the word.", undefined);
      }

      callback(undefined, response);
    })
    .catch((error) => {
      if (error.isAxiosError) {
        callback(
          "Unable to connect to the service, check your internet connection.",
          undefined,
        );
      } else {
        callback("Something went wrong", undefined);
      }
    });
};

module.exports = meaning;
