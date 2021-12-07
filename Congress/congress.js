import { senators } from '../Data/senators.js'
import { representatives } from '../Data/representatives.js'
import { removeChildren } from '../utils/index.js'



const members = [...senators, ...representatives] // combining arrays, yo

const senatorDiv = document.querySelector('.Senators')

const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')
const modalContent = document.querySelector('#image')

const main = document.querySelector('#main')
const mainHeader = document.createElement('header')
document.body.insertBefore(mainHeader, main)



const allButton = document.createElement('button')
allButton.textContent = 'All Congress'
allButton.addEventListener('click', () => {
    populateDOM(simplifiedMembers ()) 
})

mainHeader.appendChild(allButton)

const senatorsButton = document.createElement('button')
senatorsButton.textContent = 'Republican'

senatorsButton.addEventListener('click', () => {
    populateDOM(filterSimplifiedMembers (simplifiedMembers (), "R"))
})

mainHeader.appendChild(senatorsButton)

const democratsButton = document.createElement('button')
democratsButton.textContent = 'Democrats'
democratsButton.addEventListener('click', () => {
    populateDOM(filterSimplifiedMembers (simplifiedMembers (), "D"))
    console.log("click")
})

mainHeader.appendChild(democratsButton)




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






//populateDOM(filterSimplifiedMembers (simplifiedMembers (), "D"))
console.log(members)

function filterSimplifiedMembers(simpleSenators, memberFilter) {
    
    const filteredArray = simpleSenators.filter(member => member.party === memberFilter)
    return filteredArray 
}
console.log(filterSimplifiedMembers (simplifiedMembers (), "D"))




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



// const biggestWeasel = simplifiedMembers().reduce((acc, senator) =>
//  (acc.missedVotesPct || 0) > senator.missedVotesPct ? acc : senator.missedVotesPct, {})

//  const biggestWeasels = simplifiedMembers().filter(senator => senator.missedVotesPct >= 50)

//  console.log(biggestWeasels)

//  biggestWeasels.forEach(weasel => {
//      let listItem = document.createElement('li')
//      listItem.textContent = weasel.name
//      weaselListOrderedList.appendChild(listItem)
//  })

//  closeButton.addEventListener('click', ()=> modal.classList.toggle('is-active'))
// modalBackground.addEventListener('click', () => modal.classList.toggle('is-active'))


