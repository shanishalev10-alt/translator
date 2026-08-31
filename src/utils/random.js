const { default: axios } = require("axios");

const randomWord = (callback) => {
  const url = "https://random-word-api.herokuapp.com/word";

  axios
    .get(url)
    .then((response = undefined) => { console.log(response); callback(undefined, response)})
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

module.exports = randomWord;
