const { param, body } = require('express-validator')

//TODO: Check here if page exists
const getActiveCampaignsByPage = () => {
    return [ 
        param('pageId').trim()
        .exists().withMessage('Field Page ID is missing')
        .isInt({gt: 0, allow_leading_zeroes: false}).withMessage('Wrong value type. It must be an integer greater than 0'),
    ]
}

const getUserPreferences = () => {
  return [ 
      param('userId').trim()
      .exists().withMessage('Field User ID type missing')
      //.isUUID(4).withMessage('Wrong format')
  ]
}

const createEvent = () => {
    return [
        body('eventType')
            .matches('^(click|impression)$').withMessage('eventType type not found')
            .exists().withMessage('eventType type missing'),
        body('campaignId')
            .exists().withMessage('campaignId is missing').bail()
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage('Wrong value type. It must be an integer greater than 0'),
        body('offerId')
            .exists().withMessage('offerId is missing').bail()
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage('Wrong value type. It must be an integer greater than 0'),
        body('impressionUUId')
            .exists().withMessage('impressionUUId is missing'),
        body('userId')
            .exists().withMessage('userId is missing')
    ]
}

const createError = () => {
    return [
        body('errorType')
            .exists().withMessage('errorType type missing'),
        body('campaignId')
            .optional()
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage('Wrong value type. It must be an integer greater than 0'),
        body('offerId')
            .optional()
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage('Wrong value type. It must be an integer greater than 0'),
        body('pageId')
            .optional()
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage('Wrong value type. It must be an integer greater than 0'),
    ]
}
        

module.exports = {
    getActiveCampaignsByPage,
    getUserPreferences,
    createEvent,
    createError
}