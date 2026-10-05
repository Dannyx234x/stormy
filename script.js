// ======================================================
// STORMY COMMUNICATION JOS
// script.js
// ======================================================


// ==============================
// MOBILE MENU
// ==============================

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");

    const icon = menuButton.querySelector("i");

    if (nav.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
}


// ==============================
// CLOSE MENU AFTER CLICKING LINK
// ==============================

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {

    if (nav) {
      nav.classList.remove("active");
    }

    if (menuButton) {
      const icon = menuButton.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });
});


// ==============================
// ACTIVE NAVIGATION LINK
// ==============================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

  let currentSection = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }

  });


  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") === `#${currentSection}`
    ) {
      link.classList.add("active");
    }

  });

});


// ==============================
// SMOOTH SCROLL
// ==============================

const internalLinks =
  document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetID = link.getAttribute("href");

    if (!targetID || targetID === "#") {
      return;
    }

    const target =
      document.querySelector(targetID);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


// ==============================
// PRODUCT SEARCH
// ==============================

const searchButton =
  document.querySelector(".search-button");

const productCards =
  document.querySelectorAll(".product-card");


// Create search overlay
const searchOverlay =
  document.createElement("div");

searchOverlay.className = "search-overlay";

searchOverlay.innerHTML = `

  <div class="search-box">

    <div class="search-top">

      <div>
        <span>STORMY COMMUNICATION</span>
        <h3>What are you looking for?</h3>
      </div>

      <button
        class="close-search"
        aria-label="Close search"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

    </div>


    <div class="search-input-wrapper">

      <i class="fa-solid fa-magnifying-glass"></i>

      <input
        type="text"
        id="productSearch"
        placeholder="Search phones, earbuds, watches..."
        autocomplete="off"
      >

    </div>


    <p class="search-message" id="searchMessage">
      Start typing to search our products.
    </p>

  </div>

`;

document.body.appendChild(searchOverlay);


const closeSearch =
  document.querySelector(".close-search");

const productSearch =
  document.getElementById("productSearch");

const searchMessage =
  document.getElementById("searchMessage");


// Open search
if (searchButton) {

  searchButton.addEventListener("click", () => {

    searchOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
      productSearch.focus();
    }, 200);

  });

}


// Close search
if (closeSearch) {

  closeSearch.addEventListener("click", () => {

    closeSearchBox();

  });

}


// Close by clicking outside
searchOverlay.addEventListener("click", (event) => {

  if (event.target === searchOverlay) {
    closeSearchBox();
  }

});


// Close with ESC
document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeSearchBox();
  }

});


function closeSearchBox() {

  searchOverlay.classList.remove("active");

  document.body.style.overflow = "";

}


// ==============================
// SEARCH PRODUCTS
// ==============================

if (productSearch) {

  productSearch.addEventListener("input", () => {

    const searchValue =
      productSearch.value
        .toLowerCase()
        .trim();


    let matches = 0;


    productCards.forEach((card) => {

      const productName =
        card
          .querySelector("h3")
          ?.textContent
          .toLowerCase() || "";


      const category =
        card
          .querySelector(".product-category")
          ?.textContent
          .toLowerCase() || "";


      const searchableText =
        `${productName} ${category}`;


      if (
        searchableText.includes(searchValue)
      ) {

        card.style.display = "";

        matches++;

      } else {

        card.style.display = "none";

      }

    });


    if (searchValue === "") {

      searchMessage.textContent =
        "Start typing to search our products.";

    } else if (matches === 0) {

      searchMessage.textContent =
        `No products found for "${productSearch.value}".`;

    } else {

      searchMessage.textContent =
        `${matches} product${matches > 1 ? "s" : ""} found.`;

    }

  });

}


// ==============================
// PRESS ENTER TO VIEW RESULTS
// ==============================

if (productSearch) {

  productSearch.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {

        closeSearchBox();

        const productsSection =
          document.getElementById("products");

        if (productsSection) {

          productsSection.scrollIntoView({
            behavior: "smooth"
          });

        }

      }

    }
  );

}


// ==============================
// PRODUCT VIEW BUTTON
// ==============================

const viewButtons =
  document.querySelectorAll(".product-view");

viewButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const card =
      button.closest(".product-card");

    if (!card) return;


    const productName =
      card.querySelector("h3")
        ?.textContent || "Product";


    const price =
      card.querySelector(
        ".product-bottom strong"
      )?.textContent || "";


    alert(
      `${productName}\n${price}\n\nContact Stormy Communication for availability.`
    );

  });

});


// ==============================
// SIMPLE SCROLL ANIMATION
// ==============================

const animatedElements =
  document.querySelectorAll(
    ".product-card, .category-card, .about-image, .about-content"
  );


const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "show-element"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


animatedElements.forEach((element) => {

  element.classList.add(
    "hidden-element"
  );

  observer.observe(element);

});


// ==============================
// CONSOLE MESSAGE
// ==============================

console.log(
  "Stormy Communication Jos website loaded successfully."
);