
const list = document.querySelector(".header_bottom_list");
const list2 = document.querySelector(".seller_list");
const proList = document.querySelector(".seller_products");
const count = document.querySelector(".item-count");
const price = document.querySelector(".header_top_price");
const form = document.querySelector(".form");
const input = document.querySelector(".input");

const url = "https://fakestoreapi.com/products";

// categories
const category = [
  "Home",
  "Electronics",
  "Jewelery",
  "Men's clothing",
  "Women's clothing",
];
const category2 = [
  "All",
  "Electronics",
  "Jewelery",
  "Men's clothing",
  "Women's clothing",
];

const cart = [];
const search = [];

const renderCategory = () => {
  list.innerHTML = category
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

const middleCategory = () => {
  list2.innerHTML = category2
    .map(
      (item) => `
      <li class="category_item">
      <h3 class="${item} category_title" id="${item}" data-id="${item}">${item}</h3>
      </li>
      `
    )
    .join("");
};
middleCategory();
// render
const renderPro = (data) => {
  proList.innerHTML = data
    ?.map(
      (item) =>
        ` <li class="product_item">
      <div class="product_img_box">
        <img class="product_img" src="${item.image}" />
      </div>
      <div class="product_price_box">
        <span class="product_price">$${item.price}</span>
        <span class="product_del">$${item.price + 60.35}</span>
        <span class="product_sale">24% Off</span>
        <div class="product_btn_box">
          <button data-id=${item.id} class="product_btn"></button>
        </div>
      </div>
    </li>`
    )
    .join("");
};

// getData
const getPro = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderPro(data);
  } catch (error) {
    console.log(error);
  }
};
getPro();

// category
const getJewelary = async () => {
  try {
    const res = await fetch(`${url}/category/jewelery`);
    const data = await res.json();
    renderPro(data);
  } catch (error) {
    console.log(error);
  }
};
const getElectronics = async () => {
  try {
    const res = await fetch(`${url}/category/electronics`);
    const data = await res.json();
    renderPro(data);
  } catch (error) {
    console.log(error);
  }
};
const getMens = async () => {
  try {
    const res = await fetch(`${url}/category/men's%20clothing`);
    const data = await res.json();
    renderPro(data);
  } catch (error) {
    console.log(error);
  }
};
const getWoman = async () => {
  try {
    const res = await fetch(`${url}/category/women's%20clothing`);
    const data = await res.json();
    renderPro(data);
  } catch (error) {
    console.log(error);
  }
};
const getCart = async (id) => {
  try {
    const res = await fetch(`${url}/?id=${id}`);
    const data = await res.json();
    for (let i of data) {
      if (i.id == id) {
        let check = cart.find((item) => item.id == id);
        if (!check) {
          cart.push({ ...i, userPrice: i.price, userCount: 1 });
          let unitPrice = Number(i.price);
          let all = price.textContent * 1;
          price.textContent = all + unitPrice;
          console.log(cart);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

list2.addEventListener("click", (e) => {
  e.preventDefault();
  let id = e.target.id;
  if (e.target.matches(".All")) {
    getPro();
  } else if (e.target.matches(".Electronics")) {
    getElectronics();
  } else if (e.target.matches(".Jewelery")) {
    getJewelary();
  } else if (id == "Men's clothing") {
    getMens(id);
  } else if (id == "Women's clothing") {
    getWoman(id);
  }
});

proList.addEventListener("click", (e) => {
  if (e.target.matches(".product_btn")) {
    let id = e.target.dataset.id;
    getCart(id);
    count.textContent++;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
});

// search

const renderSearch = (arr, node) => {
  node.innerHTML = "";
  arr.forEach((item) => {
    node.innerHTML += ` <li class="product_item">
    <div class="product_img_box">
      <img class="product_img" src="${item.image}" />
    </div>
    <div class="product_title_box">
      <h3 class="product_title">${item.title}</h3>
      <span class="product_rate">${item.rating.rate}</span>
    </div>
    <div class="product_price_box">
      <span class="product_price">$${item.price}</span>
      <span class="product_del">$${item.price + 60.35}</span>
      <span class="product_sale">24% Off</span>
      <div class="product_btn_box">
        <button data-id=${item.id} class="product_btn"></button>
      </div>
    </div>
  </li>`;
  });
};

const getSearch = async () => {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  const result = data.filter((item) => {
    if (item.title.toLowerCase().includes(input.value.toLowerCase())) {
      return item;
    }
  });
  renderSearch(result, proList);
};

input.addEventListener("input", (e) => {
  e.preventDefault();
  getSearch();
});
