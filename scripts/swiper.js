let thumbsSwiper;
let mainSwiper
let productPageSwiper;

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

  productPageSwiper = new Swiper("#product-page-slider", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".product-slider__button-next",
      prevEl: ".product-slider__button-prev",
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    }
  });
}

document.addEventListener("DOMContentLoaded", initSwiper);