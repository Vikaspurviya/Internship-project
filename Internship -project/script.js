// Elements
const cartBtn = document.querySelector(".cart-btn");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const addCartBtns = document.querySelectorAll(".add-cart");
const searchInput = document.getElementById("search");
const productCards = document.querySelectorAll(".product-card");
const wishlistBtns = document.querySelectorAll(".wishlist");

// Local Storage Data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update Cart Count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Save Cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#131921";
    toast.style.color = "#fff";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// Render Cart
function renderCart() {

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>No products added.</p>";
        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(item => {

        const div = document.createElement("div");

        div.style.marginBottom = "15px";
        div.style.borderBottom = "1px solid #ddd";
        div.style.paddingBottom = "10px";

        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>${item.price}</p>
        `;

        cartItems.appendChild(div);

    });

}

// Add To Cart
addCartBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        const card = btn.closest(".product-card");

        const name =
            card.querySelector("h3").innerText;

        const price =
            card.querySelector(".price").innerText;

        cart.push({
            name,
            price
        });

        saveCart();
        updateCartCount();
        renderCart();

        btn.innerText = "Added ✓";

        setTimeout(() => {
            btn.innerText = "Add To Cart";
        }, 1000);

        showToast("Product Added Successfully ✅");

    });

});

// Cart Open
cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

// Cart Close
closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// Search Products
searchInput.addEventListener("keyup", () => {

    const value =
        searchInput.value.toLowerCase();

    productCards.forEach(card => {

        const name =
            card.querySelector("h3")
            .innerText
            .toLowerCase();

        if (name.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// Wishlist
wishlistBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        const icon =
            btn.querySelector("i");

        if (icon.style.color === "red") {

            icon.style.color = "gray";

            showToast(
                "Removed from Wishlist ❌"
            );

        } else {

            icon.style.color = "red";

            showToast(
                "Added to Wishlist ❤️"
            );

        }

    });

});

// Initialize
updateCartCount();
renderCart();