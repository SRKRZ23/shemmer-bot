import requests
import json
import time

# API-ключ Google Places API
API_KEY = "AIzaSyCLqgxw1QEiZ4gd-Nlsc3CgpWBYEP3Jn8k"

# Список городов и категорий
cities = ["Samarkand", "Bukhara", "Andijan", "Fergana", "Namangan", "Nukus"]
categories = ["салон красоты", "спа салон", "йога студия", "маникюрный салон"]

# Инициализация структуры данных
data = {"country": "Uzbekistan", "cities": {}}

# Функция для получения данных из Google Places API
def fetch_places(query):
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&language=ru&key={API_KEY}"
    response = requests.get(url)
    return response.json()

# Сбор данных для каждого города и категории
for city in cities:
    data["cities"][city] = []
    for category in categories:
        query = f"{category} {city}"
        print(f"Собираем данные для: {query}")
        result = fetch_places(query)
        
        if result.get("status") != "OK":
            print(f"Ошибка при запросе {query}: {result.get('status')}")
            continue

        for place in result.get("results", []):
            place_data = {
                "category": category.split()[0],  # Например, "салон" из "салон красоты"
                "name": place.get("name"),
                "lat": place.get("geometry", {}).get("location", {}).get("lat"),
                "lon": place.get("geometry", {}).get("location", {}).get("lng"),
                "address": place.get("formatted_address"),
                "services": category.split()[0].capitalize(),  # Например, "Beauty" из "салон красоты"
                "cost": "Неизвестно",
                "hours": place.get("opening_hours", {}).get("open_now", "Неизвестно") and "Open now" or "Closed",
                "phone": place.get("formatted_phone_number", "Неизвестно")
            }
            data["cities"][city].append(place_data)

        # Проверяем наличие следующей страницы результатов
        next_page_token = result.get("next_page_token")
        while next_page_token:
            print(f"Собираем следующую страницу для: {query}")
            time.sleep(2)  # Задержка для обработки токена
            next_url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken={next_page_token}&key={API_KEY}"
            next_result = requests.get(next_url).json()
            for place in next_result.get("results", []):
                place_data = {
                    "category": category.split()[0],
                    "name": place.get("name"),
                    "lat": place.get("geometry", {}).get("location", {}).get("lat"),
                    "lon": place.get("geometry", {}).get("location", {}).get("lng"),
                    "address": place.get("formatted_address"),
                    "services": category.split()[0].capitalize(),
                    "cost": "Неизвестно",
                    "hours": place.get("opening_hours", {}).get("open_now", "Неизвестно") and "Open now" or "Closed",
                    "phone": place.get("formatted_phone_number", "Неизвестно")
                }
                data["cities"][city].append(place_data)
            next_page_token = next_result.get("next_page_token")

# Сохранение данных в файл
with open("new_services_uzbekistan.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Данные успешно сохранены в new_services_uzbekistan.json")

