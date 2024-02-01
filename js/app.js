/**
 * Concentration
 * 
 * Start game with a button that sets the hidden images to a new random pattern
 * 
 * Create a message to start the game with a click
 * 
 * Use a class to set the game
 * Create an array of images
 * Set a blank image and a found image
 * 
 * Write a function to create a game board with clickable tiles that each have a data-id
 * Randomize the images, duplicate them and place them into a new array of gameImages
 * Loop through the array of gameImages and assign each image to a tile in the gameboard
 * Create an event listener for each tile that will trigger the flipCard function
 * 
 * flipCard
 * When card1 is flipped, its data-id is assigned to card1Id, the tile face is changed to the image
 * When card2 is flipped, its data-id is assigned to card2Id, the tile face is changed to the image
 * Increment the attempts
 * The checkMatch function is called and passed the values for card1Id and card2Id
 * 
 * CheckMatch
 * Write a conditional to check for a match
 * If card1Id == card2Id, set match to true and turn the tile faces to the found image
 *      Add the matched image to the matched image array
 * If card1Id != card2Id, set match to false and turn the tile faces to the blank image
 * Remove the event listeners from the tiles
 * 
 * Check for total matches
 * If the length of the matched images array is equal to the length of the imagesArray, then all images have been matched
 * 
 * gameOver
 *      Set the game over message
 *      Change all tile faces to the images
 *      Enable the Start game button
 *      Set the message to the winMessage
 *      
 * 
 * Return match
 * 
 * When the first tile is clicked, the image is revealed
 * When the second tiel is clicked, the image is revealed
 * If the second image is not equal to the first image, they revert to the blank image
 * If the images match, there is a timeout before setting the image to the found image
 * 
 * When all images have been matched, all tiles revert to the image
 * 
 * The game reset button is enabled
 * Clicking the reset button restarts the game with a new randomization of images
 */

const cardArray = [
    {
        name: 'eiffel',
        img: 'media/tourEiffel.jpg'
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
        name: 'mont',
        img: 'media/montBlanc.jpg'
    },
    {
        name: 'notreDame',
        img: 'media/notreDame.jpg'
    },
    {
        name: 'pont',
        img: 'media/pontDuGard.jpg'
    }
    // ,
  
    // {
    //     name: 'sacreCoeur',
    //     img: 'media/sacreCoeur.jpg'
    // },
  
    // {
    //     name: 'tropez',
    //     img: 'media/stTropez.jpg'
    // }
]
const messageBoard = document.getElementById('message')
// let message = messageBoard.innerText

class Game {
    constructor() {
        //Create global variables
        this.gameSpace = document.getElementById('gameSpace')
        this.gameboard = document.getElementById('gameboard')
        this.gameImages = [] // copy of cardArray: objects with name, img, and id
        this.gameImageIds = [] // copy of gameImages with randomized gameIds to put the images in random order
        this.cardsChosen = [] 
        this.cardsMatched = []

        // this.messageBoard = document.getElementById('message')
        // this.message = this.messageBoard.innerText

        this.scoreboard = document.getElementById('scoreboard')
        this.score = 0
    }
    
    // Create methods for the constructor
    init() {
        this.clearBoard()
        message = 'pick a card'
        messageBoard.innerText = message
        // begin the game
        // Create the gameImages array
        this.createGameImages()
        // console.log(this.gameImageIds)
        // Create the gameboard
        this.createGameboard()

    }

    createGameImages() {
        // Create an array of six images using the imageBank array
        // Duplicate the images and assign each one a gameImageId, such that each pair has the same id
        // Randomize the images, and push each one into the gameImages array
        
        this.gameImages = [...cardArray]
        for (let i = 0; i < cardArray.length; i++) {
            this.gameImages[i].id = i
        }

        this.gameImages = [...this.gameImages, ...this.gameImages]

        for (let i = 0; i < this.gameImages.length; i++) {
            this.gameImageIds.push(structuredClone(this.gameImages[i]))
        }

        for (let i = 0; i < this.gameImageIds.length; i++) {
            this.gameImageIds[i].gameId = Math.random()
            // console.log(i, this.gameImageIds[i])
        }

        this.gameImageIds.sort((a, b) => a.gameId - b.gameId)

    }


