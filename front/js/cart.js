const cart = []
retrieveItemsFromCache()

cart.forEach((item) => showItem(item)) // Loupe
 //Form
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

function retrieveItemsFromCache(){
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function showItem(item){
    const article = makeArticle(item)
    displayArticle(article)

    const imageInDiv = makeImage(item)  
    article.appendChild(imageInDiv)

    const cartItemContent = makeCartContent(item)
    article.appendChild(cartItemContent)
    displayTotalQuantity()
    displayTotalPrice(item)
}

function displayTotalQuantity(){
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    cart.forEach((item) => {
        const totalUnitQuantity = item.quantity
        total = total + totalUnitQuantity
    })
    totalQuantity.textContent = total
}

function displayTotalPrice(){
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total = total + totalUnitPrice
    })
    totalPrice.textContent = total
}

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


function makeImage(item){
    const div = document.createElement(`div`)
    div.classList.add(`cart__item__img`)

    const image = document.createElement(`img`)
    image.src = item.imageUrl
    image.alt = item.altText
    div.appendChild(image)
    return div 
}
    
function makeCartContent(item){
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

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

function makeSettings(item){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

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

function updatePriceAndQuantity(id, newValue, item){
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

function deleteDataFromCache(item){
    const key =`${item.id}-${item.color}`
    localStorage.removeItem(key)
}

function saveNewDataToCache(item){
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

function addDeleteToSettings(settings, item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item){
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color) 
    cart.splice(itemToDelete, 1)
    displayTotalQuantity()
    displayTotalPrice()
    deleteDataFromCache(item)
    deleteArticleFromPage(item)
}

function deleteArticleFromPage(item){
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove()
}

function submitForm(e){
    e.preventDefault()
    if (cart.length === 0) alert("Please select an article to buy")
    const form = document.querySelector(".cart__order__form")

    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    })
       .then((response) => response.json())
       .then((data) => console.log(data))
    //console.log(form.elements)
}


function makeRequestBody() {
    const body = {
        contact : {
            firstName : "",
            lastName : "",
            adress : "",
            city : "",
            email : "",
        },
        products : [""]
}
    return body

}
