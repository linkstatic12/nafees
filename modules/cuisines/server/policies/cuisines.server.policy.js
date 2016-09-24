'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Cuisines Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/cuisines',
      permissions: '*'
    }, {
      resources: '/api/cuisines/:cuisineId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/cuisines',
      permissions: ['get', 'post']
    }, {
      resources: '/api/cuisines/:cuisineId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/cuisines',
      permissions: ['get']
    }, {
      resources: '/api/cuisines/:cuisineId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Cuisines Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Cuisine is being processed and the current user created it then allow any manipulation
  if (req.cuisine && req.user && req.cuisine.user && req.cuisine.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
