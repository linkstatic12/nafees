'use strict';

/**
 * Module dependencies
 */
var ordersPolicy = require('../policies/orders.server.policy'),
  orders = require('../controllers/orders.server.controller');

module.exports = function(app) {
  // Orders Routes
  app.route('/api/orders')
    .get(orders.list)
    .post(orders.create);
  app.route('/api/billing')
  .get(orders.billing);
  app.route('/api/orders/:orderId')
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);
  app.route('/api/orders/PlaceOrder').post(orders.PlaceOrder);
  app.route('/api/Detailorders/:orderId').get(orders.DetailOrders);
  app.route('/api/orders/CompleteOrder/:orderId').get(orders.CompleteOrder);
  app.route('/api/orders/DelOrder').post(orders.DelOrder);
    // Finish by binding the Order middleware
  app.param('orderId', orders.orderByID);
  };
