// Imports the Google Cloud client library

if (process.env.NODE_ENV !== "test"){
    var { BigQuery } = require('@google-cloud/bigquery');
    var bigqueryClient = new BigQuery();
}

const insertData =  (data, dataset, tableId) => {
    try {
        let table = bigqueryClient.dataset(dataset).table(tableId)
        let result = table.insert(data);
        return result;
    } catch (e) {
        console.error(JSON.stringify(e));
        throw (e);
    }
}

const saveDataToBigQuery = (data, table) => {
    let dataset;
    const myDateTime = new Date();
    var timestamp = Date.now().toString();
    const eventID = BigQuery.datetime({
        year: myDateTime.getFullYear(),
        month: myDateTime.getMonth() + 1,
        day: myDateTime.getUTCDate(),
        hours: myDateTime.getHours(),
        minutes: myDateTime.getMinutes(),
        seconds: myDateTime.getSeconds()
    });
    let insertObj = {
        messageId: timestamp,
        campaignId: data.campaignId,
        userId: data.userId,
        domain: data.domain,
        ip: data.ip,
        createdAt: eventID
    }
    if(table === 'events'){
        dataset = "bcio_event_data";
        insertObj.eventType = data.eventType;
        insertObj.offerId = data.offerId;
        insertObj.impressionUUId = data.impressionUUId;
    } else if (table === 'errors'){
        dataset = "bcio_error_data";
        insertObj.errorType = data.errorType;
        insertObj.description = data.description;

    }else {
        throw new Error("table not found");
    }
    try {
        insertData(insertObj, dataset, table);
        return
    } catch (error) {
        throw (error);
    }
};

module.exports = {
    saveDataToBigQuery
}