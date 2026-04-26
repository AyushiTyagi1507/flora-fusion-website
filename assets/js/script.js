/* ══════════════════════════════════════════════════════════════
           PRODUCT DATA (Static)
        ══════════════════════════════════════════════════════════════ */
const products = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    category: "indoor",
    price: 799,
    oldPrice: 1099,
    emoji: "🌿",
    badge: "popular",
    badgeText: "Popular",
    desc: "Iconic split-leaf tropical plant. Air-purifying, low-maintenance.",
    care: ["💧 Moderate", "☀️ Indirect"],
  },
  {
    id: 2,
    name: "Peace Lily",
    category: "indoor",
    price: 449,
    oldPrice: null,
    emoji: "🌸",
    badge: "new",
    badgeText: "New",
    desc: "Elegant white blooms. One of the best indoor air purifiers.",
    care: ["💧 Low", "🌑 Low Light"],
  },
  {
    id: 3,
    name: "Snake Plant",
    category: "indoor",
    price: 349,
    oldPrice: 499,
    emoji: "🌱",
    badge: "sale",
    badgeText: "Sale",
    desc: "Nearly indestructible. Releases oxygen at night — perfect for bedrooms.",
    care: ["💧 Very Low", "☀️ Any Light"],
  },
  {
    id: 4,
    name: "Golden Pothos",
    category: "indoor",
    price: 249,
    oldPrice: null,
    emoji: "🍃",
    badge: "popular",
    badgeText: "Popular",
    desc: "Beautiful trailing vine. Ideal for shelves, hanging pots.",
    care: ["💧 Low", "☀️ Indirect"],
  },
  {
    id: 5,
    name: "Jade Succulent",
    category: "succulent",
    price: 199,
    oldPrice: 299,
    emoji: "🌵",
    badge: "sale",
    badgeText: "Sale",
    desc: "Bonsai-like succulent said to bring good luck and prosperity.",
    care: ["💧 Very Low", "☀️ Bright"],
  },
  {
    id: 6,
    name: "Aloe Vera",
    category: "succulent",
    price: 279,
    oldPrice: null,
    emoji: "🌵",
    badge: null,
    badgeText: null,
    desc: "Medicinal wonder plant. Great for burns, skin care, and juice.",
    care: ["💧 Very Low", "☀️ Direct"],
  },
  {
    id: 7,
    name: "Bougainvillea",
    category: "outdoor",
    price: 599,
    oldPrice: 799,
    emoji: "🌺",
    badge: "sale",
    badgeText: "Sale",
    desc: "Vibrant magenta blooms cascade beautifully over walls and fences.",
    care: ["💧 Moderate", "☀️ Full Sun"],
  },
  {
    id: 8,
    name: "Hibiscus Plant",
    category: "outdoor",
    price: 499,
    oldPrice: null,
    emoji: "🌻",
    badge: "new",
    badgeText: "New",
    desc: "Large, showy tropical flowers. Also used in herbal teas.",
    care: ["💧 Regular", "☀️ Full Sun"],
  },
  {
    id: 9,
    name: "ZZ Plant",
    category: "indoor",
    price: 649,
    oldPrice: 899,
    emoji: "🪴",
    badge: "sale",
    badgeText: "Sale",
    desc: "Glossy, architectural leaves. Tolerates neglect beautifully.",
    care: ["💧 Very Low", "🌑 Low Light"],
  },
  {
    id: 10,
    name: "Fiddle Leaf Fig",
    category: "indoor",
    price: 1299,
    oldPrice: 1699,
    emoji: "🌳",
    badge: "popular",
    badgeText: "Popular",
    desc: "The designer plant of choice. Bold, dramatic, a true statement piece.",
    care: ["💧 Moderate", "☀️ Bright Indirect"],
  },
  {
    id: 11,
    name: "String of Pearls",
    category: "succulent",
    price: 399,
    oldPrice: null,
    emoji: "🫧",
    badge: "new",
    badgeText: "New",
    desc: "Unique cascading succulent with round bead-like leaves.",
    care: ["💧 Low", "☀️ Indirect"],
  },
  {
    id: 12,
    name: "Anthurium Red",
    category: "decorative",
    price: 699,
    oldPrice: 949,
    emoji: "🌹",
    badge: "popular",
    badgeText: "Popular",
    desc: "Heart-shaped glossy red spathes that bloom almost year-round.",
    care: ["💧 Moderate", "☀️ Indirect"],
  },
];

