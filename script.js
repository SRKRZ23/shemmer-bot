const http = require('http');
const fs = require('fs');
const path = require('path');

const translations = {
    ru: {
        tashkent: "Ташкент",
        hours: "Часы работы",
        services: "Услуги",
        prices: "Цены",
        category: "Категория",
        filterByCategory: "Фильтр по категории",
        all: "Все",
        welcome: "Добро пожаловать в Shemmer Bot",
        selectLanguage: "Выберите язык"
    },
    en: {
        tashkent: "Tashkent",
        hours: "Hours",
        services: "Services",
        prices: "Prices",
        category: "Category",
        filterByCategory: "Filter by Category",
        all: "All",
        welcome: "Welcome to Shemmer Bot",
        selectLanguage: "Select Language"
    }
};

let currentLang = 'ru'; // Язык по умолчанию

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/lang/')) {
        currentLang = req.url.split('/')[2] || 'ru';
        res.writeHead(302, { 'Location': '/' });
        res.end();
    } else if (req.url === '/') {
        try {
            const places = JSON.parse(fs.readFileSync(path.join(__dirname, 'places.json'), 'utf8'));
            const categories = [...new Set(places.tashkent.map(place => place.category))];
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Shemmer Bot</title>
                    <link rel="stylesheet" href="/style.css">
                </head>
                <body>
                    <div style="text-align: center; margin-bottom: 20px;">
                        <label for="lang">${translations[currentLang].selectLanguage}: </label>
                        <select id="lang" onchange="window.location.href='/lang/' + this.value">
                            <option value="ru" ${currentLang === 'ru' ? 'selected' : ''}>Русский</option>
                            <option value="en" ${currentLang === 'en' ? 'selected' : ''}>English</option>
                        </select>
                    </div>
                    <h1>${translations[currentLang].welcome}</h1>
                    <h2>${translations[currentLang].tashkent}</h2>
                    <div class="filter">
                        <label for="category">${translations[currentLang].filterByCategory}: </label>
                        <select id="category" onchange="filterPlaces()">
                            <option value="all">${translations[currentLang].all}</option>
                            ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
                        </select>
                    </div>
                    <ul id="places-list">
                        ${places.tashkent.map((place, index) => `
                            <li data-category="${place.category}" data-index="${index}">
                                <div class="place-name">${place.name}</div>
                                ${translations[currentLang].hours}: ${place.hours}<br>
                                ${translations[currentLang].services}: ${place.services.join(', ')}<br>
                                ${translations[currentLang].prices}: ${place.prices.join(', ')}<br>
                                ${translations[currentLang].category}: ${place.category}
                            </li>
                        `).join('')}
                    </ul>
                    <script>
                        function filterPlaces() {
                            const category = document.getElementById('category').value;
                            const places = document.querySelectorAll('#places-list li');
                            places.forEach(place => {
                                if (category === 'all' || place.getAttribute('data-category') === category) {
                                    place.style.display = 'block';
                                } else {
                                    place.style.display = 'none';
                                }
                            });
                        }
                    </script>
                </body>
                </html>
            `);
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Error: ${error.message}`);
        }
    } else if (req.url === '/style.css') {
        const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(css);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

