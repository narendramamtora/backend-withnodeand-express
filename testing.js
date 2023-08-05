const person={
    name: "max",
    age:29,
    get(){
        console.log('Hi this is '+this.name);
    }
};
const hobbies=['storts', 'cooking',2]
for(let hoy of hobbies){
    console.log(hoy);
}
let re=hobbies.map(news=>'hello '+news) 
console.log(re)
//adding the new item in the array using push 
hobbies.push(12);
console.log(hobbies);
