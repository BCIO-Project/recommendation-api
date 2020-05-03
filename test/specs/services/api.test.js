const apiService = require('../../../services/api')

jest.mock('../../../repositories/redis');
const redisRepository = require('../../../repositories/redis');

jest.mock('../../../repositories/bigquery');
const bigqueryRepository = require('../../../repositories/bigquery');

const pageId = 2
const userId = 1;
let activeCampains, userPreferences, error;

beforeEach( () => {
  //Refresh mocks after eachd escribe
  jest.clearAllMocks();

});

describe('API Service', () => {

    describe('Fetch active campaigns', () => {
        
        beforeEach( () => {
            error = 'Error fetching active campaigns';
        });

        it('Fetch active Campaigns when exists', async (done) => {
            // MOCKS 
            activeCampains = null;

            let spyRepository = jest.spyOn(redisRepository, 'getActiveCampaignsByPage')
                            .mockImplementation( (x) => {return new Promise((resolve, reject) => {
                                resolve(activeCampains)
                            })});

            // Invocation
            const returnedValue = await apiService.getActiveCampaignsByPage(pageId);
            expect(spyRepository).toHaveBeenCalledWith(pageId);
            
            expect(returnedValue).toBe(activeCampains);

            done();

        });

        it('Repository returns an error fetching data', async (done) => {
            // MOCKS 
            activeCampains = null;

            let spyRepository = jest.spyOn(redisRepository, 'getActiveCampaignsByPage')
                            .mockImplementation( (x) => {throw(error);});   
            
            //Invocation
            let returnedValue;
            try{
                returnedValue = await apiService.getActiveCampaignsByPage(pageId);
            } catch (e){
                expect(e).toBe(error);
            }
            
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageId);
            expect(spyRepository).toThrow();
            
            expect(returnedValue).toBeUndefined();

            done();
        });

    });

    describe('Fetch user preferences', () => {
        beforeEach( () => {
            error = 'Error fetching user preferences';
        });
        it('Fetch User preferences when exists', async (done) => {
            // MOCKS 
            userPreferences = null;

            let spyRepository = jest.spyOn(redisRepository, 'getUserPreferences')
                            .mockImplementation( (x) => {return new Promise((resolve, reject) => {
                                resolve(userPreferences)
                            })});

            // Invocation
            const returnedValue = await apiService.getUserPreferences(userId);
            expect(spyRepository).toHaveBeenCalledWith(userId);
            
            expect(returnedValue).toBe(userPreferences);

            done();

        });

        it('Repository returns an error fetching data', async (done) => {
            // MOCKS 
            userPreferences = null;

            let spyRepository = jest.spyOn(redisRepository, 'getUserPreferences')
                            .mockImplementation( (x) => {throw(error);});   

            //Invocation
            let returnedValue;
            try{
                returnedValue = await apiService.getUserPreferences(userId);
            } catch (e){
                expect(e).toBe(error);
            }
            
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(userId);
            expect(spyRepository).toThrow();
            
            expect(returnedValue).toBeUndefined();

            done();
        });

    });
    describe('Create Event', () => {
        beforeEach(() => {
            error = 'Error creating event';
        });
        it('Create event', async (done) => {
            // MOCKS 
            eventID = null;
            eventData = {}

            let spyRepository = jest.spyOn(bigqueryRepository, 'saveDataToBigQuery')
                .mockImplementation((x, y) => {
                    return new Promise((resolve, reject) => {
                        resolve(userPreferences)
                    })
                });


            // Invocation
            const returnedValue = await apiService.createEvent(eventData, "events");

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(eventData, "events");
            expect(returnedValue).toBe(true);
            done();

        });

        it('Repository returns an error creating events', async (done) => {
            // MOCKS 
            userPreferences = null;
            eventData = {}
            let spyRepository = jest.spyOn(bigqueryRepository, 'saveDataToBigQuery')
                .mockImplementation((x, y) => { throw (error); });
            //Invocation
            let returnedValue;
            try {
                returnedValue = await apiService.createEvent(eventData, "events");
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(eventData, "events");
            expect(spyRepository).toThrow();
            expect(returnedValue).toBeUndefined();
            done();
        });

    });
    describe('Create Error', () => {
        beforeEach(() => {
            error = 'Error creating error';
        });
        it('Create error', async (done) => {
            // MOCKS 
            let spyRepository = jest.spyOn(bigqueryRepository, 'saveDataToBigQuery')
                .mockImplementation((x, y) => {
                    return new Promise((resolve, reject) => {
                        resolve(userPreferences)
                    })
                });
            eventID = null;
            errorData = {}
            // Invocation
            const returnedValue = await apiService.createError(errorData, "errors");
            //expects
            expect(spyRepository).toHaveBeenCalledWith(errorData, "errors");
            expect(returnedValue).toBe(true);
            done();
        });

        it('Repository returns an error creating errors', async (done) => {
            // MOCKS 
            error = 'Error logging error';
            userPreferences = null;
            errorData = {}
            let spyRepository = jest.spyOn(bigqueryRepository, 'saveDataToBigQuery')
                .mockImplementation((x, y) => { throw (error); });
            //Invocation
            let returnedValue;
            try {
                returnedValue = await apiService.createError(errorData, "errors");
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(errorData, "errors");
            expect(spyRepository).toThrow();
            expect(returnedValue).toBeUndefined();
            done();
        });

    });

});