/* ══════════════════════════════════════════════════════════════
           CART STATE
        ══════════════════════════════════════════════════════════════ */
let cart = JSON.parse(localStorage.getItem("floraCart")) || [];
let activeFilter = "all";
let searchQuery = "";
let wishlist = JSON.parse(localStorage.getItem("floraWishlist")) || [];

function saveWishlist() {
  localStorage.setItem("floraWishlist", JSON.stringify(wishlist));
}
/* ── Save cart to LocalStorage ── */
function saveCart() {
  localStorage.setItem("floraCart", JSON.stringify(cart));
}

/* ══════════════════════════════════════════════════════════════
           RENDER PRODUCTS
        ══════════════════════════════════════════════════════════════ */
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const noRes = document.getElementById("noResults");

  // Filter products
  let filtered = products.filter((p) => {
    const matchFilter = activeFilter === "all" || p.category === activeFilter;
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noRes.style.display = "block";
    return;
  }
  noRes.style.display = "none";

  grid.innerHTML = filtered
    .map((p) => {
      const inCart = cart.find((c) => c.id === p.id);
      const inWishlist = wishlist.find((w) => w.id === p.id);
      return `
      <div class="product-card reveal" data-id="${p.id}">
        <div class="product-img-wrap">
          ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badgeText}</span>` : ""}
          <button class="wishlist-btn" onclick="toggleWishlist(this, ${p.id})">
  <i class="bi ${inWishlist ? "bi-heart-fill" : "bi-heart"}"></i>
</button>
          <div class="product-emoji">${p.emoji}</div>
        </div>
        <div class="product-body">
          <div class="product-category">${p.category.toUpperCase()}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-care">
            ${p.care.map((c) => `<span class="care-tag">${c}</span>`).join("")}
          </div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-footer">
            <div class="product-price">
              ${p.oldPrice ? `<span class="old-price">₹${p.oldPrice}</span>` : ""}
              ₹${p.price}
            </div>
            <button class="add-to-cart-btn ${inCart ? "added" : ""}"
              onclick="addToCart(${p.id})"
              id="cartBtn-${p.id}">
              <i class="bi bi-${inCart ? "check2" : "bag-plus"}"></i>
              ${inCart ? "Added" : "Add"}
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  // Trigger reveal animations
  setTimeout(() => {
    document.querySelectorAll(".product-card.reveal").forEach((el) => {
      el.classList.add("visible");
    });
  }, 50);
}

/* ══════════════════════════════════════════════════════════════
           FILTER & SEARCH
        ══════════════════════════════════════════════════════════════ */
function filterProducts(category, btn) {
  activeFilter = category;
  // Update active button
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts();
}

function filterByCategory(category) {
  activeFilter = category;
  // Update filter buttons
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.toggle(
      "active",
      b.textContent.toLowerCase().includes(category),
    );
  });
  renderProducts();
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function handleSearch() {
  searchQuery = document.getElementById("searchInput").value;
  // Sync mobile
  document.getElementById("mobileSearch").value = searchQuery;
  renderProducts();
}

function handleMobileSearch() {
  searchQuery = document.getElementById("mobileSearch").value;
  document.getElementById("searchInput").value = searchQuery;
  renderProducts();
}

