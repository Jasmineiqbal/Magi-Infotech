window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded"); // fade-in on page load
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.endsWith(".html")) {
      e.preventDefault(); // prevent immediate navigation
      document.body.classList.remove("loaded"); // fade-out effect
      setTimeout(() => {
        window.location.href = href;
      }, 500); // match with CSS transition duration
    }
  });
});

// =========================
// HAMBURGER MENU (MOBILE)
// =========================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu when a link is clicked (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });
}

// =========================
// SECTION FADE-IN ON SCROLL
// =========================
const sections = document.querySelectorAll("section");

const fadeInOnScroll = () => {
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    const trigger = window.innerHeight / 1.3; // trigger before fully in view
    if (top < trigger) {
      section.classList.add("show");
    }
  });
};

// Initial check in case some sections are already in view
fadeInOnScroll();

// Add scroll listener
window.addEventListener("scroll", fadeInOnScroll);

/* Basic styling */
const aboutDivs = document.querySelectorAll(".about-text");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
      // Optional: remove class when scrolling back up
      // else {
      //   entry.target.classList.remove('visible');
      // }
    });
  },
  {
    threshold: 0.2, // 20% of the div must be visible
  },
);

aboutDivs.forEach((div) => observer.observe(div));

document.addEventListener("DOMContentLoaded", () => {
  const texts = document.querySelectorAll(".about-text");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // fade in
          obs.unobserve(entry.target); // stop observing after animation
        }
      });
    },
    { threshold: 0.2 },
  );

  texts.forEach((text) => {
    observer.observe(text);

    // **Force visible immediately on mobile/tablet**
    if (window.innerWidth <= 768) {
      text.classList.add("visible");
    }
  });
});

//cards

const cards = document.querySelectorAll(".card");

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

cards.forEach((card) => {
  cardObserver.observe(card);
});

cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Select the form
const contactForm = document.querySelector(".contact form");
const modal = document.getElementById("formModal");
const closeModal = document.querySelector(".modal .close");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = contactForm.querySelector('input[type="text"]').value.trim();
  const email = contactForm.querySelector('input[type="email"]').value.trim();
  const message = contactForm.querySelector("textarea").value.trim();

  // Basic validation
  if (name === "" || email === "" || message === "") {
    modalTitle.textContent = "Error!";
    modalMessage.textContent = "Please fill in all fields before submitting.";
    modal.style.display = "block";
  } else if (!validateEmail(email)) {
    modalTitle.textContent = "Error!";
    modalMessage.textContent = "Please enter a valid email address.";
    modal.style.display = "block";
  } else {
    modalTitle.textContent = "Success!";
    modalMessage.textContent = "Thank you! Your message has been sent.";
    modal.style.display = "block";
    contactForm.reset();
  }
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Close modal
closeModal.addEventListener("click", () => (modal.style.display = "none"));
modalCloseBtn.addEventListener("click", () => (modal.style.display = "none"));

// Close when clicking outside modal
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

function goToPage(page) {
  window.location.href = page;
}
