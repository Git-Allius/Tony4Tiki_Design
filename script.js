const menu = document.getElementById("MenuItems");

function toggleMenu() {
    if (menu) {
        menu.classList.toggle("active");
    }
}

/* Testimonials */
const testimonialWheel = document.getElementById("testimonialWheel");
let testimonialMoving = false;

function getTestimonialStep() {
    if (!testimonialWheel) return 0;

    const card = testimonialWheel.querySelector(".testimonial-card");
    const gap = 25;

    return card.offsetWidth + gap;
}

function moveTestimonials(direction) {
    if (!testimonialWheel || testimonialMoving) return;

    testimonialMoving = true;
    const step = getTestimonialStep();

    if (direction === 1) {
        testimonialWheel.style.transform = `translateX(-${step}px)`;

        setTimeout(() => {
            testimonialWheel.appendChild(testimonialWheel.firstElementChild);
            testimonialWheel.style.transition = "none";
            testimonialWheel.style.transform = "translateX(0)";

            testimonialWheel.offsetHeight;

            testimonialWheel.style.transition = "transform 0.4s ease";
            testimonialMoving = false;
        }, 400);
    }

    if (direction === -1) {
        testimonialWheel.style.transition = "none";
        testimonialWheel.insertBefore(
            testimonialWheel.lastElementChild,
            testimonialWheel.firstElementChild
        );
        testimonialWheel.style.transform = `translateX(-${step}px)`;

        testimonialWheel.offsetHeight;

        testimonialWheel.style.transition = "transform 0.4s ease";
        testimonialWheel.style.transform = "translateX(0)";

        setTimeout(() => {
            testimonialMoving = false;
        }, 400);
    }
}

/* Menu Dropdown */
function toggleMenuCategory(button) {
    const category = button.parentElement;
    category.classList.toggle("active");

    const items = category.querySelector(".menu-items");

    if (!items) return;

    if (category.classList.contains("active")) {
        items.style.maxHeight = items.scrollHeight + "px";
    } else {
        items.style.maxHeight = "0px";
    }
}

function sendContactMessage(event) {
    event.preventDefault();

    const message = {
        name: document.getElementById("contactName").value,
        phone: document.getElementById("contactPhone").value,
        address: document.getElementById("contactAddress").value,
        message: document.getElementById("contactMessage").value,
        date: new Date().toLocaleString()
    };

    const messages = JSON.parse(localStorage.getItem("messages")) || [];

    messages.push(message);

    localStorage.setItem("messages", JSON.stringify(messages));

    alert("Message sent successfully!");

    event.target.reset();
}

function showLogin() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const loginToggle = document.getElementById("loginToggle");
    const registerToggle = document.getElementById("registerToggle");

    const slider = document.getElementById("toggleSlider");

    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    loginToggle.classList.add("active");
    registerToggle.classList.remove("active");

    slider.style.transform = "translateX(0)";
}

function showRegister() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const loginToggle = document.getElementById("loginToggle");
    const registerToggle = document.getElementById("registerToggle");

    const slider = document.getElementById("toggleSlider");

    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    registerToggle.classList.add("active");
    loginToggle.classList.remove("active");

    slider.style.transform = "translateX(100%)";
}

function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const accountMessage = document.getElementById("accountMessage");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const usernameExists = users.some(user => user.username === username);

    if (usernameExists) {
        accountMessage.textContent = "Username already exists.";
        return;
    }

    const user = {
        username,
        email,
        password
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    accountMessage.textContent = "Account created successfully. You can now log in.";

    event.target.reset();

    showLogin();
}

function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const accountMessage = document.getElementById("accountMessage");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(user =>
        user.username === username && user.password === password
    );

    if (!foundUser) {
        accountMessage.textContent = "Invalid username or password.";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    accountMessage.textContent = `Welcome back, ${foundUser.username}!`;

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}

/* Quantity */
function increaseQty() {
    const quantity = document.getElementById("quantity");
    if (!quantity) return;

    quantity.value = Number(quantity.value) + 1;
}

function decreaseQty() {
    const quantity = document.getElementById("quantity");
    if (!quantity) return;

    if (Number(quantity.value) > 1) {
        quantity.value = Number(quantity.value) - 1;
    }
}

/* Add To Cart */
function addToCartAndGo() {
    const quantityInput = document.getElementById("quantity");
    if (!quantityInput) return;

    const quantity = Number(quantityInput.value);

    const item = {
        name: "Drink Name",
        price: 8,
        image: "images/drink.png",
        quantity: quantity
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "cart.html";
}

/* Cart Page */
function loadCart() {
    const cartContainer = document.getElementById("cartContainer");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartContainer || !cartTotal) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <p style="color:black; text-align:center;">Your cart is empty.</p>
        `;
        cartTotal.textContent = "$0.00";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = Number(item.price) * Number(item.quantity);
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                </div>

                <p class="cart-item-price">$${itemTotal.toFixed(2)}</p>

                <button class="remove-btn" onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

/* Checkout Page */
function loadCheckout() {
    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutTotal = document.getElementById("checkoutTotal");

    if (!checkoutItems || !checkoutTotal) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.innerHTML = `<p style="color:#555;">Your cart is empty.</p>`;
        checkoutTotal.textContent = "$0.00";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = Number(item.price) * Number(item.quantity);
        total += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.name}">

                <div class="checkout-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                </div>

                <span class="checkout-item-price">$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

function placeOrder(event) {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const order = {
        customerName: document.getElementById("customerName").value,
        customerPhone: document.getElementById("customerPhone").value,
        customerEmail: document.getElementById("customerEmail").value,
        notes: document.getElementById("orderNotes").value,
        items: cart,
        date: new Date().toLocaleString()
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    window.location.href = "orders.html";
}

/* Orders Page */
function loadOrders() {
    const ordersContainer = document.getElementById("ordersContainer");

    if (!ordersContainer) return;

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <p style="color:black; text-align:center;">No orders yet.</p>
        `;
        return;
    }

    orders.forEach(order => {
        let total = 0;
        let itemsHTML = "";

        order.items.forEach(item => {
            const itemTotal = Number(item.price) * Number(item.quantity);
            total += itemTotal;

            itemsHTML += `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}">

                    <div>
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                        <p>$${itemTotal.toFixed(2)}</p>
                    </div>
                </div>
            `;
        });

        ordersContainer.innerHTML += `
            <div class="order-card">
                <h3>Order for ${order.customerName}</h3>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Phone:</strong> ${order.customerPhone}</p>
                <p><strong>Email:</strong> ${order.customerEmail}</p>

                ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ""}

                <div class="order-items">
                    ${itemsHTML}
                </div>

                <p class="order-total">Total: $${total.toFixed(2)}</p>
            </div>
        `;
    });
}

loadCart();
loadCheckout();
loadOrders();