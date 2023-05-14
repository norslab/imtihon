const list = document.querySelector(".cart-list");
const list2 = document.querySelector(".header_bottom_list");

let cart = JSON.parse(localStorage.getItem("cart"));
const total = document.querySelector(".total");

const buy__btn = document.querySelector(".buy__btn")
const btn__content = document.querySelector(".btn__content")

const category = [
    "Home",
    "Electronics",
    "Jewelery",
    "Men's clothing",
    "Women's clothing",
  ];
  const renderCategory = () => {
    list2.innerHTML = category
      .map(
        (item) => `
      <li class="category_item">
      <h3 class="${item} category_title" id="${item}" data-id="${item}">${item}</h3>
      </li>
      `
      )
      .join("");
};
renderCategory();

const renderCart = () => {
  list.innerHTML = "";
  list.innerHTML = cart
    ?.map((item, i) => {
      let unitPrice = Number(cart[i].price);
      let all = total.textContent * 1;
      total.textContent = all + unitPrice;
      return `
      <li class="cart-item" id="${item}">
      <button class="remove" data-id="${item.id}">x</button>
        <div class="cart-img"
            <img class="heart" id="${item.id}" src="../img/hearts.svg"/>
            <img class="cart-img" src="${item.image}" data-id="${item.image}" alt="products"/>
        </div> 
        <p class="cart-text">${item.title.split(' ', 6) + "..."}</p>
         <ul class="cart-box">
            <li class="cart-price">
                <p class="price" data=id="${item.id}">${item.userPrice}$</p>
            </li>
            <li class="cart-price cart-price-box">
                <button class="cart-dec" data-id="${item.id}">--</button>
                <span class="cart-count" id="${item.id}">${item.userCount}</span>
                <button class="cart-inc" data-id="${item.id}">+</button>
            </li>
            
         </ul>
    </li><hr>
    `;
    })
    .join("");
};

renderCart();

list.addEventListener("click", (e) => {
    if (e.target.matches(".cart-inc")) {
      let incId = e.target.dataset.id;
      if (incId) {
        cart.forEach((el) => {
          if (el.id == incId) {
            el.userCount += 1;
            el.userPrice = el.price * el.userCount;
          }
        });
      }
    } else if (e.target.matches(".cart-dec")) {
      let decId = e.target.dataset.id;
      if (decId) {
        cart.forEach((el) => {
          if (el.id == decId && el.userCount > 0) {
            el.userCount -= 1;
            el.userPrice = el.price * el.userCount;
          }
        });
      }
    } else if (e.target.matches(".remove")) {
      let cartCount;
      let remId = e.target.dataset.id;
      if (remId) {
       cart = cart.filter((item) => {
          if (item.id == remId) {
            cartCount = item.userCount
          }else{
            return item
          }
        });
      }
    }
    renderCart();
  });


  btn__content.addEventListener("click" , (e) => {
  e.preventDefault()
  const { className , id} = e.target;
  if(className == 'buy__btn'){
    alert('Haridingiz uchun rahmat');
  }
})