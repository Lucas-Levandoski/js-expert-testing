const { describe, test, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');


describe('API suite test', () => {
  let app;

  before((done) => {
    app = require('./api');
    app.once('listening', done);
  })

  after((done) => app.close(done));

  describe('contact', () => {
    test('should request the return HTTP status 200', async () => {

      const result = await supertest(app).get('/contact').expect(200);

      assert.strictEqual(result.text, 'contact us page');
    })

    test('should return the HTTP status 404', async () => {
      const result = await supertest(app).get('/random stuff').expect(404);

      assert.strictEqual(result.text, 'not found');
    })
  })
})