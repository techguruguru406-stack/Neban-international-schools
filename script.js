const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      active?.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
form?.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const className = document.getElementById("class").value;
  const message = document.getElementById("message").value.trim();

  const whatsappMessage =
`Hello Neban International Schools,

My name is ${name}.
Phone: ${phone}
Class of interest: ${className}

${message || "I would like to make an admission enquiry and get more information about the school."}`;

  window.open(
    `https://wa.me/2348035373608?text=${encodeURIComponent(whatsappMessage)}`,
    "_blank",
    "noopener"
  );
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.title;
    lightboxTitle.textContent = item.dataset.title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
});
