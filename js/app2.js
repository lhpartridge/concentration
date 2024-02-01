document.addEventListener('DOMContentLoaded', () => {
    //list all card options
    const cardArray = [
        {
            name: 'eiffel',
            img: 'media/tourEiffel.jpg'
        },
        {
            name: 'eiffel',
            img: 'media/tourEiffel.jpg'
        },
        {
            name: 'arc',
            img: 'media/arcDeTriomphe.jpg'
        },
        {
            name: 'arc',
            img: 'media/arcDeTriomphe.jpg'
        },
        {
            name: 'chenonceaux',
            img: 'media/chenonceaux.jpg'
        },
        {
            name: 'chenonceaux',
            img: 'media/chenonceaux.jpg'
        },
        {
            name: 'mont',
            img: 'media/montBlanc.jpg'
        },
        {
            name: 'mont',
            img: 'media/montBlanc.jpg'
        },
        {
            name: 'notreDame',
            img: 'media/notreDame.jpg'
        },
        {
            name: 'notreDame',
            img: 'media/notreDame.jpg'
        },
        {
            name: 'pont',
            img: 'media/pontDuGard.jpg'
        },
        {
            name: 'pont',
            img: 'media/pontDuGard.jpg'
        }
    ]
  
    cardArray.sort(() => 0.5 - Math.random())
  
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'media/france1.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }
  
    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'media/france1.png')
        cards[optionTwoId].setAttribute('src', 'media/france1.png')
        alert('You have clicked the same image!')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match')
        cards[optionOneId].setAttribute('src', 'media/france2.png')
        cards[optionTwoId].setAttribute('src', 'media/france2.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
      } else {
        cards[optionOneId].setAttribute('src', 'media/france1.png')
        cards[optionTwoId].setAttribute('src', 'media/france1.png')
        alert('Sorry, try again')
      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length
      if  (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations! You found them all!'
      }
    }
  
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
      }
    }
  
    createBoard()
  })