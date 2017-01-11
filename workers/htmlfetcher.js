// WORKER SERVER
// I read archives/sites.txt for URLs that are added
// I consult the internet to retrieve the index.html for those URLs
// I add the index.html files to archives/sites/ (WEB SERVER picks up from there)

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('./archive-helpers');
// archive.readListOfUrls
// archive.isUrlInList
// archive.addUrlToList
// archive.isUrlArchived
// archive.downloadUrls
