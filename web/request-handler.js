var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
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
      fs.readFile(archive.paths.archivedSites + '/' + req.url, function(err, data) {
        if (err) {
          console.log(err);
          // loading page
        }
        res.writeHead(200, httpHelp.headers);
        res.end(data.toString());
      });
    }
  }

  // post method
  if (req.method === 'POST') {
    // if client submits a site that isn't already in archives/sites.txt
    archive.isUrlInList(req.url, function(err, exists) {
      console.log('url is ', req.url);
      console.log('in isUrlInList check');
      if (!err) {
        console.log('no error in isUrlInList');
        if (!exists) {
          console.log('url is not in archives/sites.txt');
          archive.addUrlToList(req.url, function(err) {
            console.log('in addUrlToList');
            if (err) {
              console.log('error in addUrlToList');
            }
          });
        } else {
          console.log('url is in archives/sites.txt');
          archive.isUrlArchived(url, function(err, exists) {
            console.log('in isUrlArchived');
            if (!err) {
              console.log('no error in isUrlArchived');
              res.writeHead(302, httpHelp.headers);
              fs.readFile(archive.paths.archivedSites + '/' + url, 'utf8', function(err, data) {
                if (err) {
                  console.log(err);
                } else {
                  res.end(data.toString());
                }
              });
            } else {
              console.log('error in isUrlArchived');
              fs.readFile(archive.paths.siteAssets + '/loading.html', function(err, data) {
                if (err) {
                  console.log(err);
                }
                res.end(data.toString());
              });
            }
          });
        }
      } else {
        console.log('error in isUrlInList');
      }
    });
  }

};