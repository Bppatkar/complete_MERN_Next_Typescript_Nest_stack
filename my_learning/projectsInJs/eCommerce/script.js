document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 120 },
    { id: 2, name: "Product 2", price: 260.23 },
    { id: 3, name: "Product 3", price: 308.45 },
    { id: 4, name: "Product 4", price: 472.5 },
    { id: 5, name: "Product 5", price: 570 },
    { id: 6, name: "Product 6", price: 689.1 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(data) {
    cart.push(data);
    updateLocalStorage();
    renderCart(data);
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
        <button class="remove-btn" data-index="${index}">✖</button>
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
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      cart.splice(index, 1);
      updateLocalStorage();

      renderCart();
    }
  });

  checkOutBtn.addEventListener("click", () => {
    alert("Checkout Successfully");
    cart = [];
    updateLocalStorage();

    renderCart();
  });

  function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  renderCart();
});
