const gallery = document.getElementById("gallery");

if (gallery) {

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");
  const relatedPanel = document.getElementById("relatedPanel");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  const images = [
    "Beige white coffee cup.jpg",
    "Beige-white tea cup.jpg",
    "black and white dot coffee cups.jpeg",
    "Brown and beige tea cups.jpg",
    "Brown-white clay tea cups.jpg",
    "Brown-white coffee cup.jpg",
    "Brown-white tea cup.jpg",
    "Clay coffee cups palette.jpg",
    "Clay coffee cups.jpg",
    "Clay vases.jpg",
    "Coffee cup brown-white.jpg",
    "Dalmatian dog coffee cup.jpg",
    "Handcrafted clay bottle Casita.png",
    "Rock clay dinner plate.jpg",
    "Rock clay plate.jpg",
    "Rose-white coffee cup.jpg",
    "Stone desert plate.jpg",
    "Terra handcrafted clay bottle.png",
    "white coffee cup.jpg",
    "White-brown clay tea cup.jpg"
  ];

  let currentIndex = 0;
  let currentImage = "";

  images.forEach((img, index) => {
    const li = document.createElement("li");
    const image = document.createElement("img");

    image.src = `media/thumbs/${img}`;
    image.alt = img;

    image.addEventListener("load", () => {
      setTimeout(() => image.classList.add("pop-in"), index * 60);
    });

    image.addEventListener("click", () => openLightbox(index));

    li.appendChild(image);
    gallery.appendChild(li);
  });

  function openLightbox(index) {
    currentIndex = index;
    currentImage = images[currentIndex];
    lightbox.style.display = "flex";
    showImage(currentImage);
    loadSidebarImages();
  }

  function showImage(file) {
    currentImage = file;
    lightboxImg.src = `media/full/${file}`;
    highlightActiveThumb();
  }

  function loadSidebarImages() {
    relatedPanel.innerHTML = "";

    const mainImage = images[currentIndex];

    addSidebarThumb(mainImage);

    const base = mainImage.replace(/\.(jpg|jpeg|png)$/i, "");

    const possible = [1,2,3].flatMap(n =>
     ["jpg","png","jpeg"].map(ext => `${base} ${n}.${ext}`)
   );


    possible.forEach(name => {
      const testImg = new Image();
      testImg.src = `media/full/${name}`;

      testImg.onload = () => addSidebarThumb(name);
    });
  }

  function addSidebarThumb(file) {
    const thumb = document.createElement("img");
    thumb.src = `media/full/${file}`;
    thumb.dataset.file = file;

    thumb.addEventListener("click", () => showImage(file));

    relatedPanel.appendChild(thumb);
    highlightActiveThumb();
  }

  function highlightActiveThumb() {
    document.querySelectorAll(".related-panel img").forEach(img => {
      img.classList.toggle("active", img.dataset.file === currentImage);
    });
  }

  function nextProduct() {
    currentIndex = (currentIndex + 1) % images.length;
    currentImage = images[currentIndex];
    showImage(currentImage);
    loadSidebarImages();
  }

  function prevProduct() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    currentImage = images[currentIndex];
    showImage(currentImage);
    loadSidebarImages();
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
     lightbox.style.display = "none";
  }
  });

  nextBtn.addEventListener("click", nextProduct);
  prevBtn.addEventListener("click", prevProduct);

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") nextProduct();
      else if (e.key === "ArrowLeft") prevProduct();
      else if (e.key === "Escape") lightbox.style.display = "none";
    }
  });

}
