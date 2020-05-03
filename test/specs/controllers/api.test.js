const apiController = require('../../../controllers/api')

jest.mock('../../../services/api');
const apiService = require('../../../services/api');

jest.mock('express-validator');
const validator = require('express-validator');


let campaigns = [];
let userPreferences = [];

let req = next = errors = next = {}

beforeEach( () => {
    res = {
        json: jest.fn((x) => {return res}),
        status: jest.fn((x) => {return res;}),
        set: jest.fn((x) => {return res;})
    }
    req = {
        params: {},
        body: {}
    }
    next = {}    
    
    errors = {
        isEmpty: jest.fn()
    }

    //Refresh mocks after eachd escribe
    jest.clearAllMocks();

});

describe('API Controller', () => {

    beforeEach( () => {
        errors = {
            array: jest.fn( (x) => {}),
            isEmpty: jest.fn( (x) => {return true})
        }
        req.params.pageId = 2;
    });


    describe('Fetch active campaigns', () => {

        it('Fetch active Campaigns when exists', async (done) => {


            //Mocks
            let spyService = jest.spyOn(apiService, 'getActiveCampaignsByPage')
                            .mockImplementation((x) => {return campaigns;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await apiController.getActiveCampaignsByPage(req,res,next);   
    
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.pageId);
            expect(res.json).toHaveBeenCalledWith(campaigns);
            done();
    
        })

    })

    describe('Manage errors when asking for active campaigns', () => {

        const errorCode = 422;
        const errorName = [{}];

        beforeEach( () => {

            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorName;});
            errors.isEmpty = jest.fn( (x) => {return false})

        });

        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(apiService, 'getActiveCampaignsByPage')
                            .mockImplementation(() => {return campaigns;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});

            //Invocation
            await apiController.getActiveCampaignsByPage(req,res,next);   

            //Expects

            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);

            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();

            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorName);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })

        it('Service throw an error', async (done) => {

            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})

            //Spies
            let spyService = jest.spyOn(apiService, 'getActiveCampaignsByPage')
                            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
            //Invocation
            await apiController.getActiveCampaignsByPage(req,res,next);   
    
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalledWith(req.params.pageId);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        })
    })

    describe('Fetch User preferences', () => {

        it('Fetch preferences for a known user', async (done) => {

            //Mocks
            let spyService = jest.spyOn(apiService, 'getUserPreferences')
                            .mockImplementation((x) => {return userPreferences;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await apiController.getUserPreferences(req,res,next);   
    
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.uuid);
            expect(res.json).toHaveBeenCalledWith(userPreferences);
            done();
        })
    })

    describe('Manage errors when asking for user preferences', () => {

        const errorCode = 422;
        const errorName = [{}];

        beforeEach( () => {

            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorName;});
            errors.isEmpty = jest.fn( (x) => {return false})

        });

        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(apiService, 'getUserPreferences')
                            .mockImplementation(() => {return userPreferences;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});

            //Invocation
            await apiController.getUserPreferences(req,res,next);   

            //Expects

            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);

            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();

            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorName);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })

        it('Service throw an error', async (done) => {

            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})

            //Spies
            let spyService = jest.spyOn(apiService, 'getUserPreferences')
                            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await apiController.getUserPreferences(req,res,next);   
    
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalledWith(req.params.uuid);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        })
    })


    describe('Send new event', () => {

        it('Send new event with the worng information', async (done) => {

            errors = {
                array: jest.fn((x) => []),
                isEmpty: jest.fn((x) => { return false })
            }
            //Mocks
            let spyService = jest.spyOn(apiService, 'createEvent')
                .mockImplementation((x) => { return {"result": "ok"}; });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await apiController.createEvent(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })

        it('Send new event with the coorect information', async (done) => {

            
            errors = {
                array: jest.fn((x) => []),
                isEmpty: jest.fn((x) => { return true })
            }
            req.body = {
                "eventType": "click",
                "campaignId": 1001,
                "offerId": "3",
                "userId": "safsdafasd-asdfasdfad-adfsasdfasd-asdfadfa",
                "impressionUUId": "sadfasdfsas-asdfadfsasdf-asdfasdfasd-asdfsafdasdfas"
            }
            req.headers = {}
            req.connection = {}
            
            //Mocks
            let spyService = jest.spyOn(apiService, 'createEvent')
                .mockImplementation((x) => { return { "result": "ok" }; });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await apiController.createEvent(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            done();
        })

    })

    describe('Manage errors when creating an event', () => {

        const errorCode = 422;
        const errorName = [{}];

        beforeEach(() => {

            //Override errors behaviour
            errors.array = jest.fn((x) => { return errorName; });
            errors.isEmpty = jest.fn((x) => { return false })

        });

        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(apiService, 'createEvent')
                .mockImplementation(() => { return userPreferences; });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await apiController.createEvent(req, res, next);

            //Expects

            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);

            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();

            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorName);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })

        it('Service throw an error', async (done) => {

            // Mocks
            errors.isEmpty = jest.fn((x) => { return true })
            req.body = {
                "eventType": "click",
                "campaignId": 1001,
                "offerId": "3",
                "userId": "safsdafasd-asdfasdfad-adfsasdfasd-asdfadfa",
                "impressionUUId": "sadfasdfsas-asdfadfsasdf-asdfasdfasd-asdfsafdasdfas"
            }
            req.headers = {}
            req.connection = {}

            //Spies
            let spyService = jest.spyOn(apiService, 'createEvent')
                .mockImplementation(() => { throw ('error') });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await apiController.createEvent(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        })
    })

    describe('Send new error', () => {
        it('Send new error with the worng information', async (done) => {
            errors = {
                array: jest.fn((x) => []),
                isEmpty: jest.fn((x) => { return false })
            }

            //Mocks
            let spyService = jest.spyOn(apiService, 'createError')
                .mockImplementation((x) => { return { "result": "ok" }; });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await apiController.createError(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })

        it('Send new error with the coorect information', async (done) => {
            errors = {
                array: jest.fn((x) => []),
                isEmpty: jest.fn((x) => { return true })
            }
            req.body = {
                "errorType": "NOT_FOUND",
                "campaignId": 1001,
                "offerId": 3,
                "userId": "safsdafasd-asdfasdfad-adfsasdfasd-asdfadfa",
                "pageId": 33,
                "description": "Default offer url not found"
            }
            req.headers = {}
            req.connection = {}

            //Mocks
            let spyService = jest.spyOn(apiService, 'createError')
                .mockImplementation((x) => { return { "result": "ok" }; });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await apiController.createError(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            done();
        })
    })

    describe('Manage errors when creating error', () => {
        const errorCode = 422;
        const errorName = [{}];
        beforeEach(() => {
            //Override errors behaviour
            errors.array = jest.fn((x) => { return errorName; });
            errors.isEmpty = jest.fn((x) => { return false })
        });
        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(apiService, 'createError')
                .mockImplementation(() => { return userPreferences; });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await apiController.createError(req, res, next);

            //Expects

            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);

            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();

            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorName);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })

        it('Service throw an error', async (done) => {
            // Mocks
            errors.isEmpty = jest.fn((x) => { return true })
            req.body = {
                "errorType": "NOT_FOUND",
                "campaignId": 1001,
                "offerId": 3,
                "userId": "safsdafasd-asdfasdfad-adfsasdfasd-asdfadfa",
                "pageId": 33,
                "description": "Default offer url not found"
            }
            req.headers = {}
            req.connection = {}

            //Spies
            let spyService = jest.spyOn(apiService, 'createError')
                .mockImplementation(() => { throw ('error') });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await apiController.createError(req, res, next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        })
    })
})