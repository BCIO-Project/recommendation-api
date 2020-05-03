const redis = require("redis");

// Package and configuration in order to convert Redis into an Async-like library
const bluebird = require("bluebird");
bluebird.config({
	longStackTraces: true
})

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

// Redis client object
let client;

// Open connection to redis.
const openConnection = async () => {
	await new Promise((resolve, reject) => {
    	client = redis.createClient({
			db: process.env.REDIS_DB,
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
		});
		client.on("error", function (err) {
			console.error("Error " + err);
		});
		client.on("connect", async function (err) {
			resolve();
		});
	});
}

// Close connection
const closeConnection = async () => {
    await new Promise((resolve) => {
        client.quit(() => {
            resolve();
        });
    });
}

// Generate a prefix in order to manage multiple deployments in the same project in Memoerystore GCP
const getPrefix = () => {
	return (process.env.NODE_ENV !== 'pro') ? process.env.NODE_ENV + ':' : '';
}

// Get preferences of the user
const getUserPreferences = async(userId) => {
    return JSON.parse(await client.getAsync( getPrefix() + 'UserId:' + userId))
}

// Fetch Active Campaigns for a certain Page
const getActiveCampaignsByPage = async(pageId) => {
    return JSON.parse(await client.getAsync( getPrefix() + 'ActiveCampaignsByPage:' + pageId))
}

// Functions that are going to be exposed out of this file.
module.exports = {
	getUserPreferences,
	getActiveCampaignsByPage,
	openConnection
}
