// Плавная прокрутка по меню
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth" });
    });
});

// КАРТА Leaflet
document.addEventListener("DOMContentLoaded", () => {

    const map = L.map('map').setView([55.7887, 37.5932], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'K-DETAILING'
    }).addTo(map);

    L.marker([55.7887, 37.5932])
        .addTo(map)
        .bindPopup("K-DETAILING<br>Москва, Днепропетровская 18к1")
        .openPopup();
});

// Форма записи
const form = document.getElementById('booking-form');
const response = document.getElementById('form-response');

form.addEventListener('submit', e => {
    e.preventDefault();
    response.textContent = "Заявка отправлена! Мы свяжемся с вами.";
    form.reset();
});
