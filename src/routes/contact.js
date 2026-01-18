// Contact form route handler
const express = require('express');
const router = express.Router();
const { contactValidationRules, validate } = require('../middleware/validation');
const { contactRateLimiter } = require('../middleware/rateLimit');

/**
 * POST /api/contact
 * Handle contact form submissions
 */
router.post(
  '/',
  contactRateLimiter,
  contactValidationRules(),
  validate,
  async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      // TODO: Integrate with Telegram service (Phase 3)
      console.log('Contact form submission received:');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Message:', message);

      // Simulate processing
      // In Phase 3, we'll send this to Telegram
      
      // Success response
      res.status(200).json({
        success: true,
        message: 'Ziņa veiksmīgi nosūtīta! Mēs sazināsimies ar jums drīzākajā laikā. / Message sent successfully! We will contact you soon.'
      });

    } catch (error) {
      console.error('Error processing contact form:', error);
      
      res.status(500).json({
        success: false,
        error: 'Kļūda nosūtot ziņu. Lūdzu, mēģiniet vēlreiz. / Error sending message. Please try again.'
      });
    }
  }
);

module.exports = router;
