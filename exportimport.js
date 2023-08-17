const express= require('express');
const path= require('path')
const bodyparser= require('body-parser')

const exporter= express();

const adminroutes=require('./routes/admin')

const adminshop=require('./routes/shop')

const admincontact=require('./routes/contact')

const success=require('./controllers/success')

exporter.use(bodyparser.urlencoded({extended:false}));

exporter.use(express.static(path.join(__dirname,'public')))

exporter.use('/admin',adminroutes);

exporter.use(adminshop);

exporter.use(admincontact);

exporter.use('/success',success.successcontact);

exporter.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'viewshtml','error.html'))      
});

exporter.listen(4000)