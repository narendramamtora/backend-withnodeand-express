//?working fine but there are 2 readfile are in the same js file

const fs=require('fs')
const path=require('path')

const p=path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'product.json'
    ); 

    const getproductsfromfile=cb=>{
        fs.readFile(p,(err,filecontact)=>{
            if(err){
          return cb ([])
          }else{
              cb( JSON.parse(filecontact))    
          }
        })
    }
module.exports = class Product {
    constructor(t) {
    this.title = t;
    }

    save() {
        getproductsfromfile(products =>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {  
        getproductsfromfile(cb)
    }
};