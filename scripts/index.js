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