const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api')
const validators = require('../validators/api')

router.get('/campaign/active/:pageId', validators.getActiveCampaignsByPage(), apiController.getActiveCampaignsByPage);
router.get('/user/:uuid', validators.getUserPreferences(), apiController.getUserPreferences);
router.post('/event', validators.createEvent(), apiController.createEvent);
router.post('/error', validators.createError(), apiController.createError);


module.exports = router;
