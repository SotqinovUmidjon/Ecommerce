let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let cartContent = document.querySelector(".cart-content");
let totalPrice = document.querySelector(".total-price");
let btnBuy = document.querySelector(".btn-buy");
let box = document.querySelector(".box");
let shopContent = document.querySelector(".shop-content");
let modalInfo = document.querySelector(".modalInfo");
let loader = document.querySelector(".loader");


const api_link =" https://fakestoreapi.com/products";
// console.log(api_link);
const getData = async (api) => {
  const req = await fetch(api);
  const data = await req.json();

  data.forEach((item) => {
    shopContent.innerHTML += `
    <div class="product-box">
       <img src="${item.image}" class="product-img"  onclick="show(${item.id})">
       <h2 class="product-title">${item.title.slice(0, 26)}...</h2>
       <span>$</span><span class="price">${item.price}</span>
       <i class='bx bx-shopping-bag add-cart'></i>
    </div>
    `
  })
}
getData(api_link);


var products = JSON.parse(localStorage.getItem("products")) ? JSON.parse(localStorage.getItem("products")) : [];

var sum = 0;
const writeContent = ()=>{
  cartContent.innerHTML = "";
  sum = 0;
  products.forEach((item)=>{
    cartContent.innerHTML += `
        <div class="cartProduct">
          <img src=${item.img} alt="" class="cart-img">
          <div class="cart-box">
            <div class="cart-product-title">
              ${item.name}
            </div>
            <div class="cart-price">
                $${item.price}
            </div>
            <input type="number" value="1" class="cart-quantity">
          </div>
          <i class="bx bxs-trash-alt cart-remove"></i>
        </div> `
        sum += parseInt(item.price)
    ;
  })
  totalPrice.textContent = `$${sum}`;
}


let modal = document.querySelector('.modal')
function show(id){
  loader.classList.add("active")
  modal.classList.add("active")
  var api_link = `https://fakestoreapi.com/products/${id}`;
  const getData = async (api) =>{
  modalInfo.innerHTML = ``;
  const req = await fetch(api); 
  const data = await req.json();
  console.log(data);
  modalInfo.innerHTML += `
  <div class="text">
  <img src=${data.image} class="textImg">
  </div>
  <div>
  <div class="textInfo">
  <h3 class="texth1">${data.title}</h3>
  <p class="textDec">${data.description}</p>
  <p> <span class="textSpan">Price</span>: $${data.price}</p>
  <p> <span class="textSpan">Count</span>: ${data.rating.count}</p>
  <p> <span class="textSpan">Rate</span>: ${data.rating.rate}</p>
  </div>
  <button class="btn" onclick="modalExit()">Back</button>
  </div>
   `
  }
  getData(api_link);
}

let exit = document.querySelector('.exit')
exit.addEventListener('click', ()=>{
 modalExit()
})
function modalExit() {
  modal.classList.remove("active")
}
document.addEventListener("click", (e)=>{
  console.log(e.target.classList);
})


writeContent()
document.addEventListener("click", (e)=>{
  if (e.target.classList.contains("add-cart")) {
    var img = e.target.parentElement.childNodes[1].getAttribute("src");
    var name = e.target.parentElement.childNodes[3].textContent;
    var price = e.target.parentElement.childNodes[6].textContent;

    var obj = {
      img,
      name,
      price,
    };
    products.push(obj)
    localStorage.setItem("products", JSON.stringify(products));
    writeContent();
  }
})
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-remove")) {
    var filterName = e.target.parentElement.querySelector(".cart-product-title").textContent.trim();
    var filterData =  products.filter((item)=>{
      return item.name !== filterName;
    })
   
    products = filterData
    localStorage.setItem("products", JSON.stringify(products));
    writeContent()
  }
});

btnBuy.addEventListener("click", () => {
  box.classList.add("boxactive");
  localStorage.clear();
})

setInterval(()=>{
  box.classList.remove("boxactive");
  localStorage.clear()
}, 5000)









