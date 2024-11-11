import request from 'supertest';
import express from 'express';
import router from '../src/routes/main';

const app = express();
app.use('/', router);

describe('Test routes', ()=> {
    it('tests /rovers route', async ()=> {
        const res = await request(app).get('/rovers').then((res) => {

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        }
    );
    }, 10000);

    it('tests /rovers/:rovername/photos/:cameratype route', async ()=> {
        const res = await request(app).get('/rovers/curiosity/photos/fhaz').then((res) => {

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        }
    );
    }, 10000);
    
})