/* Variables - containers that store values
Multi-line comment here */

var name; // a declared variable, but not initialized and it's in the global scope (BAD)

let foo; // a declared variable that can be changed

//const bar; // a declared variable that cannot be changed -  short for 'constant'

const ANSWER = 42; // const is declared and initialized with the value of 42

// Strings

let string1 = "Hello World!" // preferred way

let string2 = new String("Hellow World!") //constructor

// Number

let myNum = 29038424;

let myNum2 = 345.89;

"1" == 1; // this statement is true because of type coercion and lose equality checikng
"1" === 1; // false because this is strict equality checking

// Boolean

let myBool = false;

// Array 

let myArray2 = [42, "Bob", myBool, ANSWER, true];

let secondElement = myArray2[1]; // the second position is at index #1

myArray2.push("Ethan"); // added an element to the end of myArray2

myArray2.unshift("Hellow World!");

let mylongString = "fdjsabkanoe;are51a6f1vd5sa1v8b651e231rfa5s6d"; // just an array of characters

mylongString.length;

// Object

let myCar = {
    make: 'Jeep',
    color: 'white',
    year: '1998',
    vin: 'fbnajko;lrjeinafd1s2a35'
}

myCar.numDoor = 4;

element => console.log(element) // implicit 'return' when only one line for the function
element => {
    let foo = 'bar' + 'baxz'
    return console.log(element) // explicit 'return' because of multiple lines
}
(num1, num2) =>