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

// HAMBURGER MENU (MOBILE)

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking a link (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

/* Scroll effect */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// SECTION FADE-IN ON SCROLL

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
    });
  },
  {
    threshold: 0.2,
  },
);

aboutDivs.forEach((div) => observer.observe(div));

document.addEventListener("DOMContentLoaded", () => {
  const texts = document.querySelectorAll(".about-text");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
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

const form = document.getElementById("contactForm");

const modal = document.getElementById("formModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();

  // validation
  if (!name || !email || !message) {
    modalTitle.textContent = "Error!";
    modalMessage.textContent = "Please fill all fields.";
    modal.style.display = "block";
    return;
  }

  if (!validateEmail(email)) {
    modalTitle.textContent = "Error!";
    modalMessage.textContent = "Invalid email address.";
    modal.style.display = "block";
    return;
  }

  // send to Formspree
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        modalTitle.textContent = "Success!";
        modalMessage.textContent = "Message sent successfully!";
        form.reset();
      } else {
        modalTitle.textContent = "Error!";
        modalMessage.textContent = "Failed to send message.";
      }
      modal.style.display = "block";
    })
    .catch(() => {
      modalTitle.textContent = "Error!";
      modalMessage.textContent = "Network error.";
      modal.style.display = "block";
    });
});

const closeModal = document.querySelector(".modal .close");
const modalCloseBtn = document.getElementById("modalCloseBtn");

// close when X clicked
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// close when button clicked
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// close when clicking outside popup
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// email validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Email validation function
// function validateEmail(email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// }

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

window.addEventListener("load", () => {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.remove("active"); // reset menu
});

const navLinksItems = document.querySelectorAll("#navLinks a");

navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active"); // close menu when clicked
  });
});

window.onpageshow = function () {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.remove("active");
};

//form submission
