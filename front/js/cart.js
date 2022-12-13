const cart = []
retrieveItemsFromCache()

cart.forEach(async (item) => {
    await showItem(item);
});
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

          // Items
/*altTxt : "Photo d'un canapé d'angle, vert, trois places"
color : "Green"
id : "055743915a544fde83cfdfc904935ee7"
imageUrl : "http://localhost:3000/images/kanap03.jpeg"
quantity: 3
*/
        // Data
/*
colors": [
    "Blue",
    "White",
    "Black"
    ],
    "_id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": "Photo d'un canapé bleu, deux places"
*/

// Retrieve cache items
function retrieveItemsFromCache(){
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

// Display Items
function showItem(item){ 
    fetch(`http://localhost:3000/api/products/${item.id}`)
  .then((response) => response.json())
  .then( function(res){
      item.price = res.price
      const article = makeArticle(item)
      displayArticle(article)
    
      const imageInDiv = makeImage(item)  
      article.appendChild(imageInDiv)
    
      const cartItemContent = makeCartContent(item)
      article.appendChild(cartItemContent)
      displayTotalQuantity()
      displayTotalPrice(item)
  });

}

// Display Total quantity of our articles 
function displayTotalQuantity(){
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    cart.forEach((item) => {
        const totalUnitQuantity = item.quantity
        total = total + totalUnitQuantity
    })
    totalQuantity.textContent = total
}
// Display Total price of our articles 
function displayTotalPrice(){

    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach(async(item) => {
        await fetch(`http://localhost:3000/api/products/${item.id}`)
  .then((response) => response.json())
  .then( function(res){
      const totalUnitPrice = res.price * item.quantity
      total = total + totalUnitPrice
      totalPrice.textContent = total
    })
});

}

// Display Article
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}
function makeArticle(item){
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    //article.dataset.price = item.price
    return article
}

// Images
function makeImage(item){
    const div = document.createElement(`div`)
    div.classList.add(`cart__item__img`)

    const image = document.createElement(`img`)
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)

    return div 
}
 
// Cart content
function makeCartContent(item){
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}
// Description of items
function makeDescription(item){
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color

    const p2 = document.createElement("p")
    p2.textContent = item.price + " €" 

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

// Make settings
function makeSettings(item){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

// Adding total quantity to settings
function addQuantityToSettings(settings, item){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// Display New total price & quantities of our articles in the cart
function updatePriceAndQuantity(id, newValue, item){
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity 
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

// Delete data from the cache after order has been processed
function deleteDataFromCache(item){
    const key =`${item.id}-${item.color}`
    localStorage.removeItem(key)
}

// Save data from the local storage
function saveNewDataToCache(item){
    delete item.price;
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    
    localStorage.setItem(key, dataToSave)
}

// Adding delete button 
function addDeleteToSettings(settings, item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}
// Delete items from cache
function deleteItem(item){
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color) 
    cart.splice(itemToDelete, 1)
    displayTotalQuantity()
    displayTotalPrice()
    deleteDataFromCache(item)
    deleteArticleFromPage(item)
}

// Delete items from our page
function deleteArticleFromPage(item){
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove()
}
// Process to have confirmation message displayed
function submitForm(e){
    e.preventDefault()
    if (cart.length === 0) {
        alert("Veuillez sélectionner un article")
        return
    }
    
   if (validateForm()) return // Empty fields 
   if (validateEmail()) return // error messages

    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    })
       .then((response) => response.json())
       .then((data) => {
        const orderId = data.orderId                  // Confirmation message 
        window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
       })

       .catch((error) => console.error(error)) // Displaying error
}

// Function for sending error message to the user when the email is not correct.
function validateEmail(){
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert("Veuillez saisir une adresse email valide")
        return true
    }
    return false
}


// validating the form before confirmation
function validateForm() {
    const form = document.querySelector(".cart__order__form")
    let error = false
    const inputs = form.querySelectorAll("input")
    Array.from(inputs).every((input) => {
        if (input.value === "") {
            alert("Veuillez renseigner tous les champs")
            error = true;
            return;
        }   
    })
    return error
}
// Filling form validation
function makeRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact : {
            firstName : firstName,
            lastName : lastName,
            address : address,
            city : city,
            email : email,
        },
        products : getIdsFromCache()
}
    return body
}
// Gettings articles Ids from the local storage
function getIdsFromCache(){
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}

