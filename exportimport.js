const http = require('http')
;
const rout =require('./rout')

console.log(rout.someText);

const server = http.createServer(rout.handler);

server.listen(4000)