let template = `<a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>`
//document.getElementsByClassName ('items')[0].innerHTML = template;

fetch ("http://localhost:3000/api/products")
  .then (function (response) {
    return response.json()
  })
  .then (function (products) {
    products.map((el,i)=>{
      items.innerHTML +=
      `<a href="./product.html?id=${el._id}">
            <article>
              <img src ="${el.imageUrl}" alt="${el.altTxt}">
              <h3 class="productName">Kanap ${el.name}</h3>
              <p class="productDescription">${el.description}Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>`
    })
  })
  