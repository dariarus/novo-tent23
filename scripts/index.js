// Эффект hover у иконок в блоках 'Header' и 'Contacts'
const headerIconPlace = document.querySelector('.header__contacts-icons-wrapper')
headerIconPlace.querySelectorAll('.contacts-icon').forEach((headerIcon) => {
  headerIcon.addEventListener('mouseenter', () => {
    headerIcon.classList.add('contacts-icon_place_header');
  });

  headerIcon.addEventListener('mouseleave', () => {
    headerIcon.classList.remove('contacts-icon_place_header');
  });
});

document.querySelectorAll('.button').forEach(button => {
  const buttonIcon = button.querySelector('.contacts-icon');
  button.addEventListener('mouseenter', () => {
    buttonIcon.classList.add('contacts-icon_place_button');
  });

  button.addEventListener('mouseleave', () => {
    buttonIcon.classList.remove('contacts-icon_place_button');
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

// Плавный скролл страницы
document.querySelectorAll('.navigation__link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1); // Убираем #
    const targetElement = document.getElementById(targetId);

    const headerHeight = document.querySelector('header').offsetHeight;

    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight; // Учитываем отступ для фиксированного меню

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
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
function renderImages() {
  // Слайдер для больших изображений
  const mainSwiperContainer = document.getElementById('main-slider');
  const mainSwiperWrapper = mainSwiperContainer.querySelector('.swiper-wrapper');
  clearContainer(mainSwiperWrapper);
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

  // Пересчёт классов
  thumbsSwiper.update();
  mainSwiper.update();

}

function openPopup() {
  renderImages();
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
const remainingPicturesCount = galleryImages.length - 5;

const lastImage = document.querySelector('.gallery__image-wrapper_with-content');
if (lastImage) {
  lastImage.setAttribute('image-count', `+${remainingPicturesCount}`);
}
lastImage.addEventListener('click', openPopup);

/* ------------------------------- */

// Загрузка элементов на страницу с описанием товаров
const header = document.getElementById('header');
const mainPageContent = document.getElementById('main-page-content');
const productPageContent = document.getElementById('product-page-content');

const productSlide = document.getElementById('product-page-slider')
const productSliderWrapper = productSlide.querySelector('.swiper-wrapper');

// Функция для отображения страницы товара
function showProductPage(productId) {
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
    header.style.display = 'none';
    mainPageContent.style.display = 'none';

    // Меняем URL в адресной строке
    history.pushState({ product: productId }, '', `?product=${encodeURIComponent(productId)}`);
  }
}

// Назад к списку товаров
function showMainContent() {
  productPageContent.style.display = 'none';
  header.style.display = 'block';
  mainPageContent.style.display = 'block';

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