

const path =require('path')
//const rootdir=require('../helper/path')

exports.successcontact=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../viewshtml','success.html'))      
}