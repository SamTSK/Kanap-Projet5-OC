// Process to get the confimation message
// I fist named my variables and then create my functions

const orderId = getOrderId()
displayOrderId (orderId)
clearLocalStorage()

function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId") 
}

function displayOrderId (orderId){
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

function clearLocalStorage() {
    const cache = window.localStorage
    cache.clear()
}