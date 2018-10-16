const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
    const addToyForm = document.querySelector(".add-toy-form");

    addToyForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const data = {
        name: event.target.name.value,
        image: event.target.image.value,
        likes: 0
      };

      fetch("http://localhost:3000/toys", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(function() {
        displayNew();
      });
    });
  } else {
    toyForm.style.display = "none";
  }
});
// OR HERE!
//1. make it work shamelessly
//2. make it better

function displayNew() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(response => {
      const toys = response;
      const toyCollection = document.getElementById("toy-collection");
      renderNewToy(toys, toyCollection);
    });
}

function renderToys(toys, toyCollection) {
  toys.forEach(function(toy) {
    toyCollection.innerHTML += `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}"class="toy-avatar">
    <p>${toy.likes} Likes <p>
    <button class="like-btn" data-id="${toy.id}">Like <3</button>
  </div>
  `;
  });
}

function renderNewToy(toys, toyCollection) {
  let toy = toys[toys.length - 1];
  toyCollection.innerHTML += `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}"class="toy-avatar">
    <p>${toy.likes} Likes <p>
    <button class="like-btn" data-id="${toy.id}">Like <3</button>
  </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(response => {
      const toys = response;
      const toyCollection = document.getElementById("toy-collection");
      renderToys(toys, toyCollection);
    });
});

document.addEventListener("click", function(event) {
  if (event.target.className === "like-btn") {
    let likeCountElement = event.target.parentElement.parentElement.children[2];
    let likeCount = parseInt(likeCountElement.innerText.split(" ")[0]);
    likeCountElement.innerHTML = `${likeCount + 1} likes`;
    let toyId = event.target.dataset.id;

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: likeCount + 1
      })
    });
  }
});
