let input =['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'] 
/*with using for of loop
for(let i of input){
    if(i==' '){
        i='empty array'
    }else{
        i=i
    }
    console.log(i)
}*/
var a =input.map(newarr=>{
     if(newarr==' '){
        newarr='empty array'
    }else{
        newarr=newarr
    }
    return newarr

      
    })
    console.log(a)
 





