var fs = require('fs');

module.exports = function(customOptions) {
  var defaultOptions = {
    base: "src/twig/templates",
    indexDest: "static-html/"
  }

  var options = customOptions ? Object.assign(defaultOptions, customOptions) : defaultOptions;
  var sitemap = [];

  fs.readdir(options.base, function(err, items) {
    var filteredItems = items.filter(function(item) {
      return !item.includes("_");
    });

    filteredItems.forEach(function(item) {
      item = item.replace(".twig", ".html");

      sitemap.push(item);
    });
  });
}