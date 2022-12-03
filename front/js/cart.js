const cart = []
retrieveItemsFromCache()

cart.forEach((item) => showItem(item))

/*altTxt : "Photo d'un canapé d'angle, vert, trois places"
color : "Green"
id : "055743915a544fde83cfdfc904935ee7"
imageUrl : "http://localhost:3000/images/kanap03.jpeg"
quantity: 3
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
    const itemObject = JSON.parse(item)
    
}