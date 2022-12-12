// Getting Ids from API

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// Variables for Cart Items
if (id != null) {
  let itemPrice = 0
  let imgUrl, altText, articleName
}
// 
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => handleData(res));

// function for items below
function handleData(kanap) {
  const altTxt = kanap.altTxt;
  const colors = kanap.colors;
  const description = kanap.description;
  const imageUrl = kanap.imageUrl;
  const name = kanap.name;
  const price = kanap.price;
  itemPrice = price;
  imgUrl = imageUrl;
  altText = altTxt;
  articleName = name;
  
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
// Display Article Price before addingg in the Cart
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
// Creating click events
const button = document.querySelector("#addToCart");
button.addEventListener("click", clicked);
// And then 
// Display error messages when user forgets to choose "color" or "quantity" 
function clicked(){
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (ErrorMessage(color, quantity)) return;
  RegisterCart(color, quantity);
  GoingToCart(color, quantity);
}

// Order registration in cart
function RegisterCart(color, quantity) {
  const key = `${id}-${color}`
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
   // price: itemPrice 
    imageUrl: imgUrl,
    altTxt: altText,
    name: articleName,
  };
  localStorage.setItem(key, JSON.stringify(data));
  
}

// Display error messages
function ErrorMessage(color, quantity) {
  if ((color == null || color === "") && (quantity == 0 || quantity == null)) {
    alert(
      "Veuillez choisoir une couleur et une quantité comprise entre 1 et 100"
    );
    return true;
  }
  if (color == null || color === "") {
    alert("Veuillez choisir une couleur");
    return true;
  }
  if (quantity == 0 || quantity == null) {
    alert("Veuillez choisir une quantité comprise entre 1 et 100");
    return true;
  }
}

// Going to cart 
function GoingToCart(color, quantity){
  window.location.href = "cart.html"; 
}
