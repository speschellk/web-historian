// ARCHIVE HELPER METHODS
var fs = require('fs');
// Node.js's path module
var path = require('path');
// access to underscore library (for initialize function)
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

// PATHS - an object that contains references to the siteAssets, archivedSites, and list pathnames

// siteAssets: file directory path + /web/public  --> like /foo/bar/baz/asdf/web/public
// archivedSites: file directory path + /archives/sites  --> like /foo/bar/baz/asdf/archives/sites
// list: file directory path + /archives/sites.txt --> like /foo/bar/baz/asdf/archives/sites.txt
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


// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// ** WORKER SERVER NEEDS ACCESS TO ALL OF THESE FUNCTIONS ** //

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

// checks paths.list value for presence of particular URL
// returns a boolean indicating whether the URL is in this list of archived sites
exports.isUrlInList = function(url, cb) {
  this.readListOfUrls(function(err, urls) {
    if (!err) {
      for (var i = 0; i < urls.length; i++) {
        if (urls[i] === url) {
          exists = true;
          return cb(err, exists);
        }
      }
    }
    exists = false;
    return cb(err, exists);
  });
};

// if !isUrlInList, writes URL to list
exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url + '\n', function(error) {
    if (!error) {
      return cb();
    } else {
      console.log('error');
    }
  });
};

// checks paths.archivedSites for presence of URL
// returns a cb indicating whether or not the URL is in archived sites
exports.isUrlArchived = function(url, cb) {
  // console.log('url is ', url);

  fs.stat(exports.paths.archivedSites + '/' + url, 'utf8', function(err, stats) {
    // console.log('full path is ', exports.paths.archivedSites + '/' + url);
    // console.log('in write file');
    
    if (!err) {
      // console.log('in error - file exists');

      //stats
      exists = true;
      return cb(err, exists);
    } else {
      // console.log('in else - file does not exist');
      exists = false;
      return cb(err, exists);
    }
  });
};

// retrieves (from the internet) the index.html of the requested URL
exports.downloadUrls = function() {
};
