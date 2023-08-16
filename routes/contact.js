const path =require('path')

const expresscontact=require('express');
const rootdir=require('../helper/path')
const contacting=expresscontact.Router();

contacting.get('/contactus',(req,res,next)=>{
    res.sendFile(path.join(rootdir,'viewshtml','contact.html'))  //! (../)===(..)    
    
});

// admin =>POST
contacting.post('/contactus',(req,res,next)=>{  //here we can use exporter.get and exporter.post
    console.log(req.body);   
    // to remove onject null propotype we can use console.log(JSON.stringify(req.body)); 
    res.redirect('/success');  
});

module.exports=contacting;
 