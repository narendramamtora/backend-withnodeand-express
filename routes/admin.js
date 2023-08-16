const expresser=require('express');
const path= require('path')
const router=expresser.Router();
const rootdir=require('../helper/path')

// admin =>GET
router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootdir,'viewshtml','add-product.html'))    

});

// admin =>POST
router.post('/add-product',(req,res,next)=>{  //here we can use exporter.get and exporter.post
    console.log(req.body);   
    // to remove onject null propotype we can use console.log(JSON.stringify(req.body)); 
    res.redirect('/');  
});

module.exports=router;
