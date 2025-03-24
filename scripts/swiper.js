let thumbsSwiper;
let mainSwiper

function initSwiper() {
  // Миниатюры (thumbs)
  thumbsSwiper = new Swiper("#thumbs-slider", {
    slidesPerView: "auto", // Количество миниатюр на экране
    spaceBetween: 10, // Расстояние между миниатюрами
    freeMode: true, // Позволяет листать вручную
    watchSlidesProgress: true,
  });

  // Основной слайдер (большие картинки)
  mainSwiper = new Swiper("#main-slider", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbsSwiper, // Привязываем миниатюры
    },
  });
}

document.addEventListener("DOMContentLoaded", initSwiper);