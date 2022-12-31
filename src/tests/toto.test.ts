

const tearDown = async () => {
    // setup the database data for testing here
}   

describe('My test', () => {

    beforeAll( async () => {
        await tearDown()
    }); 

    afterAll( async () => {

    });


    it("Should be true", () => {
        expect(true).not.toBeNull();
    });


});
