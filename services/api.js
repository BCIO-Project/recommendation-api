const redisRepository = require('../repositories/redis')
const bigquery = require('../repositories/bigquery')

const getActiveCampaignsByPage = async (pageId) => {
	try{
		const campaigns = await redisRepository.getActiveCampaignsByPage(pageId);
		return campaigns;
	}catch(e){
		console.error(e);
		throw('Error fetching active campaigns');
	}
}
const getUserPreferences = async (userId) => {
	try{
        const userPreferences = await redisRepository.getUserPreferences(userId);
		return userPreferences;
	}catch(e){
		console.error(e);
		throw('Error fetching user preferences');
	}
}

const createEvent = (eventInfo) => {
    try {
        bigquery.saveDataToBigQuery(eventInfo, "events");
        return true
    } catch (e) {
        console.error(e);
        throw ('Error creating event');
    }
}

const createError = (errorInfo) => {
    try {
        console.error(`ERROR-WIDGET:${JSON.stringify(errorInfo)}`)
        bigquery.saveDataToBigQuery(errorInfo,"errors");
        return true
    } catch (e) {
        console.error(e);
        throw ('Error logging error');
    }
}

module.exports = {
	getActiveCampaignsByPage,
    getUserPreferences,
    createEvent,
    createError
}