const path =require('path')

const expressshop=require('express');
const rootdir=require('../helper/path')
const shoping=expressshop.Router();

shoping.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootdir,'viewshtml','shop.html'))  //! (../)===(..)    
    
});

module.exports=shoping;
 