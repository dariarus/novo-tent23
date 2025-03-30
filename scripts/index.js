"use strict"

// отслеживание ширины окна
const header = document.getElementById('header');
const headerMobile = document.getElementById('header-mobile');
let isProductPageOpen = false;

function getIsMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

// Переключение header между мобильной и десктопной версиями
function toggleHeaders() {
  // Ничего не делать, если открыта страница товара
  if (isProductPageOpen) return;

  const isMobile = getIsMobile();
  header.style.display = isMobile ? "none" : "block";
  headerMobile.style.display = isMobile ? "block" : "none";
  console.log('isMobile', isMobile)
}

// Запускаем при загрузке страницы
toggleHeaders();

// Следим за изменением размеров окна
window.addEventListener("resize", toggleHeaders);

// Эффект hover у иконок в блоках 'Header' и 'Contacts'
document.querySelectorAll('.contacts-icons-wrapper').forEach((wrapper) => {
  wrapper.querySelectorAll('.contacts-icon').forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
      icon?.classList.add('contacts-icon_place_shell'); // shell - хедер и футер, т.е. "оболочка" над контентом
    });

    icon.addEventListener('mouseleave', () => {
      icon?.classList.remove('contacts-icon_place_shell');
    });
  })

});

document.querySelectorAll('.button').forEach(button => {
  const buttonIcon = button.querySelector('.contacts-icon');
  button.addEventListener('mouseenter', () => {
    buttonIcon?.classList.add('contacts-icon_place_button');
  });

  button.addEventListener('mouseleave', () => {
    buttonIcon?.classList.remove('contacts-icon_place_button');
  });
});

// Переход на соц.сети при клике на кнопки в блоке 'Contacts'
function openInstagram() {
  window.open('https://www.instagram.com/novo_tent/?igsh=MTNobHdxYWs1eW9kYw%3D%3D&utm_source=qr#');
}

function openWhatsApp() {
  window.open('https://wa.me/79672229555');
}

function openMail() {
  window.open('mailto:novotent.23@mail.ru');
}

document.getElementById('instagramButton').addEventListener('click', openInstagram);
document.getElementById('whatsAppButton').addEventListener('click', openWhatsApp);
document.getElementById('emailButton').addEventListener('click', openMail);

const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('.navigation');
const navMobile = document.querySelector('.navigation_mobile');
// Открыть/закрыть меню-бургер
if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('menu-icon_active');
    navMobile.classList.toggle('navigation_active');
    document.body.classList.toggle('body-overlay');
  })
}

function addEventListenerToNavLink(link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1); // Убираем #
    const targetElement = document.getElementById(targetId);

    const headerHeight = document.querySelector('header').offsetHeight + 20;

    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight; // Учитываем отступ для фиксированного меню

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }

    if (menuIcon.classList.contains('menu-icon_active')) {
      menuIcon.classList.remove('menu-icon_active');
      navMobile.classList.remove('navigation_active');
      document.body.classList.remove('body-overlay');
    }
  })
}

// Плавный скролл страницы
nav.querySelectorAll('.navigation__link').forEach(link => {
  addEventListenerToNavLink(link);
});
navMobile.querySelectorAll('.navigation__link').forEach(link => {
  addEventListenerToNavLink(link);
});

// Эффект hover у картинки товара в блоке 'Products'
document.querySelectorAll('.product-card').forEach((productCard) => {
  const productImage = productCard.querySelector('.product-card__image');
  if (productImage) {
    productCard.addEventListener('mouseenter', () => {
      productImage.classList.add('product-card__image_hovered');
    });

    productCard.addEventListener('mouseleave', () => {
      productImage.classList.remove('product-card__image_hovered');
    });
  }
});

// Переход к WhatsApp при клике на 'Заказать' в блоке 'Products'
document.querySelectorAll('.button_colored').forEach(button => {
  button.addEventListener('click', function () {
    openWhatsApp();
  });
});

// Переход к WhatsApp при клике на 'Заказать' на странице с описанием товара
document.querySelector('.button_reversed-colors').addEventListener('click', function () {
  openWhatsApp();
});

