document.addEventListener("DOMContentLoaded", () => {
  // const products = [
  //   { id: 1, name: "Product 1", price: 120 },
  //   { id: 2, name: "Product 2", price: 260.23 },
  //   { id: 3, name: "Product 3", price: 308.45 },
  //   { id: 4, name: "Product 4", price: 472.5 },
  //   { id: 5, name: "Product 5", price: 570 },
  //   { id: 6, name: "Product 6", price: 689.1 },
  // ];

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // const productId = document.getElementById("product-id");
  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const addProductBtn = document.getElementById("frm-sbmt");

  // ***************************************************

  addProductBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const product = {
      id: Date.now(),
      name: productName.value.trim(),
      price: parseFloat(productPrice.value),
    };
    if (!product.name || isNaN(product.price)) {
      alert("Please enter valid data");
      return;
    }
    products.push(product);
    updateProductLocalStorage();

    productName.value = "";
    productPrice.value = "";

    productName.focus();

    // console.log(products);
    renderProducts();
  });

  function renderProducts() {
    const productContainer = document.querySelectorAll(
      "#product-list .product"
    );
    productContainer.forEach((product) => product.remove());

    products.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button class="remove-from-products" data-index="${index}"><i class="ri-delete-bin-2-fill"></i></button>
      <button data-id="${product.id}">Add to cart</button>
    `;
      productList.appendChild(productDiv);
    });
  }

  // ***************************************************
  //Removing a Product from the List
  productList.addEventListener("click", (e) => {
    let target = e.target.closest(".remove-from-products");
    if (target) {
      const index = parseInt(target.getAttribute("data-index"));
      products.splice(index, 1);
      updateProductLocalStorage();
      renderProducts();
    }
  });
  //Adding a Product to the Cart
  productList.addEventListener("click", (e) => {
    if (
      e.target.matches("button") &&
      !e.target.classList.contains("remove-from-products")
    ) {
      const productId = Number(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      if (product) addToCart(product);
    }
  });

  function addToCart(data) {
    const existingItem = cart.find((item) => item.id === data.id);
    if (existingItem) {
      alert("This item is already in the cart!");
      return;
    }
    cart.push(data);
    updateCartLocalStorage();
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} =$${item.price.toFixed(2)} 
        <button class="remove-btn" data-index="${index}"><i class="ri-delete-bin-2-fill"></i></button>
        `;

        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
  }

  cartItems.addEventListener("click", (e) => {
    let target = e.target.closest(".remove-btn"); // Get closest button
    if (target) {
      const index = parseInt(target.getAttribute("data-index"));
      cart.splice(index, 1);
      updateCartLocalStorage();
      renderCart();
    }
  });

  checkOutBtn.addEventListener("click", () => {
    alert("Checkout Successfully");
    cart.length = 0;
    products.length = 0;
    updateCartLocalStorage();
    updateProductLocalStorage();
    renderCart();
    renderProducts();
  });

  function updateCartLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function updateProductLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
  }

  renderCart();
  renderProducts();
});
