/* eslint-disable no-undef */
import req from 'supertest';
import app from '../src/index.js';

describe('test our endpoints with HTTP-requests', () => {
  let token = '';

  it('should return an access token', async (done) => {
    const res = await req(app)
      .post('/auth/login')
      .send({
        username: 'thatnicolas',
        password: 'ilovecats123',
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    // eslint-disable-next-line prefer-destructuring
    token = res.body.token;

    done();
  });

  it('should return a list of songs', async (done) => {
    const res = await req(app)
      .get('/songs/')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('songs');

    done();
  });
});