// Попап
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const cross = popup.querySelector('.popup__close-icon');

// Очистка родительского контейнера слайдера, чтобы при каждом его повторном открытии массив эл-тов не дублировался
function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// Отрисовать массив изображений в открывшемся попапе
function renderImages(selectedImage) {
  // Слайдер для больших изображений
  const mainSwiperContainer = document.getElementById('main-slider');
  const mainSwiperWrapper = mainSwiperContainer.querySelector('.swiper-wrapper');
  clearContainer(mainSwiperWrapper);

  // Определяем индекс выбранного изображения
  const selectedIndex = galleryImages.findIndex(image => {
    return selectedImage.src.toLowerCase().includes(image.src.toLowerCase())
  });

  galleryImages.forEach((image) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.classList.add('popup__opened-image');
    slide.appendChild(img);
    mainSwiperWrapper.appendChild(slide);
  });

  // Слайдер для миниатюр
  const thumbsSwiperContainer = document.getElementById("thumbs-slider");
  const thumbsSwiperWrapper = thumbsSwiperContainer.querySelector('.swiper-wrapper');
  clearContainer(thumbsSwiperWrapper);
  galleryImages.forEach((image) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide", "slider__slide");
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.classList.add('popup__opened-image');
    slide.appendChild(img);
    thumbsSwiperWrapper.appendChild(slide);
  });

  // Реинициализация Swiper
  const thumbsSwiper = new Swiper("#thumbs-slider", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: false,
    allowTouchMove: true,
  });

  const mainSwiper = new Swiper("#main-slider", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
    autoplay: false,
    allowTouchMove: true,
  });


  // Переключаем главный слайдер на выбранное изображение
  if (selectedIndex !== -1) {
    mainSwiper.slideTo(selectedIndex);
  }

  // Пересчёт классов
  thumbsSwiper.update();
  mainSwiper.update();
}

function openPopup(img) {
  // Если галерея в режиме слайдера, открыть с выбранного изображения, иначе с первого
  const isSliderMode = window.matchMedia("(max-width: 680px)").matches;
  const selectedImage = isSliderMode ? img : galleryImages[0];
  renderImages(selectedImage);
  overlay.classList.add('overlay_visible');
  popup.classList.add('popup_opened');
  document.body.classList.add('body-overlay');
}

function closePopup() {
  overlay.classList.remove('overlay_visible');
  popup.classList.remove('popup_opened');
  document.body.classList.remove('body-overlay');
}

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
});

overlay.addEventListener('click', closePopup);
cross.addEventListener('click', closePopup);

// Динамическая подгрузка на страницу количества оставшихся фото в блоке 'Gallery'
const galleryContainer = document.querySelector('.gallery');
const gallerySlider = document.getElementById('gallery-slider');

function renderGallery() {
  // Очистить контейнер галереи
  while (galleryContainer.firstChild) {
    galleryContainer.removeChild(galleryContainer.firstChild);
  }

  if (window.matchMedia("(max-width: 680px)").matches) {
    // Если экран меньше 680px, используем Swiper
    galleryContainer.style.display = 'none';
    gallerySlider.style.display = 'block';
    const swiperWrapper = gallerySlider.querySelector('.swiper-wrapper');

    galleryImages.forEach((image) => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide', 'gallery-slider__slide');

      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.classList.add('gallery-image');

      swiperSlide.appendChild(img);
      swiperWrapper.appendChild(swiperSlide);
    });

    gallerySlider.appendChild(swiperWrapper);

    const pagination = document.createElement('div');
    pagination.classList.add('swiper-pagination');
    gallerySlider.appendChild(pagination);

    new Swiper('#gallery-slider', {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
      },
    });
  } else {
    galleryContainer.style.display = 'grid';
    gallerySlider.style.display = 'none';
    // Обычная галерея для больших экранов
    let visibleImages;
    if (window.matchMedia("(max-width: 768px)").matches) {
      visibleImages = 4;
    } else if (window.matchMedia("(max-width: 910px)").matches) {
      visibleImages = 8;
    } else {
      visibleImages = 5;
    }

    galleryImages.slice(0, visibleImages).forEach((image, index) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('gallery__image-wrapper');

      if (index === 0) {
        wrapper.classList.add('gallery__image-big-wrapper');
      }
      if (index === visibleImages - 1) {
        wrapper.classList.add('gallery__image-wrapper_with-content');
      }

      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.classList.add('gallery-image');

      wrapper.appendChild(img);
      galleryContainer.appendChild(wrapper);
    });

    // Обновляем количество оставшихся изображений
    const remainingPicturesCount = galleryImages.length - visibleImages;
    const lastImage = document.querySelector('.gallery__image-wrapper_with-content');

    if (lastImage) {
      lastImage.setAttribute('image-count', `+${remainingPicturesCount}`);
      lastImage.addEventListener('click', openPopup);
    }
  }
}

