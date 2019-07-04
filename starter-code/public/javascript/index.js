const charactersAPI = new APIHandler("http://localhost:8000");
const $container = document.querySelector(".characters-container");
const $inputSearchId = document.querySelector("input[name=character-id]");
const $inputDeleteId = document.querySelector(
  "input[name=character-id-delete]"
);
const $inputId = document.querySelector("#edit-character-form [name=chr-id]");
const $inputName = document.querySelector("#edit-character-form [name=name]");
const $inputOccupation = document.querySelector(
  "#edit-character-form [name=occupation]"
);
const $inputWeapon = document.querySelector(
  "#edit-character-form [name=weapon]"
);
const $inputCartoon = document.querySelector(
  "#edit-character-form [name=cartoon]"
);
const $updateButton = document.querySelector("#edit-character-form #send-data");

document.getElementById("fetch-all").onclick = function() {
  charactersAPI.getFullList().then(characters => {
    console.log("characters", characters);
    $container.innerHTML = ""; // Remove all the content of the container
    for (let i = 0; i < characters.length; i++) {
      $container.innerHTML += `
      <div class="character-info">
        <div class="name">${characters[i].name}</div>
        <div class="occupation">${characters[i].occupation}</div>
        <div class="cartoon">${
          characters[i].cartoon ? "Cartoon" : "Not a cartoon"
        }</div>
        <div class="weapon">${characters[i].weapon}</div>
      </div>
      `;
    }
  });
};

document.getElementById("fetch-one").onclick = function() {
  let id = $inputSearchId.value;
  charactersAPI
    .getOne(id)
    .then(character => {
      $container.innerHTML = `
        <div class="character-info">
          <div class="name">${character.name}</div>
          <div class="occupation">${character.occupation}</div>
          <div class="cartoon">${
            character.cartoon ? "Cartoon" : "Not a cartoon"
          }</div>
          <div class="weapon">${character.weapon}</div>
        </div>
        `;
    })
    .catch(err => {
      $container.innerHTML = "No character";
    });
};

document.getElementById("delete-one").onclick = function() {};

document.getElementById("edit-character-form").onsubmit = function(e) {
  e.preventDefault();
  charactersAPI
    .updateOne($inputId.value, {
      name: $inputName.value,
      occupation: $inputOccupation.value,
      weapon: $inputWeapon.value,
      cartoon: $inputCartoon.checked // return true or false
    })
    .then(character => {
      $updateButton.style.borderColor = "chartreuse";
      $updateButton.style.color = "chartreuse";
      // Add info at the top
      $container.innerHTML = `
        <div class="character-info">
          <div class="name">${character.name}</div>
          <div class="occupation">${character.occupation}</div>
          <div class="cartoon">${
            character.cartoon ? "Cartoon" : "Not a cartoon"
          }</div>
          <div class="weapon">${character.weapon}</div>
        </div>
        `;
    })
    .catch(err => {
      $updateButton.style.borderColor = "red";
      $updateButton.style.color = "red";
    });
};

document.getElementById("new-character-form").onsubmit = function() {};
