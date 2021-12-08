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

// a higher order function is a function that accepts another function as a parameter. 
// filter, map and reduc e are the most popular, but forEach, every, find, and some are also 

const pilots = [
    {
        id: 2,
        name: "Wedge Antilles",
        faction: "Rebels"
    },
    {
        id: 8,
        name: "Ciena Ree",
        faction: "Empire"
    },
    {
        id: 40,
        name: "Iden Versio",
        faction "Empire"
    },
    
];

const rebels = pilots.filter((pilot) => pilot.faction === "Rebels");
const empire = pilots.filter((pilot) => {
    return pilot.faction === "Empire"
})

const pilotName = pilots.map((pilot) => pilot.name).filter(item => item !== undefined)

console.log()

let filmURLs = [

]

{
    id: 99,
    name: "Ello Atsy",
    years: 22
},

const totalYears = swpilots.reduce((acc, pilot) => acc + pilot.years, 0);

const mostExpPilot = swpilots.reduce((oldest, pilot) => {
    return (oldest.years 0) > pilot.years ? oldest : pilot;
}, {};





figImg.addEventListener('click', () => {
    modal.classList.toggle('is-active')
    img.src = figImg
})

<nav id="navbar">
        <ul class="nav-list" style="font-family: garamond">
            <li>
                <a href="#welcome-section">Republicans</a>
            </li>
            <li>
                <a href="#projects">Democrats</a>
            </li>
            <li>
                <a href="#contact">Senators</a>
            </li>
            <li>
                <a href="#contact">Representatives</a>
            </li>
            
        </ul>
    </nav>

    #navbar {
        background-color: #0A1734;
        width: 100%;
        
        }
        
        .nav-list{
        display: flex;
        justify-content: flex-end;
        list-style-type: none;
        margin-right: 5rem;
        }
        
        .nav-list a {
            display: block;
            text-decoration: none;
            color: #f0f0f0;
            padding: 1.5rem;
            font-size: xx-large;
        }
        
        .nav-list a:hover {
            background-color: #99241F;
        }//
    
    header {
        font-family: garamond;
        text-align: center;
        
        font-size: xx-large;
        color: white;
        background-color: #99241F;
    }


    

//

function populateSenatorDiv(simpleSenators) {

    simpleSenators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        figImg.src = `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`
        let figCaption = document.createElement('figcaption')
        figImg.addEventListener('click', (event) => {
            modal.classList.toggle('is-active')
            modalContent.src = event.target.src
           
        })


//pokeCaption.textContent = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`