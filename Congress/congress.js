import { senators } from '../Data/senators.js'
import { representatives } from '../Data/representatives.js'
import { getLastNumber } from '../utils/index.js'


const members = [...senators, ...representatives] // combining arrays, yo

const senatorDiv = document.querySelector('.Senators')
const seniorityHeading = document.querySelector('.seniority')
const weaselListOrderedList = document.querySelector('.weaselList')


const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')
const modalContent = document.querySelector('#image')

const main = document.querySelector('#main')
const mainHeader = document.createElement('header')
document.body.insertBefore(mainHeader, main)





//add buttons here...?
//const republicansButton = document.createElement('button')
//republicansButton.textContent = 'Republicans Reps.'

//mainHeader.appendChild(republicansButton)

//const representativesButton = document.createElement('button')
//representativesButton.textContent = 'Democrat Reps.'
//mainHeader.appendChild(representativesButton)

//const senatorsButton = document.createElement('button')
//senatorsButton.textContent = 'Republican Senators'

//senatorsButton.addEventListener('click', () => populateDOM(republicans))

//mainHeader.appendChild(senatorsButton)

//const democratsButton = document.createElement('button')
//democratsButton.textContent = 'Democrats Senators'
//mainHeader.appendChild(democratsButton)










//const republicans = senators.filter(person => person.party === 'R')

//const democrats = senators.filter(person => person.party === 'D')

//const republicanRepresentatives = representatives.filter(person => person.party === 'R')

//const democratRepresentatives = representatives.filter(person => person.party === 'D')




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






populateDOM(simplifiedMembers('Rep.'))

function populateDOM(simpleSenators) {

    simpleSenators.forEach(senator => {
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')
        figImg.addEventListener('click', (event) => {
            modal.classList.toggle('is-active')
            modalContent.src = event.target.src
           
        })

        
        
        

figImg.src = senator.imgURL


        figCaption.textContent = senator.name
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
        
    })
}


closeButton.addEventListener('click', ()=> modal.classList.toggle('is-active'))
modalBackground.addEventListener('click', () => modal.classList.toggle('is-active'))



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


