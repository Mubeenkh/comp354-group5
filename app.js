// ~~~~~ PBI 1. Sample Database
const restaurantsData = {
    "1": {
        name: "Pizza", desc: "Handmade oven-baked pizzas",
        menu: [
            { id: "f1", name: "Cheese", desc: "classic cheese pizza", price: 14.00 },
            { id: "f2", name: "pepperoni", desc: "classic pepperoni pizza", price: 16.00 },
            { id: "f3", name: "Hawaiana", desc: "pizza with tomatos and pineapple", price: 21.00 }
        ]
    },
    "2": {
        name: "BBQ", desc: "Roasted BBQ",
        menu: [
            { id: "f4", name: "BBQ Ribs", desc: "comes with a side of fries", price: 34.00 },
            { id: "f5", name: "BBQ Meat", desc: "comes with a side of fries", price: 30.00 }
        ]
    },
    "3": {
        name: "Kebab", desc: "kebabs idk",
        menu: [
            { id: "f6", name: "Beef kebab", desc: "comes with a side of fries", price: 12.45 },
            { id: "f7", name: "Chicken kebab", desc: "comes with a side of fries", price: 10.55 }
        ]
    },
    "4": {
        name: "Fish", desc: "we sell freshly caught fish dishes",
        menu: [
            { id: "f8", name: "Salmon", desc: "comes with a side of fries", price: 4999.99 },
            { id: "f9", name: "Crab", desc: "comes with a side of fries", price: 20.55 }
        ]
    },
    "5": {
        name: "Burger", desc: "we sell burgers",
        menu: [
            { id: "f10", name: "classic burger", desc: "burger with lettuce, cheese, tomato", price: 13.46 },
            { id: "f11", name: "everything burger", desc: "burger with everything", price: 17.75 }
        ]
    }
};

// PBI 2 Restaurants List page
function renderRestaurants() {
    const listEl = document.getElementById('restaurant-list');
    if (!listEl) return;

    listEl.innerHTML = Object.keys(restaurantsData).map(id => {
        const resto = restaurantsData[id];
        return `
            <a href="menu.html?id=${id}" class="restaurant-item">
                <div class="image-placeholder"></div>
                <div class="restaurant-info">
                    <div class="restaurant-name">${resto.name}</div>
                    <div class="restaurant-desc">${resto.desc}</div>
                </div>
            </a>
        `;
    }).join('');
}

// PBI 3 Restaurants Menu page
function renderMenu() {
    const urlParams = new URLSearchParams(window.location.search);
    const restoId = urlParams.get('id') || "1"; // Default to 1 if no ID
    const resto = restaurantsData[restoId];

    if (!resto) return;

    // Update Headers
    document.getElementById('menu-resto-name').textContent = resto.name;
    document.getElementById('menu-resto-desc').textContent = resto.desc;

    // Update Back Button to go back to list
    document.getElementById('back-to-list').href = "index.html";

    // Render Menu Items
    const menuList = document.getElementById('menu-list');
    if (resto.menu && resto.menu.length > 0) {
        menuList.innerHTML = resto.menu.map(item => `
            <div class="menu-item">
                <div class="menu-item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-desc">${item.desc}</div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="add-btn" onclick="addToCart('${restoId}', '${item.id}')">Add</button>
            </div>
        `).join('');
    } else {
        menuList.innerHTML = `<p class="subtitle">No items available.</p>`;
    }
}

// ~~~~~ PBI 4/5 (Customer cart add/remove functionality)
function getCart() {
    return JSON.parse(localStorage.getItem('quickbite_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('quickbite_cart', JSON.stringify(cart));
    updateCartBadges();
}

function addToCart(restaurantId, foodId) {
    const cart = getCart();
    const restaurant = restaurantsData[restaurantId];
    const foodItem = restaurant.menu.find(item => item.id === foodId);

    const existingItem = cart.find(item => item.foodId === foodId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            restaurantId: restaurantId,
            restaurantName: restaurant.name,
            foodId: foodId,
            name: foodItem.name,
            price: foodItem.price,
            qty: 1
        });
    }
    saveCart(cart);
    alert(`${foodItem.name} added to cart!`);
}

function removeFromCart(foodId) {
    let cart = getCart();
    cart = cart.filter(item => item.foodId !== foodId);
    saveCart(cart);
    // if on checkout page then re-render
    if (window.location.pathname.includes('checkout.html')) {
        renderCheckout();
    }
}

function updateCartBadges() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.textContent = `Cart (${totalItems})`;
    });
}

// PBI 4/5 customer checkout page with cart
function renderCheckout() {
    const cart = getCart();
    const orderList = document.getElementById('order-list');
    const totalPriceEl = document.getElementById('total-price');

    if (cart.length === 0) {
        orderList.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
        totalPriceEl.textContent = "$0.00";
        return;
    }

    document.getElementById('checkout-resto-name').textContent = `From ${cart[0].restaurantName}`;

    let total = 0;
    orderList.innerHTML = cart.map(item => {
        total += (item.price * item.qty);
        return `
            <div class="order-item">
                <div class="order-item-info">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-details">Qty ${item.qty} &middot; $${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.foodId}')">Remove</button>
            </div>
        `;
    }).join('');

    totalPriceEl.textContent = `$${total.toFixed(2)}`;

    // Back button goes to last viewed restaurant
    document.getElementById('back-to-menu').href = `menu.html?id=${cart[0].restaurantId}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();

    if (document.getElementById('restaurant-list')) renderRestaurants();
    if (document.getElementById('menu-list')) renderMenu();
    if (document.getElementById('order-list')) renderCheckout();
});
