console.log("client side js is up");

const input = document.querySelector("input");
const randomizeBtn = document.querySelector("#randomize-btn");
const translateBtn = document.querySelector("#translate-btn");
const meaningBtn = document.querySelector("#meaning-btn");
const errorP = document.querySelector("#error");
const translationP = document.querySelector("#translation");
const meaningP = document.querySelector("#meaning");

//when pressing randomize
randomizeBtn.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(`http://localhost:3000/randomword`).then((response) => {
    response.json().then((json) => {
        console.log(json)
      if (json.error) {
        //add error message
        errorP.textContent = json.error;
      } else {
        input.value = json.word;
        errorP.textContent = "";
      }
    });
  });
});

//when pressing the dictionary btn
meaningBtn.addEventListener("click", (event) => {
  event.preventDefault();

  meaningBtn.textContent = "Loading meaning...";

  fetch(`http://localhost:3000/wordmeaning?word=${input.value}`).then(
    (response) => {
      response.json().then((json) => {
        if (json.error) {
          errorP.textContent = json.error;
        } else {
          meaningP.textContent = `Definition: ${json.word.entries[0].senses[0].definition} Part of speech: 
          ${json.word.entries[0].partOfSpeech} Synonyms: ${json.word.entries[0].synonyms.slice(0, 3).join(", ")}`;
          errorP.textContent = "";
        }
        meaningBtn.textContent = "Dictionary meaning";
      });
    },
  );

  console.log("meaning");
});

// when pressing translate
translateBtn.addEventListener("click", (event) => {
  event.preventDefault();

  translateBtn.textContent = "Translating...";

  fetch(`http://localhost:3000/translate?text=${encodeURI(meaningP.textContent)}`).then(
    (response) => {
      response.json().then((json) => {
        console.log(encodeURI(meaningP.textContent))
        if (json.error) {
          errorP.textContent = json.error;
        } else {
          console.log(json);
          errorP.textContent = "";
          meaningP.textContent = json.text.text
        }
        translateBtn.textContent = "Translate";
      });
    },
  );

  console.log("translating");
});
