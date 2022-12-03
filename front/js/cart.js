const cart = []
retrieveItemsFromCache()

cart.forEach((item) => showItem(item)) // Loupe


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
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function showItem(item){
    const article = makeArticle(item)
    displayArticle(article)

    const imageInDiv = makeImage(item)  
    article.appendChild(imageInDiv)

    const cardItemContent = makeCartDescription(imageInDiv,item)
    article.appendChild(cardItemContent)
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

function makeCardItemContent(){
    const div = document.createElement("div")
    div.classList.add("cart__item__content")
}
function makeCartDescription(div,item){
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
    div.appendChild(description)
    
    return div 
}