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

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('restaurant-list')) renderRestaurants();
});