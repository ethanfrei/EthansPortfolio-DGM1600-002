import { senators } from '../Data/senators.js'
import { representatives } from '../Data/representatives.js'

const members = [...senators, ...representatives] // combining arrays, yo

const senatorDiv = document.querySelector('.Senators')
const seniorityHeading = document.querySelector('.seniority')
const weaselListOrderedList = document.querySelector('.weaselList')

const modal = document.querySelector('.modal')
//const senatorDiv = document.querySelector('img').addEventListener('click') trying to make the images clickable for a modal



function simplifiedMembers(chamberFilter) {
    console.log(chamberFilter)
    const filteredArray = members.filter(member => chamberFilter ? member.short_title === chamberFilter :
        member)
    return filteredArray.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ``
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            gender: senator.gender,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
        }
    })
}



populateSenatorDiv(simplifiedMembers('Rep.'))

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

//const filterSenators = (prop, value) => simplifiedSenators().filter(senator => senator[prop] === value)


//const republicans = filterSenators('party','R')
//const femaleSenators = filterSenators('gender', 'F')
    
//console.log(republicans, femaleSenators)

 const mostSeniorMember = simplifiedMembers().reduce((acc, senator)=> {
    return acc.seniority > senator.seniority ? acc : senator
})



const mostLoyal = simplifiedMembers().reduce((acc, senator) => {
    if(senator.loyaltyPct === 100) {
        acc.push(senator === 100)
    }
    return acc
}, [])



const biggestWeasel = simplifiedMembers().reduce((acc, senator) =>
 (acc.missedVotesPct || 0) > senator.missedVotesPct ? acc : senator.missedVotesPct, {})

 const biggestWeasels = simplifiedMembers().filter(senator => senator.missedVotesPct >= 50)

 console.log(biggestWeasels)

 biggestWeasels.forEach(weasel => {
     let listItem = document.createElement('li')
     listItem.textContent = weasel.name
     weaselListOrderedList.appendChild(listItem)
 })

 closeButton.addEventListener('click', ()=> modal.classList.toggle('is-active'))
modalBackground.addEventListener('click', () => modal.classList.toggle('is-active'))



