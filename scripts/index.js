// Переход на соц.сети при клике на кнопки в блоке "Contacts"
function openInstagram() {
  window.open("https://www.instagram.com/novo_tent/?igsh=MTNobHdxYWs1eW9kYw%3D%3D&utm_source=qr#");
}

function openWhatsApp() {
  window.open("https://wa.me/79672229555");
}

function openMail() {
  window.open("mailto:novotent.23@mail.ru");
}

document.getElementById("instagramButton").addEventListener("click", openInstagram);
document.getElementById("whatsAppButton").addEventListener("click", openWhatsApp);
document.getElementById("emailButton").addEventListener("click", openMail);

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

// Эффект hover у картинки товара в блоке "Products"
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

// Переход к WhatsApp при клике на "Заказать" в блоке "Products"
document.querySelectorAll(".button_colored").forEach(button => {
  button.addEventListener("click", function() {
    openWhatsApp();
  });
});
