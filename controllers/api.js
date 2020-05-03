// Imports required for this controller
const { validationResult } = require('express-validator');
const getCacheHeaders = require('../utils/cache').getCacheHeaders

// Service responsible of managing cache info
const apiService = require('../services/api');


/**
* getActiveCampaignsByPage: It returns the campaigns that are active given a Page ID.
* Information will be fetched from the Redis Cache
* @param {*} req 
* @param {*} res 
* @param {*} next 
*/
const getActiveCampaignsByPage = async (req, res, next) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    try {
        const campaigns = await apiService.getActiveCampaignsByPage(req.params.pageId);
        res.set(getCacheHeaders())
        return res.json(campaigns)
    }catch(e){
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

/**
* getUserPreferences: It returns the information about the offers we should show to him. 
* This information will be fetched from the Redis Cache.
* @param {*} req 
* @param {*} res 
* @param {*} next 
*/
const getUserPreferences = async (req, res, next) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    try {
        const preferences = await apiService.getUserPreferences(req.params.uuid);
        res.set(getCacheHeaders())
        return res.json(preferences)
    }catch(e){
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

/**
* createEvent: It create a new event.
* Information will be sended to pub/sub
* @param {*} req 
* @param {*} res 
* @param {*} next 
*/
const createEvent = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    try {
        let event={
            eventType: req.body.eventType,
            campaignId: req.body.campaignId,
            userId: req.body.userId,		
            offerId: req.body.offerId,	
            impressionUUId	: req.body.impressionUUId,
            domain: req.headers["x-forwarded-for"] || req.connection.remoteAddress,	
            ip: req.ip,
            createdAt: new Date()	
        };
        await apiService.createEvent(event);
        return res.json({"result": "ok"})
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}
const createError = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        let error = {
            errorType: req.body.errorType,
            campaignId: req.body.campaignId,
            userId: req.body.userId,
            description: req.body.description,
            domain: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
            ip: req.ip,
        };
        await apiService.createError(error);
        return res.json({ "result": "ok" })
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}
// Functions that are going to be exposed out of this file.
module.exports = {
    getActiveCampaignsByPage,
    getUserPreferences,
    createEvent,
    createError
}