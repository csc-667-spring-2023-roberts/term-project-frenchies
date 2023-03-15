import request from 'supertest';

import app from '../../app';

describe('App', () => {
  it('should return 200 OK status for the home page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return 200 OK status for the about page', async () => {
    const response = await request(app).get('/about');
    expect(response.status).toBe(200);
  });
});
