const http = require('http');
const fs=require('fs')
const server = http.createServer((req, res) => {
  //process.exit();
  const url=req.url;
  const method=req.method;
if(url==='/'){
    res.write('<html>');
  res.write('<head><title>Enter Message</title></head>');
  res.write('<body>');
        
  // content of the message.txt
  let messageContent = fs.readFileSync('message.txt');
  res.write('<p>'+messageContent+'</p>');
  res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form>');
  res.write('</body>');
  res.write('</html>');
  return res.end();
}
if(url==='/message' && method ==='POST'){
    const body=[];
    req.on('data',(chunk)=>{
        console.log(chunk);
    body.push(chunk);
  });
    req.on('end',()=>{
        const parsbody=Buffer.concat(body).toString();
        const message=parsbody.split('=')[1];
        console.log(message);
        fs.writeFileSync('message.txt', message);
        
    });
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