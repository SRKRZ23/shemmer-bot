// Инициализация карты
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.2995, lng: 69.2401 }, // Координаты Ташкента
        zoom: 12,
        styles: [
            { elementType: "geometry", stylers: [{ color: "#212121" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ],
    });

    // Местоположения в Ташкенте
    const locations = [
        { name: "Салон красоты", lat: 41.3111, lng: 69.2797 },
        { name: "Мастерская ремонта", lat: 41.2995, lng: 69.2401 },
        { name: "Спа-центр", lat: 41.3275, lng: 69.2813 },
    ];

    locations.forEach(location => {
        new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }
        });
    });
}

// Показать основной интерфейс после открывающей сцены
window.onload = function() {
    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("app-container").classList.remove("hidden");
    }, 3000);
};

// Анимация карточек при прокрутке
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("slide-in");
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

// Навигация по вкладкам
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(item => {
    item.addEventListener("click", () => {
        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        const page = item.getAttribute("data-page");
        alert(`Переход на страницу: ${page}`); // Здесь можно добавить логику перехода на страницу
    });
});

// Поддержка PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker registered', reg))
        .catch(err => console.log('Service Worker registration failed', err));
}

