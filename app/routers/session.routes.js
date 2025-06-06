const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessions.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage : storage});

router.post('/create', sessionController.upload, sessionController.createSession);

router.get('/', sessionController.getSessions);

router.get('/files', sessionController.getFilesBySessionFields);

router.delete('/delete', sessionController.deleteSession);
module.exports = router;