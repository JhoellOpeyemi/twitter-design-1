const track = document.querySelector(".products__details-section--track");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const svgBg = document.querySelector(".products__img-group--svg");
const svgPath = svgBg.querySelector("path");
const textTrack = document.querySelector(".products__img-group--text-track");
const imagesTrack = document.querySelector(".products__img-group--images");
const iconsGroup = document.querySelector(".icons-group");

const numberOfSlides = track.children.length;
let move = 0;
const colors = ["#7F5BE1", "#FEDD6A", "#58F1DD"];

let lessThanDesktop;
let screenWidth;
let smallScreenSize;

const checkIfLessThanDesktop = () => {
  screenWidth = window.innerWidth;
  smallScreenSize = 1050;

  lessThanDesktop = smallScreenSize - screenWidth > 0;
  return lessThanDesktop;
};

const handleSlide = (track, currentSlide, targetSlide) => {
  checkIfLessThanDesktop();
  currentSlide.classList.remove("current");
  targetSlide.classList.add("current");
  track.style.transform = `translateX(calc(100% / ${numberOfSlides} * -${move}))`;

  if (lessThanDesktop) {
    svgBg.style.transform = `translateX(-50%) rotate(calc(1turn / ${numberOfSlides} * ${move}))`;
  } else {
    svgBg.style.transform = `rotate(calc(1turn / ${numberOfSlides} * ${move}))`;
  }

  svgPath.style.fill = colors[`${move}`];
};

const handleTextSlide = (track, currentSlide, targetSlide) => {
  currentSlide.classList.remove("current");
  targetSlide.classList.add("current");
  track.style.transform = `translate(calc(100% / ${numberOfSlides} * -${move}))`;
};

const handleImageSlide = (imagesTrack, currentImage, targetImage) => {
  checkIfLessThanDesktop();

  currentImage.classList.remove("current");
  targetImage.classList.add("current");

  if (lessThanDesktop) {
    imagesTrack.style.transform = `translateX(-50%) rotate(calc(1turn / ${numberOfSlides} * ${move}))`;
  } else {
    imagesTrack.style.transform = `rotate(calc(1turn / ${numberOfSlides} * ${move}))`;
  }
};

nextBtn.addEventListener("click", () => {
  const currentSlide = track.querySelector(
    ".products__details-section--slide.current"
  );
  const nextSlide = currentSlide.nextElementSibling;

  const currentTextSlide = textTrack.querySelector(".current");
  const nextTextSlide = currentTextSlide.nextElementSibling;

  const currentImage = imagesTrack.querySelector(".current");
  const nextImage = currentImage.nextElementSibling;

  if (!nextSlide) {
    return;
  }
  move++;

  handleSlide(track, currentSlide, nextSlide);
  handleTextSlide(textTrack, currentTextSlide, nextTextSlide);
  handleImageSlide(imagesTrack, currentImage, nextImage);
});

prevBtn.addEventListener("click", () => {
  const currentSlide = track.querySelector(
    ".products__details-section--slide.current"
  );
  const prevSlide = currentSlide.previousElementSibling;

  const currentTextSlide = textTrack.querySelector(".current");
  const prevTextSlide = currentTextSlide.previousElementSibling;

  const currentImage = imagesTrack.querySelector(".current");
  const prevImage = currentImage.previousElementSibling;

  if (!prevSlide) {
    return;
  }
  move--;
  handleSlide(track, currentSlide, prevSlide);
  handleTextSlide(textTrack, currentTextSlide, prevTextSlide);
  handleImageSlide(imagesTrack, currentImage, prevImage);
});

iconsGroup.addEventListener("click", (e) => {
  const targetBtn = e.target.closest("button");
  if (!targetBtn) return;

  const currentBtn = iconsGroup.querySelector(".current");
  currentBtn.classList.remove("current");
  targetBtn.classList.add("current");
});
