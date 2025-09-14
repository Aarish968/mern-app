const request = require('supertest');
const app = require('../src/app');

describe('Health Check', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Server is running');
    expect(response.body.timestamp).toBeDefined();
  });
});
