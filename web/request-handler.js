// I am the function passed into the web server. I take the request and response objects.
// I am shared with basic-server.js (web server)

// access to Node's path module
var path = require('path');

// access to archive-helpers
var archive = require('../helpers/archive-helpers');
// archive.readListOfUrls
// archive.isUrlInList
// archive.addUrlToList
// archive.isUrlArchived
// archive.downloadUrls

// access to http-helpers
var httpHelp = require('./http-helpers');

// access to worker server
var worker = require('../workers/htmlfetcher');

// access to Node's fs methods
var fs = require('fs');


// I am the request handler function. I take the request and response objects.
exports.handleRequest = function (req, res) {
  // web server receives a req from the client. this req is a GET request for a webpage

  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(archive.paths.siteAssets + '/index.html', function(err, contents) {
      // console.log('contents are ', contents.toString());
      if (err) {
        console.log(err);
      }
      res.writeHead(200, httpHelp.headers);
      res.end(contents.toString());
    });
  }

    // // add requested URL to sites.txt if it isn't already there
    // if (!archive.isUrlInList(req.url)) {}

    // // check if the corresponding index.html is already in archives/sites
    // if (!archive.isUrlArchived(req.url)) {
    //   // return loading.html
    // }
    // // return index.html archive

    // If users submit a page you already have, you should auto-redirect 
    // them to either your archived version of that page, or to loading.html 
    // if the page has not yet been loaded
  // res.writeHead(statusCode, headers);

  // res.end(JSON.stringify(statusCode, '/Users/student/Desktop/hrsf53-web-historian/web/public/index.html'), done);
  // res.end(statusCode, archive.paths.list, done);
};