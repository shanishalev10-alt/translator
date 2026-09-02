const input = document.querySelector("input");
const form = document.querySelector("form");
const randomizeBtn = document.querySelector("#randomize-btn");
const translateBtn = document.querySelector("#translate-btn");
const meaningBtn = document.querySelector("#meaning-btn");
const errorP = document.querySelector("#error");
const translationP = document.querySelector("#translation");
const definitionP = document.querySelector("#definition");
const partOfSpeechP = document.querySelector("#partOfSpeech");
const synonymsP = document.querySelector("#synonyms");
const arrToTranslate = document.getElementsByClassName("translate");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

//when pressing randomize
randomizeBtn.addEventListener("click", () => {
  fetch(`http://localhost:3000/randomword`).then((response) => {
    response
      .json()
      .then((json) => {
        if (json.error) {
          errorP.textContent = json.error;
        } else {
          input.value = json.word;
          errorP.textContent = "";
        }
      })
      .catch((error) => {
        errorP.textContent = `Something went wrong: ${error.message}`;
      });
  });
});

//when pressing the dictionary btn
meaningBtn.addEventListener("click", () => {
  fetch(`http://localhost:3000/wordmeaning?word=${input.value}`).then(
    (response) => {
      response
        .json()
        .then((json) => {
          if (json.error) {
            errorP.textContent = json.error;
          } else {
            definitionP.textContent = `Definition: ${json.word.entries[0].senses[0].definition} `;
            partOfSpeechP.textContent = `Part of speech: ${json.word.entries[0].partOfSpeech}`;
            synonymsP.textContent = `Synonyms: ${json.word.entries[0].synonyms.slice(0, 3).join(", ")}`;
            errorP.textContent = "";
          }
        })
        .catch((error) => {
          errorP.textContent = `Something went wrong: ${error.message}`;
        });
    },
  );
});

// when pressing translate btn
translateBtn.addEventListener("click", () => {
  if (definitionP.textContent === "") {
    return (errorP.textContent =
      "Please first get the meaning of the word, then try again.");
  }
  
  const textToTranslate = Array.from(arrToTranslate)
    .map((item) => item.textContent)
    .join("!");

  fetch(`http://localhost:3000/translate?text=${encodeURI(textToTranslate)}`)
    .then((response) => {
      response.json().then((json) => {
        if (json.error) {
          errorP.textContent = json.error;
        } else {
          errorP.textContent = "";

          for (let i = 0; i < arrToTranslate.length; i++) {
            arrToTranslate[i].textContent = json.text[i].text;
          }
        }
      });
    })
    .catch((error) => {
      errorP.textContent = `Something went wrong: ${error.message}`;
    });
});
