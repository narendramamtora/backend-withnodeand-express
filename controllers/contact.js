const contact=[]
const path =require('path')
const rootdir=require('../helper/path')

exports.getcontacts=(req,res,next)=>{
    res.sendFile(path.join(rootdir,'viewshtml','contact.html'))  //! (../)===(..)        
}


exports.postcontacts=(req,res,next)=>{  //here we can use exporter.get and exporter.post
    console.log(req.body);   
    // to remove onject null propotype we can use console.log(JSON.stringify(req.body)); 
    res.redirect('/success');  
}



