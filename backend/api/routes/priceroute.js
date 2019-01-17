'use strict';
module.exports = function(app) {
  var pricec = require('../controllers/pricecontroller');

  // pricec Routes
  app.route('/priceest')
    .get(pricec.estimate_price);

};
