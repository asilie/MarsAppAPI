import { getRovers, getPhotos } from "../src/routes/handlers";
import { rover } from "../src/enums/rovername";
import { camera } from "../src/enums/cameratype";

describe ('Test handlers', () => {
    it('tests /rovers endpoint', async () => {
        const roverResponse = require('./roverResponse.json');

        let res = { text: {},
            send: function(input: object) { this.text = input } 
        };

        await getRovers(res);

        // checking that response is equal to the response given by API
        expect(res.text).toMatchObject(roverResponse);
    
    }, 10000)

    it('tests /rovers/:rovername/photos/:cameratype endpoint', async () => {
        let rovername = rover.curiosity;
        let cameratype = camera.fhaz;
        let res = { text: [],
            send: function(input: []) { this.text = input } 
        };

        await getPhotos(rovername, cameratype, res);

        // expected value for hardcoded rover name and camera type
        expect(res.text).toHaveLength(2);

        // checking that array contains strings of urls
        expect(res.text).toEqual(expect.arrayContaining([expect.stringMatching(/http:\/\/mars.jpl.nasa.gov\/msl-raw-images\/proj\/msl\//)]))
    
    
    }, 10000)

    it('tests /rovers/:rovername/photos/:cameratype endpoint when parameters are wrong', async () => {
        let rovername = rover.curiosity;
        let cameratype = camera.pancam;
        let res = { text: [],
            send: function(input: []) { this.text = input } 
        };

        await getPhotos(rovername, cameratype, res);


        // checking that response is 'Rover does not have this camera type' when wrong parameters selected
        
        expect(res.text).toEqual('Rover does not have this camera type')
    
    
    }, 10000)
})