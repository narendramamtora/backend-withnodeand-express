const http = require('http');
const fs=require('fs')
const server = http.createServer((req, res) => {
  //process.exit();
  const url=req.url;
  const method=req.method;
if(url==='/'){
    res.write('<html>');
  res.write('<head><title>Enter your Message</title></head>');
  res.write('<body><form action="/message" method="POST"><input type"text" name="message"><button type="submit">send</button></body>');
  res.write('</html>')
   return res.end();
}
if(url==='/message' && method ==='POST'){
    fs.writeFileSync('message.txt', 'You new file is here');
    res.statusCode=302;
    res.setHeader('location', '/');
    return res.end();
} 
  res.setHeader('Content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>My first</title></head>');
  res.write('<body><h1>Welcome to my Node Js Project</h1></body>');
  res.write('</html>')
  res.end();
});




server.listen(4000)