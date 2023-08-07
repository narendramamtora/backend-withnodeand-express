const http = require('http');
const server = http.createServer((req, res) => {
  //process.exit();
  console.log(req.url,req.method, req.headers);
  res.setHeader('Content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>My first</title></head>');
  res.write('<body><h1>first js server</h1></body>');
  res.write('</html>')
  res.end();
});
server.listen(4000)