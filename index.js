var fs = require('fs');

module.exports = function(customOptions) {
  var defaultOptions = {
    name: 'Project X',
    base: 'src/twig/templates',
    dest: 'static-html'
  }

  var options = customOptions ? Object.assign(defaultOptions, customOptions) : defaultOptions;
  var sitemap = [];
  var linksHTML = '';
  var resultsHTML = '';

  fs.readdir(options.base, function(err, items) {
    var filteredItems = items.filter(function(item) {
      return !item.includes('_');
    });

    filteredItems.forEach(function(item) {
      item = item.replace('.twig', '.html');

      linksHTML += 
        `<li class="sitemap_item">
          <a class="sitemap_link" href="${ item }">${ item.replace(/-/g, ' ').replace('.html', '') }</a>
        </li>`;

      sitemap.push(item);
    });

    resultsHTML = 
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
          <title>${ options.name } | Sitemap</title>
          <style>
            html {
              height: 100%;
      
              font-family: "Neue Haas Grotesk Text Std", Helvetica, Arial, sans-serif;
              overflow-y: scroll;
            }
      
            body {
              max-width: 780px;
      
              margin: 0 auto;
              padding: 40px 20px;
            }
      
            .sitemap_header {
              margin-bottom: 20px;
            }
      
            .sitemap_title {
              margin: 0;
            }
      
            .sitemap_title_link {
              color: inherit;
              text-decoration: none;
            }
      
            .sitemap_main {}
      
            .sitemap_items {
              list-style: none;
              margin: 0;
              padding: 0;
            }
      
            .sitemap_item {
              position: relative;
      
              border: 2px solid #eee;
              border-bottom: 0;
              display: block;
            }
      
            .sitemap_item:last-child {
              border-bottom: 2px solid #eee;
            }
      
            .sitemap_item:nth-of-type(even) {
              background: #fafafa;
            }
            
            .sitemap_link {
              color: inherit;
              display: block;
              font-size: 18px;
              font-weight: 700;
              padding: 13px 20px 14px;
              text-decoration: none;
              transition:
                background .25s,
                color .25s;
            }
      
            .sitemap_item:hover .sitemap_link,
            .sitemap_link:focus {
              background: #eee;
            }
          </style>
        </head>
        <body>
          <header class="sitemap_header">
            <h1 class="sitemap_title">
              <a class="sitemap_title_link" href="page-home.html">${ options.name } Sitemap</a>
            </h1>
          </header>
          <main class="sitemap_main">
            <ul class="sitemap_items">
              ${ linksHTML }
            </ul>
          </main>
        </body>
      </html>`;

    fs.mkdir(options.dest, { 
      recursive: true 
    }, (err) => {
      if (err) throw err;

      fs.writeFile(options.dest + '/index.html', resultsHTML, function(err) {
        if (err) throw err;
      });
    });
  });
}