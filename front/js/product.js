const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => handleData(res));

// function creation
function handleData(kanap) {
  const altTxt = kanap.altTxt;
  const colors = kanap.colors;
  const description = kanap.description;
  const imageUrl = kanap.imageUrl;
  const name = kanap.name;
  const price = kanap.price;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}
// Image
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}
// Title
function makeTitle(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;
}
// Price
function makePrice(price) {
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;
}
// Description
function makeDescription(description) {
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;
}
// Colors
function makeColors(colors) {
  const select = document.querySelector("#colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}
// Error messages
const button = document.querySelector("#addToCart")
if (button!= null) {
  button.addEventListener("click", (e) => {
      const color = document.querySelector("#colors").value
      const quantity = document.querySelector("#quantity").value
      if (color == null || color === "" || quantity == 0 || quantity == null) {
          alert("Veuillez choisoir une couleur & une quantité comprise entre 1 et 100")
      }
    })
}