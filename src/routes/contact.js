// Contact form route handler
const express = require('express');
const router = express.Router();
const { contactValidationRules, validate } = require('../middleware/validation');
const { contactRateLimiter } = require('../middleware/rateLimit');
const { sendContactToTelegram } = require('../services/telegram');
const { logInfo, logError } = require('../utils/logger');

/**
 * POST /api/contact
 * Handle contact form submissions and send to Telegram
 */
router.post(
  '/',
  contactRateLimiter,
  contactValidationRules(),
  validate,
  async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      logInfo(`Processing contact form submission from: ${email}`);

      // Send to Telegram (Phase 3 implementation)
      try {
        await sendContactToTelegram({ name, email, phone, message });
        
        logInfo(`✅ Contact form from ${email} successfully sent to Telegram`);
        
        // Success response (bilingual LV/EN)
        res.status(200).json({
          success: true,
          message: 'Ziņa veiksmīgi nosūtīta! Mēs sazināsimies ar jums drīzākajā laikā. / Message sent successfully! We will contact you soon.'
        });

      } catch (telegramError) {
        // If Telegram fails, log the error but still respond to user
        logError('Telegram send failed:', telegramError);
        
        // Return error response
        res.status(500).json({
          success: false,
          error: 'Kļūda nosūtot ziņu. Lūdzu, mēģiniet vēlreiz. / Error sending message. Please try again.',
          details: process.env.NODE_ENV === 'development' ? telegramError.message : undefined
        });
      }

    } catch (error) {
      // Catch any other unexpected errors
      logError('Unexpected error processing contact form:', error);
      
      res.status(500).json({
        success: false,
        error: 'Kļūda apstrādājot pieprasījumu. / Error processing request.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

module.exports = router;