    createGameboard() {
        // this.gameSpace.appendChild(this.gameboard)
        // console.log(this.gameboard)
        // this.gameboard.removeChild('img')
        this.scoreboard.innerText = this.score
        // Create a div for each of gameImages, adding an event listener for each one
        // Set the image source to the blank image
        for (let i = 0; i < this.gameImageIds.length; i++) {
            this.gameImageIds[i].gameId = i
        }
        this.gameImageIds.forEach(image => {
            const card = document.createElement('img')
            card.setAttribute('src','media/blank.png')
            card.setAttribute('data-id', image.id)
            card.setAttribute('data-gameId', image.gameId)
            card.addEventListener('click', this.flipcard)
            this.gameboard.append(card)
        })
        console.log(this.gameImageIds)
    }

    flipcard() {
        if (action.cardsChosen.length == 0) {
            messageBoard.innerText = 'first card'
        } else if (action.cardsChosen.length == 1) {
            messageBoard.innerText = 'second card'
        }

        const cardId = this.getAttribute('data-id')
        const gameId = this.getAttribute('data-gameId')
        const ids = [cardId, gameId]
        this.setAttribute('id', gameId)
        this.setAttribute('src', cardArray[cardId].img)
        action.cardsChosen.push(ids)
        if (action.cardsChosen.length === 2) {
            setTimeout(action.checkForMatch, 3000)
        } else {
            console.log('first card')
            // continue
        }
    }

    checkForMatch() {
        const cardOne = action.cardsChosen[0] 
        const cardTwo = action.cardsChosen[1]
        const card1 = document.getElementById(cardOne[1])
        const card2 = document.getElementById(cardTwo[1])

        if (cardOne[1] == cardTwo[1]) {
            messageBoard.innerText = 'You picked the same card.  Pick again'
            card1.setAttribute('src', 'media/blank.png')
            card2.setAttribute('src', 'media/blank.png')
        } else if (cardOne[0] == cardTwo[0]) {
            action.score += 10
            action.scoreboard.innerText = action.score
            action.cardsMatched.push(card1, card2)
            messageBoard.innerText = 'You matched the cards!  Pick again.'
            card1.setAttribute('src', 'media/france2.png')
            card2.setAttribute('src', 'media/france2.png')
            card1.removeEventListener('click', action.flipcard)
            card2.removeEventListener('click', action.flipcard)
        } else {
            action.score -= 5
            action.scoreboard.innerText = action.score
            messageBoard.innerText = 'No match.  Try again.'
            card1.setAttribute('src', 'media/blank.png')
            card2.setAttribute('src', 'media/blank.png')            
        }
        action.cardsChosen = []
        if (action.cardsMatched.length == action.gameImageIds.length) {
            messageBoard.innerText = "You matched all the cards!  Game over."                        
            // action.cardsMatched.forEach(image => {
            //     image.src = action.gameImageIds[image.id].img
            //     console.log(image.src)
            // })
            action.gameOver()
        } 

    }

    gameOver() {
        console.log('game over')
        action.cardsMatched.forEach(image => {
            image.src = action.gameImageIds[image.id].img
        })
        gameStartBtn.removeAttribute('disabled')
    }

    clearBoard() {
        this.gameImageIds = []
        console.log('before clearing gameboard', this.gameboard)
        this.gameboard.innerHTML = ``
        console.log('gameboard cleared', this.gameboard)
    }
}

const gameStartBtn = document.getElementById('gameStartBtn')
const action = new Game();

let message = 'Click to start game'
messageBoard.innerText = message

gameStartBtn.addEventListener('click', ()=> {
    gameStartBtn.setAttribute('disabled', '')
    action.init()
})

console.log('end of code')