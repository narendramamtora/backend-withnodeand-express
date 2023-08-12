//?username and message are store in the txt file
const express = require('express');
const bodyParser = require('body-parser');
const exporter = express();
const fs=require('fs');

exporter.use(bodyParser.urlencoded({ extended: false }));

let loggedInUsername = '';

exporter.use('/login', (req, res, next) => {
    res.send(
        '<html><body><form id="loginform" action="/" method="POST"><input type="text" placeholder="username" name="username"><br><button type="submit">Login</button></form>' +
        '<script>'+
        'document.getElementById("loginform").addEventListener("submit", function(event) {' +
        'event.preventDefault();' +
        'const username = document.querySelector(\'input[name="username"]\').value;' +
        'localStorage.setItem("username", username);' +
        'this.submit();' +
        '});'+
        '</script>'+
        '</body></html>'
    );
    
});
exporter.post('/', (req, res, next) => {
    const username = req.body.username;
    const message = req.body.message;
 

    if (username) {
        loggedInUsername = username; // Store the logged-in username
    }

    if (message && loggedInUsername) {
        const data = `${loggedInUsername}:${message}\n`;
        fs.appendFile('username.txt', data, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            }
        });
    } 
    const chatHistory = fs.existsSync('username.txt')
    ? fs.readFileSync('username.txt', 'utf-8')
    : 'No existing message';

res.send(
    `${chatHistory}
     <form method="POST">
        <input type="text" placeholder="your message" name="message"><br>
        <button type="submit">send</button>
     </form>`
);
});

exporter.use((req, res, next) => {
    res.status(404).send('<h1>sorry Page not found</h1>');
});

exporter.listen(4000);
