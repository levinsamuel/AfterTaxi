var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

var routes = require('./api/routes/priceroute');
routes(app);

app.listen(port);

console.log('server started on port ', port)
