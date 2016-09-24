'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cuisine = mongoose.model('Cuisine'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, cuisine;

/**
 * Cuisine routes tests
 */
describe('Cuisine CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Cuisine
    user.save(function () {
      cuisine = {
        name: 'Cuisine name'
      };

      done();
    });
  });

  it('should be able to save a Cuisine if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cuisine
        agent.post('/api/cuisines')
          .send(cuisine)
          .expect(200)
          .end(function (cuisineSaveErr, cuisineSaveRes) {
            // Handle Cuisine save error
            if (cuisineSaveErr) {
              return done(cuisineSaveErr);
            }

            // Get a list of Cuisines
            agent.get('/api/cuisines')
              .end(function (cuisinesGetErr, cuisinesGetRes) {
                // Handle Cuisine save error
                if (cuisinesGetErr) {
                  return done(cuisinesGetErr);
                }

                // Get Cuisines list
                var cuisines = cuisinesGetRes.body;

                // Set assertions
                (cuisines[0].user._id).should.equal(userId);
                (cuisines[0].name).should.match('Cuisine name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Cuisine if not logged in', function (done) {
    agent.post('/api/cuisines')
      .send(cuisine)
      .expect(403)
      .end(function (cuisineSaveErr, cuisineSaveRes) {
        // Call the assertion callback
        done(cuisineSaveErr);
      });
  });

  it('should not be able to save an Cuisine if no name is provided', function (done) {
    // Invalidate name field
    cuisine.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cuisine
        agent.post('/api/cuisines')
          .send(cuisine)
          .expect(400)
          .end(function (cuisineSaveErr, cuisineSaveRes) {
            // Set message assertion
            (cuisineSaveRes.body.message).should.match('Please fill Cuisine name');

            // Handle Cuisine save error
            done(cuisineSaveErr);
          });
      });
  });

  it('should be able to update an Cuisine if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cuisine
        agent.post('/api/cuisines')
          .send(cuisine)
          .expect(200)
          .end(function (cuisineSaveErr, cuisineSaveRes) {
            // Handle Cuisine save error
            if (cuisineSaveErr) {
              return done(cuisineSaveErr);
            }

            // Update Cuisine name
            cuisine.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Cuisine
            agent.put('/api/cuisines/' + cuisineSaveRes.body._id)
              .send(cuisine)
              .expect(200)
              .end(function (cuisineUpdateErr, cuisineUpdateRes) {
                // Handle Cuisine update error
                if (cuisineUpdateErr) {
                  return done(cuisineUpdateErr);
                }

                // Set assertions
                (cuisineUpdateRes.body._id).should.equal(cuisineSaveRes.body._id);
                (cuisineUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Cuisines if not signed in', function (done) {
    // Create new Cuisine model instance
    var cuisineObj = new Cuisine(cuisine);

    // Save the cuisine
    cuisineObj.save(function () {
      // Request Cuisines
      request(app).get('/api/cuisines')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Cuisine if not signed in', function (done) {
    // Create new Cuisine model instance
    var cuisineObj = new Cuisine(cuisine);

    // Save the Cuisine
    cuisineObj.save(function () {
      request(app).get('/api/cuisines/' + cuisineObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', cuisine.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Cuisine with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/cuisines/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Cuisine is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Cuisine which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Cuisine
    request(app).get('/api/cuisines/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Cuisine with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Cuisine if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cuisine
        agent.post('/api/cuisines')
          .send(cuisine)
          .expect(200)
          .end(function (cuisineSaveErr, cuisineSaveRes) {
            // Handle Cuisine save error
            if (cuisineSaveErr) {
              return done(cuisineSaveErr);
            }

            // Delete an existing Cuisine
            agent.delete('/api/cuisines/' + cuisineSaveRes.body._id)
              .send(cuisine)
              .expect(200)
              .end(function (cuisineDeleteErr, cuisineDeleteRes) {
                // Handle cuisine error error
                if (cuisineDeleteErr) {
                  return done(cuisineDeleteErr);
                }

                // Set assertions
                (cuisineDeleteRes.body._id).should.equal(cuisineSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Cuisine if not signed in', function (done) {
    // Set Cuisine user
    cuisine.user = user;

    // Create new Cuisine model instance
    var cuisineObj = new Cuisine(cuisine);

    // Save the Cuisine
    cuisineObj.save(function () {
      // Try deleting Cuisine
      request(app).delete('/api/cuisines/' + cuisineObj._id)
        .expect(403)
        .end(function (cuisineDeleteErr, cuisineDeleteRes) {
          // Set message assertion
          (cuisineDeleteRes.body.message).should.match('User is not authorized');

          // Handle Cuisine error error
          done(cuisineDeleteErr);
        });

    });
  });

  it('should be able to get a single Cuisine that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Cuisine
          agent.post('/api/cuisines')
            .send(cuisine)
            .expect(200)
            .end(function (cuisineSaveErr, cuisineSaveRes) {
              // Handle Cuisine save error
              if (cuisineSaveErr) {
                return done(cuisineSaveErr);
              }

              // Set assertions on new Cuisine
              (cuisineSaveRes.body.name).should.equal(cuisine.name);
              should.exist(cuisineSaveRes.body.user);
              should.equal(cuisineSaveRes.body.user._id, orphanId);

              // force the Cuisine to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Cuisine
                    agent.get('/api/cuisines/' + cuisineSaveRes.body._id)
                      .expect(200)
                      .end(function (cuisineInfoErr, cuisineInfoRes) {
                        // Handle Cuisine error
                        if (cuisineInfoErr) {
                          return done(cuisineInfoErr);
                        }

                        // Set assertions
                        (cuisineInfoRes.body._id).should.equal(cuisineSaveRes.body._id);
                        (cuisineInfoRes.body.name).should.equal(cuisine.name);
                        should.equal(cuisineInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Cuisine.remove().exec(done);
    });
  });
});
