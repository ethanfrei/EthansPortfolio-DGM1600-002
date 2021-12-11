import { people } from '../Data/people.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

// audioObj = new Audio(`https://www.youtube.com/watch?v=7n7Gg7gPG3I`);
// myAudioElement.addEventListener("canplaythrough". event => {
//     myAudioElement.play()
// })

const main = document.querySelector('#main')

const mainHeader = document.createElement('header')
const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')
const modalContent = document.querySelector('#Image')

closeButton.addEventListener('click', () => {
    modal.classList.toggle('is-active')
})

modalBackground.addEventListener('click', () => {
    modal.classList.toggle('is-active')
})

document.body.insertBefore(mainHeader, main)



// const searchButton = document.createElement('.button')
// searchButton.textContent = 'Search Character'
// // searchButton.addEventListener('click', () => )
// mainHeader.appendChild(searchButton)


const allButton = document.createElement('button')
allButton.textContent = 'All Characters'
allButton.addEventListener('click', () => populateDOM(people))
mainHeader.appendChild(allButton)

const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
maleButton.addEventListener('click', () => populateDOM(maleCharacters))
mainHeader.appendChild(maleButton)

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))
mainHeader.appendChild(femaleButton)


const othersButton = document.createElement('button')
othersButton.textContent = 'Other Characters'
othersButton.addEventListener('click', () => populateDOM(otherCharacters))
mainHeader.appendChild(othersButton)

const maleCharacters = people.filter((person) => person.gender === 'male')

const femaleCharacters = people.filter((person) => person.gender === 'female')

const otherCharacters = people.filter((person) => {

if (
    person.gender === 'n/a' ||
    person.gender === 'hermaphrodite' ||
    person.gender === 'none'
) {
    return person
}
})

function populateDOM(characters) {

    removeChildren(main)
while (main.firstChild) {
    main.removeChild(main.firstChild)
}
console.log(populateDOM)


characters.forEach((element) => {
const personFig = document.createElement('figure')
const personImg = document.createElement('img')
let charNum = getLastNumber(element.url)
personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

personImg.addEventListener('click', (event) => {
    modal.classList.toggle('is-active')
    modalContent.src = event.target.src
})

const personCaption = document.createElement('figcaption')
personCaption.textContent = element.name

personFig.appendChild(personImg)
personFig.appendChild(personCaption)

main.appendChild(personFig)

}
)
}




