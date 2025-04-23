import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackContext

# Настройка логирования
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Токен бота
TOKEN = "7647048813:AAFyYk-d098YLrODIY0Wpr0sxVXmthScU9Q"

# URL веб-приложения
WEB_APP_URL = "https://shimmercad.netlify.app"

async def start(update: Update, context: CallbackContext) -> None:
    """Обработчик команды /start"""
    logger.info("Received /start command from user: %s", update.effective_user.id)
    
    # Создаём кнопку для открытия веб-приложения
    keyboard = [
        [InlineKeyboardButton("Открыть приложение", web_app=WEB_APP_URL)]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Отправляем сообщение с кнопкой
    await update.message.reply_text(
        "Добро пожаловать в Shemmer Bot! Нажмите кнопку ниже, чтобы открыть приложение.",
        reply_markup=reply_markup
    )
    logger.info("Sent web app button with URL: %s", WEB_APP_URL)

def main() -> None:
    """Запуск бота"""
    # Создаём приложение
    application = Application.builder().token(TOKEN).build()

    # Регистрируем обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Запускаем бота
    logger.info("Starting bot...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()

