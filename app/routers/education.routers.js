const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');


router.post('/', educationController.createKeyStage);


router.get('/', educationController.getKeyStages);


router.get('/:name/years', educationController.getYearsByKeyStage);

//router.get('/:name/years/:year/subjects', educationController.getSubjectsByKeyStageAndYear);

module.exports = router;
