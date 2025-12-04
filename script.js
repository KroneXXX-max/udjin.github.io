

// -------------------- ЯНДЕКС КАРТА --------------------
ymaps.ready(init);

function init() {
    const map = new ymaps.Map("map", {
        center: [55.615167, 37.585207],
        zoom: 16,
        controls: ['zoomControl']
    });

    const placemark = new ymaps.Placemark(
        [55.615167, 37.585207],
        { balloonContent: "K-DETAILING" },
        { preset: "islands#yellowIcon" }
    );

    map.geoObjects.add(placemark);
}


// -------------------------------------------
// ОТПРАВКА ФОРМЫ В TELEGRAM
// -------------------------------------------
const TOKEN = "8355827513:AAHTZBtI3We-ByuZzpd2btN4iE2-w76r1tM";
const CHAT_ID = "1692646634";

const form = document.getElementById('booking-form');
const response = document.getElementById('form-response');

// Установка минимальной даты на текущую
const datetimeInput = document.getElementById('datetime');
const now = new Date();
const offset = now.getTimezoneOffset() * 60000;
const localISOTime = (new Date(now - offset)).toISOString().slice(0,16);
datetimeInput.min = localISOTime;

// Обработка формы
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // Получаем выбранные услуги (массив)
    const selectedServices = Array.from(formData.getAll('service')).join(', ');

    const msg = `
🔥 *Новая заявка K-DETAILING*  
👤 Имя: ${formData.get("name")}  
📞 Телефон: ${formData.get("phone")}  
💬 Услуги: ${selectedServices}  
⏰ Дата: ${formData.get("datetime")}
`;

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: msg,
            parse_mode: "Markdown"
        })
    });

    response.textContent = "Заявка отправлена! Мы свяжемся с вами.";
    form.reset();
});
