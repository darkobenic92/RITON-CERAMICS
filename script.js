document.querySelectorAll('.corner-logo').forEach(logo => {
  logo.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});

const gallery = document.getElementById("gallery");

if (gallery) {

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  const images = [
    "Beige white coffe cup.jpg",
    "Beige-white tea cup.jpg",
    "black and white dot coffee cups.jpeg",
    "Brown and beige tea cups.jpg",
    "Brown-white clay tea cups.jpg",
    "Brown-white coffe cup.jpg",
    "Brown-white tea cup.jpg",
    "Clay coffee cups palette.jpg",
    "Clay coffee cups.jpg",
    "Clay vases.jpg",
    "Coffee cup brown-white.jpg",
    "Dalmatian dog coffee cup.jpeg",
    "Handcrafted clay bottle Casita.png",
    "Rock clay dinner plate.jpg",
    "Rock clay plate.jpg",
    "Rose-white coffee cup.jpg",
    "Stone desert plate.jpg",
    "Terra handcrafted clay bottle.png",
    "white coffee cup.jpg",
    "White-black coffee cups.jpeg",
    "White-brown clay tea cup.jpg"
  ];

  let currentIndex = 0;

  images.forEach((img, index) => {
    const li = document.createElement("li");
    const image = document.createElement("img");

    image.src = `media/thumbs/${img}`;
    image.alt = img;
    image.loading = "lazy";

    image.addEventListener("load", () => {
      setTimeout(() => {
        image.classList.add("pop-in");
      }, index * 60);
    });

    image.addEventListener("click", () => openLightbox(index));

    li.appendChild(image);
    gallery.appendChild(li);
  });

  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    showImage();
  }

  function showImage() {
    lightboxImg.src = `media/full/${images[currentIndex]}`;
    caption.textContent = images[currentIndex];
  }

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
      } else if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage();
      } else if (e.key === "Escape") {
        lightbox.style.display = "none";
      }
    }
  });

}
