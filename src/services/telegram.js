/**
 * Telegram Bot Service
 * Handles sending contact form submissions to Telegram
 */

const TelegramBot = require('node-telegram-bot-api');
const { logInfo, logError } = require('../utils/logger');

// Initialize bot with token from environment
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const chatId = process.env.TELEGRAM_CHAT_ID;

/**
 * Format contact form data into a nice Telegram message
 * @param {Object} data - Contact form data
 * @returns {string} Formatted message
 */
function formatContactMessage(data) {
  const { name, email, phone, message } = data;
  
  // Create a beautiful formatted message with emojis
  const formattedMessage = `
🏗️ *Jauns kontakta pieprasījums!*
━━━━━━━━━━━━━━━━━━━━

👤 *Vārds:* ${name}
📧 *E-pasts:* ${email}
📱 *Telefons:* ${phone}

💬 *Ziņa:*
${message}

━━━━━━━━━━━━━━━━━━━━
⏰ Saņemts: ${new Date().toLocaleString('lv-LV', { timeZone: 'Europe/Riga' })}
  `.trim();

  return formattedMessage;
}

/**
 * Send contact form data to Telegram
 * @param {Object} contactData - Contact form data
 * @returns {Promise<boolean>} Success status
 */
async function sendContactToTelegram(contactData) {
  try {
    // Validate that bot token and chat ID are configured
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      throw new Error('Telegram configuration missing: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
    }

    // Format the message
    const message = formatContactMessage(contactData);

    // Send message to Telegram with markdown formatting
    await bot.sendMessage(chatId, message, { 
      parse_mode: 'Markdown',
      disable_web_page_preview: true 
    });

    logInfo(`✅ Contact form sent to Telegram successfully for ${contactData.email}`);
    return true;

  } catch (error) {
    logError('❌ Failed to send message to Telegram:', error);
    
    // Throw error to be handled by the route handler
    throw new Error(`Telegram send failed: ${error.message}`);
  }
}

/**
 * Test Telegram connection
 * @returns {Promise<boolean>} Connection status
 */
async function testTelegramConnection() {
  try {
    const botInfo = await bot.getMe();
    logInfo(`✅ Telegram bot connected: @${botInfo.username}`);
    return true;
  } catch (error) {
    logError('❌ Telegram bot connection failed:', error);
    return false;
  }
}

module.exports = {
  sendContactToTelegram,
  testTelegramConnection,
  formatContactMessage
};
