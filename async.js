function callab(){
  
    console.log('a');
  console.log('b');
    
  }
  
    function callc(){
    return new Promise((res,rej)=>{
        setTimeout(() =>{
            console.log('c'); 
            res();
        },3000)
     })
}
  
  function calld(){
    return new Promise((res,rej)=>{
            setTimeout(() =>{
        console.log('d');
        res();
     }, 0)
    })
    }

  
  function calle(){
    console.log('e');
}
  
  async function sequence (){
      callab();
      await callc()
      await calld()
       calle()
  }
  sequence();
  