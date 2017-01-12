// I am the function passed into the web server. I take the request and response objects.

// Node's path module
var path = require('path');
// Node's fs module
var fs = require('fs');

// archive-helpers
var archive = require('../helpers/archive-helpers');
// archive.readListOfUrls
// archive.isUrlInList
// archive.addUrlToList
// archive.isUrlArchived
// archive.downloadUrls

// http-helpers
var httpHelp = require('./http-helpers');
// worker server
var worker = require('../workers/htmlfetcher');


exports.handleRequest = function (req, res) {
  // web server receives a req from the client. this req is a GET request for a webpage

  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
        // console.log('data are ', data.toString());
        if (err) {
          console.log(err);
        }
        res.writeHead(200, httpHelp.headers);
        res.end(data.toString());
      });

    // ****check that all legit paths are let through**** //
    } else if (req.url[0] === '/' && !req.url.includes('.com')) {
      console.log(req.url);
      res.writeHead(404, httpHelp.headers);
      res.end();

    } else {
      //check the archive
      // if it's there, serve it up
      // if it's not, send back the loading page
      fs.readFile(archive.paths.archivedSites + '/' + req.url, function(err, data) {
        if (err) {
          console.log(err);
        }
        res.writeHead(200, httpHelp.headers);
        res.end(data.toString());
      });
    }
  }

  // finish post method
  if (req.method === 'POST') {
    // if client submits a site that isn't already in archives/sites.txt
    if (!archive.isUrlInList) {
      // write it into archives/sites.txt (without replacing the entire file?)
      fs.write();
    }
    console.log('in the POST method');
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