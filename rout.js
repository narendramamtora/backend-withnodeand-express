const fs=require('fs')

const requesthandler=(req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url==='/'){
        res.write('<html>');
      res.write('<head><title>Enter Message</title></head>');
      res.write('<body>  <form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></body>');
      res.write('</html>')
       return res.end();
    }
    if(url==='/message' && method ==='POST'){
        const body=[];
        req.on('data',chunk=>{
            console.log(chunk);
        body.push(chunk); 
      });
       return req.on('end',()=>{
            const parsbody=Buffer.concat(body).toString();
            const message=parsbody.split('=')[1];
            fs.writeFile('message.txt', message, err=> {
                    res.statusCode=302;
                    res.setHeader('location', '/');
                    res.end();
                
            });
        });
    } 
      res.setHeader('Content-Type','text/html');
      res.write('<html>');
      res.write('<head><title>My first</title></head>');
      res.write('<body><h1>Welcome to my Node Js Project</h1></body>');
      res.write('</html>')
      res.end();
}
//first way export 
//module.exports= requesthandler;

//second way to export
//module.exports.handler = requesthandler;
//module.exports.someText='this is the exported file

//3th way using objects 
module.exports= {
    handler: requesthandler,
    someText: 'some export files are here'
};