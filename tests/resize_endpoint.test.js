/**
 * @jest-environment node
 */

const request = require('supertest');
const app = require('../app');
const fs = require('fs');
GOOGLE_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png';


describe('Testing resize endpoint', () => {
  const responseSample = fs.
      readFileSync('tests/data/resize/response_sample.png');

  test('Testing with image url', async () => {
    const response = await request(app)
        .post('/api/resize')
        .query({'width': 300})
        .set('Content-Type', 'text/plain')
        .send(GOOGLE_LOGO_URL);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(responseSample);
  });

  test('Testing with image file', async () => {
    const response = await request(app)
        .post('/api/resize')
        .query({'width': 300})
        .set('Content-Type', 'image/png')
        .send(fs
            .readFileSync('tests/data/resize/request_sample.png'));
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(responseSample)
    ;
  });

  test('Testing failure with invalid data', async () => {
    const response = await request(app)
        .post('/api/resize')
        .set('Content-Type', 'text/plain')
        .send('Just some invalid data');
    expect(response.statusCode).toBe(422);
    ;
  });

  test('Testing failure with invalid url', async () => {
    const response = await request(app)
        .post('/api/resize')
        .set('Content-Type', 'text/plain')
        .send('http://google.com/blablabla');
    expect(response.statusCode).toBe(422);
    ;
  });

  test('Testing failure with invalid image file', async () => {
    const response = await request(app)
        .post('/api/resize')
        .query({'width': 300})
        .set('Content-Type', 'image/png')
        .send(fs
            .readFileSync('tests/data/resize/invalid_file.png'));
    expect(response.statusCode).toBe(422);
    ;
  });
});

