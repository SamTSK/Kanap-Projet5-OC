// Process to get the confimation message
// I fist named my variables and then create my functions
const orderId = getOrderId()
displayOrderId (orderId)
clearLocalStorage()


// Using this function to get the order id from the local storage
function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId") 
}
// Display the order
function displayOrderId (orderId){
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}
// Using this one to clear my data from the local storage after the order
function clearLocalStorage() {
    const cache = window.localStorage
    cache.clear()
}