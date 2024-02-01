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

class Game {
    constructor() {
        //Create global variables
        this.gameboard = document.getElementById('gameboard')
        this.gameImages = []
        this.gameImageIds = []
        this.cardsChosen = []
        this.cardsMatched = []
    }
    
    // Create methods for the constructor
    init() {
        console.log('game started')
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
        // Create a div for each of gameImages, adding an event listener for each one
        // Set the image source to the blank image
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
        // the original file used the cardId set to the data-id
        // I'm going to try to use the gameId
        const cardId = this.getAttribute('data-id')
        const gameId = this.getAttribute('gameId')
        action.cardsChosen.push(action.gameImages[cardId])
        // action.cardsChosen.push(this)
        // console.log(this, action.cardsChosen)
        this.setAttribute('src', cardArray[cardId].img)
        if (action.cardsChosen.length === 2) {
            console.log('second card', this, action.cardsChosen)
            setTimeout(action.checkForMatch, 500)
        } else {
            console.log('first card', this, action.cardsChosen)
        }

    }

    checkForMatch() {
        const cards = document.querySelectorAll('img')
        const cardOne = action.cardsChosen[0]
        const cardTwo = action.cardsChosen[1]
        const cardOneId = action.cardsChosen[0].id
        const cardTwoId = action.cardsChosen[1].id

        // console.log("cardOne id is", cardOneId, "cardTwo id is", cardTwoId)
        // console.log("cardOneId, cards[cardOneId], cardTwoId, cards[cardTwoId] :  ", cardOneId, cards[cardOneId], cardTwoId, cards[cardTwoId])
        // cards[cardOneId].setAttribute('src', 'media/france2.png')
        // cards[cardTwoId].setAttribute('src', 'media/france2.png')
        
        // console.log(cards[cardOneId], cards[cardTwoId])

        // cardOne.setAttribute('data-id', action.cardsChosen.id)
        
        // const cardOne = action.gameImages[cardOneId]
        // const cardTwo = action.gameImages[cardTwoId]
        console.log( 'checking for match', cardOne, cardTwo)
        // console.log(action.gameImageIds, action.cardsChosen, cardOne.id, cardTwo.id)
        if (cardOne == cardTwo) {
            // action.cardsChosen[0].img = 'media/france2.png'
            // action.cardsChosen[1].img = 'media/france2.png'
            console.log('matched', cardOne, cardTwo)
            // action.cardsChosen[0].img.setAttribute('src', 'media/france2.png')
            // action.cardsChosen[1].img.setAttribute('src', 'media/france2.png')
            // console.log(action.gameImages[cardOne], action.gameImages[cardTwo)
        } else {
            console.log('no match', cardOne, cardTwo)
            // cardOne.setAttribute('src', 'media/blank.png')
            // cardTwo.setAttribute('src', 'media/blank.png')
        }
        action.cardsChosen = []
        console.log( 'after emptying cardsChosen', action.cardsChosen)
    }
}


const gameStartBtn = document.getElementById('gameStartBtn')
const action = new Game();

gameStartBtn.addEventListener('click', ()=> {
    action.init()
})

