const express = require('express');
const router = express.Router();
const nodemailer = require('../controllers/mail-controller');
router.post('/mail' , nodemailer.sendMail)
module.exports = router;