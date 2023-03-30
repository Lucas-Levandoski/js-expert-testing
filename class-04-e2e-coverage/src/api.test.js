const { describe, test, after } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

const { app } = require('./api');

describe('API suite test', () => {
  describe('contact', () => {
    test('should request the return HTTP status 200', async () => {

      const result = await supertest(app).get('/contact').expect(200);

      assert.strictEqual(result.text, 'contact us page');
    })
  })
})