window.addEventListener('load', function() {
  // Здесь добавляем слушатель после загрузки всех ресурсов
  const gallerySlider = document.getElementById('gallery-slider');
  gallerySlider.addEventListener('click', (event) => {
    if (event.target.classList.contains('gallery-image')) {
      openPopup(event.target);
    }
  });
});

// Вызов функции рендеринга галереи
renderGallery();

// Ререндер галереи при изменении размера окна
window.addEventListener('resize', renderGallery);

/* ------------------------------- */

// Загрузка элементов на страницу с описанием товаров
const mainPageContent = document.getElementById('main-page-content');
const productPageContent = document.getElementById('product-page-content');

const productSlide = document.getElementById('product-page-slider')
const productSliderWrapper = productSlide.querySelector('.swiper-wrapper');

// Функция для отображения страницы товара
function showProductPage(productId) {
  isProductPageOpen = true;
  const product = productsDescription.find(p => p.id === productId);

  if (product) {
    document.querySelector('.product-page__text_title').textContent = product.name;
    document.querySelector('.product-page__text_price').innerHTML = product.price;
    document.querySelector('.product-page__text_description').textContent = product.description;
    document.querySelector('.product-page__text_paragraph').textContent = product.materials;

    clearContainer(productSliderWrapper);
    product.photos.forEach((image) => {
      const productSlide = document.createElement("div");
      productSlide.classList.add("swiper-slide", "product-slider__slide");
      const productImg = document.createElement("img");
      productImg.src = image.src;
      productImg.alt = image.alt;
      productImg.classList.add('product-slider__image');
      productSlide.appendChild(productImg);
      productSliderWrapper.appendChild(productSlide);

      const productPageSwiper = new Swiper("#product-page-slider", {
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

      productPageSwiper.update();
    });

    // Показываем детальную страницу
    productPageContent.style.display = 'block';
    mainPageContent.style.display = 'none';
    if (getIsMobile()) {
      headerMobile.style.display = 'none';
    } else {
      header.style.display = 'none';
    }

    // Меняем URL в адресной строке
    history.pushState({product: productId}, '', `?product=${encodeURIComponent(productId)}`);
  }
}

// Назад к списку товаров
function showMainContent() {
  isProductPageOpen = false;
  productPageContent.style.display = 'none';
  mainPageContent.style.display = 'block';
  if (getIsMobile()) {
    headerMobile.style.display = 'block';
  } else {
    header.style.display = 'block';
  }
// Обновляем URL, убирая параметр ?product=
  history.pushState(null, '', window.location.pathname);
}

// Обрабатываем клик по карточке товара
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const productId = card.getAttribute('id');
    showProductPage(productId);
  });
});

// Кнопка "Назад"
// document.getElementById('back-button').addEventListener('click', showProductList);

// Если URL уже содержит ?product=, загружаем товар при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get('product');

  if (productName) {
    showProductPage(decodeURIComponent(productName));
  }
});

// Позволяет работать с кнопкой "назад" браузера
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.product) {
    showProductPage(event.state.product);
  } else {
    showMainContent();
  }
});