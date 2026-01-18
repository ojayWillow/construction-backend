// Validation middleware for contact form
const { body, validationResult } = require('express-validator');

// Validation rules for contact form
const contactValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty().withMessage('Vārds ir obligāts / Name is required')
      .isLength({ min: 2 }).withMessage('Vārdam jābūt vismaz 2 rakstzīmēm / Name must be at least 2 characters')
      .isLength({ max: 100 }).withMessage('Vārds ir pārāk garš / Name is too long')
      .matches(/^[a-zA-ZāčēģīķļņšūžĀČĒĢĪĶĻŅŠŪŽ\s-]+$/).withMessage('Vārds drīkst saturēt tikai burtus / Name can only contain letters'),
    
    body('email')
      .trim()
      .notEmpty().withMessage('E-pasts ir obligāts / Email is required')
      .isEmail().withMessage('Nederīga e-pasta adrese / Invalid email address')
      .normalizeEmail()
      .isLength({ max: 255 }).withMessage('E-pasts ir pārāk garš / Email is too long'),
    
    body('phone')
      .trim()
      .notEmpty().withMessage('Telefons ir obligāts / Phone is required')
      .matches(/^[+]?[0-9\s()-]{8,20}$/).withMessage('Nederīgs telefona numurs / Invalid phone number'),
    
    body('message')
      .trim()
      .notEmpty().withMessage('Ziņa ir obligāta / Message is required')
      .isLength({ min: 10 }).withMessage('Ziņai jābūt vismaz 10 rakstzīmēm / Message must be at least 10 characters')
      .isLength({ max: 2000 }).withMessage('Ziņa ir pārāk gara (maks. 2000 rakstzīmes) / Message is too long (max 2000 characters)')
  ];
};

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

module.exports = {
  contactValidationRules,
  validate
};
