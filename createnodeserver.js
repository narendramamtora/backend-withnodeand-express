const http = require('http');

const server = http.createServer((req, res) => {
    const name = 'Narendra Mamtora'; 

        /*if we want to print name 1 time in the console
     if (req.url === '/') {
        console.log(name);
    }*/
    
  console.log(name);

    res.write(name);
    
    // End the response
    res.end();
});

server.listen(4000);
