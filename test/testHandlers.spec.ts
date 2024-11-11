const request = require("supertest");
import express from "express";
import { getRovers, getPhotos } from "../src/routes/handlers";

describe ('Test handlers', () => {
    it('tests /rovers endpoint', async () => {
        const roverResponse = require('./roverResponse.json');

        let res = { text: {},
            send: function(input: object) { this.text = input } 
        };

        await getRovers(res);

        expect(res.text).toEqual(roverResponse);
        //expect(res.text.rovers).toHaveLength(4);

        // Testing a single element in the array
        //expect(res.text.rovers).toEqual(expect.arrayContaining(
            //[expect.objectContaining({ name: expect.stringContaining('Curiosity') })]));
    })
})