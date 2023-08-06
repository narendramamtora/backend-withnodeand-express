const person={
    name: "max",
    age:29,
    get(){
        console.log('Hi this is '+this.name);
    }
};
//? in destructuring we have to specify the property we are intersted in here we are going with name property
const printsname=({name,age})=>{  
    console.log(name,age);
}
printsname(person);

// we can also use it outside the object 
const {name,age}=person; // we have to write the same property name as there in the objects
console.log(name,age);

// destructuring arrays 
const hobbies=['storts', 'cooking',2]
const [h1,h2,h3]=hobbies;  //unlike object we can use any same name in this variable as we use h1,h2,h3
console.log(h1,h2,h3);

// for(let hoy of hobbies){
//     console.log(hoy);
// }
// let re=hobbies.map(news=>'hello '+news) 
// console.log(re)
// //adding the new item in the array using push 
// hobbies.push(12);
// console.log(hobbies);
// //? rest and spread operator 
//  // this is called immutability pattern where we add new values or variable but did not edit the original array
//  // but to create the new array with all old value + adding new  
// //no1 method to copy an array the enties arr as it is
// const copyarr = hobbies.slice();
// console.log(copyarr);
// //no2 using arr[] it will be the array with another array in it or nested array 
// const copyarr2= [hobbies]
// console.log(copyarr2);
// //no3 spread operator it usefull to create the copy of object as well as array also 
// const copyarr3= [...hobbies]
// console.log(copyarr3);
// const copyobj={...person}
// console.log(copyobj);
// // without rest opearator
// const array =(ar1,ar2,ar3)=>{
//     return [ar1,ar2,ar3]
// };
// console.log(array(1,2,3))
// // without rest opearator
// const arrayc =(...ar)=>{
//     return ar
// };
// console.log(arrayc(1,2,3,4,5))



