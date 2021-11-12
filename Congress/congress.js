import { senators } from '../Data/senators.js'

const senatorDiv = document.querySelector('.Senators')

function simplifiedSenators(senatorArray) {
    return senatorArray.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ``
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`
        }
    })
}



populateSenatorDiv(simplifiedSenators(senators))

function populateSenatorDiv(simpleSenators) {
    simpleSenators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

figImg.src = senator.imgURL

        figCaption.textContent = senator.name
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
}

