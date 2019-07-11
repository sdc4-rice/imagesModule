const express = require('express');
const request = require('supertest');
const app = require('../server/app');
const databaseConnection = require('../server/database');

describe('Server routes and responses', () => {
  test('Server shouldreturn a status of 200 for GET requests within range', (done) => {
    request(app)
      .get('/api/images/:id')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('Expect server responses to be of type JSON ', (done) => {
    request(app)
      .get('/api/images/:101')
      .expect('Content-Type', /json/);
    done();
  });

  test('Expect server response to include id within response body', (done) => {
    request(app)
      .get('/api/images/:101')
      .set('Accept', 'application/json')
      .then((response) => {
        assert(response.body.id, '101');
      });
    done();
  });

  test('Expect server responses to include paths within response body', (done) => {
    request(app)
      .get('/api/images/:101')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(Array.isArray(response.body.path)).toBe(true);
      });
    done();
  });

  test('Expect server responses to include paths within response body that are not empty', (done) => {
    request(app)
      .get('/api/images/:101')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.body.path.length).toBeGreaterThanOrEqual(3);
        expect(response.body.path.length).toBeLessThanOrEqual(5);
      });
    done();
  });
});
