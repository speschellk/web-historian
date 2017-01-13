var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};


// HELPER METHODS

// reads URLs in archives/sites.txt
exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, urls) {
    if (!err) {
      urls = urls.toString().split('\n');
      return cb(err, urls);
    } else {
      console.log('error');
    }
  });
};

// checks archives/sites.txt for presence of particular URL
exports.isUrlInList = function(url, cb) {
  this.readListOfUrls(function(err, urls) {
    if (!err) {
      for (var i = 0; i < urls.length; i++) {
        if (urls[i] === url) {
          return cb(err, true);
        }
      }
    }
    return cb(err, false);
  });
};

// if url is not in archives/sites.txt, adds it
exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url + '\n', function(error) {
    if (!error) {
      return cb();
    } else {
      console.log('error');
    }
  });
};

// checks archives/sites for presence of site file
exports.isUrlArchived = function(url, cb) {
  fs.stat(exports.paths.archivedSites + '/' + url, function(err, stats) {
    if (!err) {
      exists = true;
    } else {
      exists = false;
      err = null;
    }
    return cb(err, exists);
  });
};

// retrieves (from the internet) the index.html of the requested URL
exports.downloadUrls = function() {

};
