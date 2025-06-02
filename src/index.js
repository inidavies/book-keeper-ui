const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); // serves index.html, script.js, etc.

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


/*// index.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// using built in http module
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading HTML file');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/script/script.js') {
    const filePath = './src/script/script.js';
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading script.js");
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  }
  else {
    res.writeHead(404);
    res.end('Page not found');
  }

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/



