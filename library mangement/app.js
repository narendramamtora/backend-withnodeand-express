const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models= require('./models/books');
const sequelize=require('./util/database');
const app = express();
const postRoute=require('./routes/route');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(postRoute);
sequelize
.sync()
.then(result =>{
    app.listen(3000)
})
.catch(err=>console.log(err))