/* ══════════════════════════════════════════════════════════════
           CART FUNCTIONS
        ══════════════════════════════════════════════════════════════ */
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existing = cart.find((c) => c.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  renderProducts(); // update button state
  showToast(`🌿 ${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter((c) => c.id !== productId);
  saveCart();
  updateCartBadge();
  renderCart();
  renderProducts();
}

function updateQty(productId, delta) {
  const item = cart.find((c) => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  renderCart();
}

function updateCartBadge() {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  document.getElementById("cartBadge").textContent = total;
}

/* ══════════════════════════════════════════════════════════════
           RENDER CART SIDEBAR
        ══════════════════════════════════════════════════════════════ */
function renderCart() {
  const container = document.getElementById("cartItems");
  const footer = document.getElementById("cartFooter");

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🪴</div>
        <p>Your cart is empty.<br/>Start adding some beautiful plants!</p>
        <button onclick="closeCart()" class="btn-primary-ff" style="margin-top:16px;font-size:.85rem;padding:10px 22px;">
          Continue Shopping
        </button>
      </div>`;
    footer.style.display = "none";
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} each</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, +1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove">
        <i class="bi bi-trash3"></i>
      </button>
    </div>
  `,
    )
    .join("");

  // Calculate totals
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const delivery = subtotal >= 699 ? 0 : 99;
  const total = subtotal + delivery;

  document.getElementById("cartSubtotal").textContent = `₹${subtotal}`;
  document.getElementById("cartDelivery").textContent =
    delivery === 0 ? "FREE 🎉" : `₹${delivery}`;
  document.getElementById("cartTotal").textContent = `₹${total}`;
  footer.style.display = "block";
}

/* ── Cart open / close ── */
function openCart() {
  renderCart();
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ── Checkout handler ── */
function handleCheckout() {
  closeCart();
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  showToast("📝 Please fill the order form below to complete your purchase!");
}

/* ══════════════════════════════════════════════════════════════
           WISHLIST TOGGLE
        ══════════════════════════════════════════════════════════════ */
function toggleWishlist(btn, productId) {
  const product = products.find((p) => p.id === productId);
  const exists = wishlist.find((w) => w.id === productId);

  const icon = btn.querySelector("i");

  if (exists) {
    wishlist = wishlist.filter((w) => w.id !== productId);

    icon.classList.remove("bi-heart-fill");
    icon.classList.add("bi-heart");

    showToast("❌ Removed from wishlist");
  } else {
    wishlist.push(product);

    icon.classList.remove("bi-heart");
    icon.classList.add("bi-heart-fill");

    showToast("❤️ Added to wishlist");
  }

  saveWishlist();
  updateWishlistBadge();
}

/* ══════════════════════════════════════════════════════════════
           ORDER FORM
        ══════════════════════════════════════════════════════════════ */
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Validation
  let valid = true;

  const name = document.getElementById("fname");
  const email = document.getElementById("femail");
  const phone = document.getElementById("fphone");
  const city = document.getElementById("fcity");
  const address = document.getElementById("faddress");

  const nameErr = document.getElementById("fnameErr");
  const emailErr = document.getElementById("femailErr");
  const phoneErr = document.getElementById("fphoneErr");
  const cityErr = document.getElementById("fcityErr");
  const addressErr = document.getElementById("faddressErr");

  // Name
  if (!/^[a-zA-Z\s]{3,}$/.test(name.value.trim())) {
    nameErr.classList.add("show");
    valid = false;
  } else nameErr.classList.remove("show");

  // Email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    emailErr.classList.add("show");
    valid = false;
  } else emailErr.classList.remove("show");

  // Phone
  if (!/^[0-9]{10}$/.test(phone.value.trim())) {
    phoneErr.classList.add("show");
    valid = false;
  } else phoneErr.classList.remove("show");

  // City
  if (city.value.trim().length < 2) {
    cityErr.classList.add("show");
    valid = false;
  } else cityErr.classList.remove("show");

  // Address
  if (address.value.trim().length < 10) {
    addressErr.classList.add("show");
    valid = false;
  } else addressErr.classList.remove("show");

  if (!valid) return;

  // Success
  this.style.display = "none";
  document.getElementById("successMsg").classList.add("show");
  // Clear cart after order
  cart = [];
  saveCart();
  updateCartBadge();
  renderProducts();
});

function resetForm() {
  document.getElementById("orderForm").reset();
  document.getElementById("orderForm").style.display = "block";
  document.getElementById("successMsg").classList.remove("show");
  document
    .querySelectorAll(".form-error")
    .forEach((e) => e.classList.remove("show"));
}

/* ══════════════════════════════════════════════════════════════
           TOAST NOTIFICATIONS
        ══════════════════════════════════════════════════════════════ */
function showToast(msg) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast-ff";
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    toast.style.transition = "all .3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ══════════════════════════════════════════════════════════════
           NEWSLETTER
        ══════════════════════════════════════════════════════════════ */
function subscribeNewsletter() {
  const email = document.getElementById("nlEmail").value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("⚠️ Please enter a valid email address.");
    return;
  }
  document.getElementById("nlEmail").value = "";
  showToast("🌿 Thanks for subscribing! Welcome to the Flora Fusion family.");
}

/* ══════════════════════════════════════════════════════════════
           MOBILE MENU
        ══════════════════════════════════════════════════════════════ */
function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}
function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}

/* ══════════════════════════════════════════════════════════════
           NAVBAR SCROLL EFFECT
        ══════════════════════════════════════════════════════════════ */
window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  const scrollBtn = document.getElementById("scrollTop");

  if (window.scrollY > 60) {
    nav.classList.add("scrolled");
    scrollBtn.classList.add("show");
  } else {
    nav.classList.remove("scrolled");
    scrollBtn.classList.remove("show");
  }
});

/* ══════════════════════════════════════════════════════════════
           SCROLL REVEAL OBSERVER
        ══════════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

function initReveal() {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));
}

/* ══════════════════════════════════════════════════════════════
           INITIALISE ON LOAD
        ══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartBadge();
  updateWishlistBadge(); // 👈 YE ADD KARO
  initReveal();
});
// 👉 YAHAN SE TUMHARE WISHLIST FUNCTIONS START HONGE

function updateWishlistBadge() {
  document.getElementById("wishlistBadge").textContent = wishlist.length;
}

function openWishlist() {
  renderWishlist();
  document.getElementById("wishlistSidebar").classList.add("open");
  document.getElementById("wishlistOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeWishlist() {
  document.getElementById("wishlistSidebar").classList.remove("open");
  document.getElementById("wishlistOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function renderWishlist() {
  const container = document.getElementById("wishlistItems");

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">💔</div>
        <p>Your wishlist is empty.<br/>Start saving your favorite plants!</p>
        <button onclick="closeWishlist()" class="btn-primary-ff" style="margin-top:16px;font-size:.85rem;padding:10px 22px;">
          Explore Plants
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = wishlist
    .map(
      (item) => `
      <div class="wishlist-item">
        <div class="wishlist-item-img">${item.emoji}</div>

        <div class="wishlist-item-info">
          <div class="wishlist-item-name">${item.name}</div>
          <div class="wishlist-item-price">₹${item.price}</div>

          <div class="wishlist-actions">
            <button class="move-cart-btn" onclick="moveToCart(${item.id})">
              <i class="bi bi-bag-plus"></i> Add to Cart
            </button>

            <button class="remove-btn" onclick="removeFromWishlist(${item.id})">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `,
    )
    .join("");
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter((item) => item.id !== id);

  saveWishlist();
  updateWishlistBadge();
  renderWishlist();
  renderProducts(); // 👈 IMPORTANT (heart sync)
}
function moveToCart(id) {
  addToCart(id); // cart me add karega
  removeFromWishlist(id); // wishlist se remove karega
}
function handleSearch() {
  searchQuery = document.getElementById("searchInput").value.toLowerCase();
  const box = document.getElementById("suggestionsBox");

  if (searchQuery === "") {
    box.style.display = "none";
    renderProducts();
    return;
  }

  const matches = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery),
  );

  box.innerHTML = matches
    .slice(0, 5)
    .map((p) => `<li onclick="selectSuggestion('${p.name}')">${p.name}</li>`)
    .join("");

  box.style.display = "block";

  renderProducts();
}

// function selectSuggestion(name) {
//   document.getElementById("searchInput").value = name;
//   document.getElementById("suggestionsBox").style.display = "none";
//   searchQuery = name;
//   renderProducts();

//   document.getElementById("products").scrollIntoView({
//     behavior: "smooth",
//   });
// }
