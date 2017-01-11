// I am the function passed into the web server. I take the request and response objects.
// I am shared with basic-server.js (web server)

// I get access to Node.js's 'path' module
var path = require('path');

// I get access to archive-helpers.js
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!



// I am the request handler function. I take the request and response objects.
exports.handleRequest = function (req, res) {

  // On response end, I send archive.paths.list
  res.end(archive.paths.list);
};
