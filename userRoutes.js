const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Directory to save uploaded files

router.post('/signup', upload.single('profilePic'), authController.signup);
router.post('/login', authController.login);

module.exports = router;
