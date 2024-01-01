const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), excelController.uploadExcel);
router.get('/getDetails',excelController.getDetails)

module.exports = router;
