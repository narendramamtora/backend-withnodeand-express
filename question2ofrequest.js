const http = require('http');
const server = http.createServer((req, res) => {
  const url = req.url;

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>node js</title></head>');
  res.write('<body>');
  res.write('<button><a href="/home">Home</a></button>');
  res.write('<button><a href="/about">About</a></button>');
  res.write('<button><a href="/node">Node</a></button>');
  

  if (url === '/home') {
    res.write('<h1>Welcome home</h1>');
  } else if (url === '/about') {
    res.write('<h1>Welcome to the about us page</h1>');
  } else if (url === '/node') {
    res.write('<h1>Welcome to the node</h1>');
  } else {
    res.write('<h1>Welcome to the node.js main page default</h1>');
  }

  res.write('</body>');
  res.write('</html>');
  res.end();
});

server.listen(4000);
