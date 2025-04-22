import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
import requests

# Настройка логирования
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Токен бота
TELEGRAM_TOKEN = "8080522396:AAF5GtOWuEOfP2_uFXTI-gw4Nz2FAIsHqdI"
WEB_APP_URL = "https://shimmercad.netlify.app/"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.info("Получена команда /start")
    keyboard = [
        [InlineKeyboardButton("Открыть Shemmer", web_app={"url": WEB_APP_URL})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Добро пожаловать в Shemmer! Нажмите кнопку ниже, чтобы открыть приложение:", reply_markup=reply_markup)

async def button(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()

def main() -> None:
    application = Application.builder().token(TELEGRAM_TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(button))
    logger.info("Бот запущен")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()

