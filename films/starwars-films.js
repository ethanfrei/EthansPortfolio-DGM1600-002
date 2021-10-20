import { films } from '.../Data/films.js'

let filmList = document.querySelector('#filmList')

let titleList = document.createElement('ol')

filmList.appendChild(titleList)

for (let i = 0; i < films.length; i++) {
    let titleItem = document.createElement('li')
    titleItem.textContent = films[i].titleItem
    titleList.appendChild(titleItem)
}
