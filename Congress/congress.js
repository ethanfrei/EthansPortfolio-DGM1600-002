import { senators } from '../Data/senators'

const senatorDiv = document.querySelector('.senators')

function populateSenatorDiv() {
    senators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figCaption.textContent = senator.first_name
        senatorFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
}

populateSenatorDiv