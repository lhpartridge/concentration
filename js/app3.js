/**
 * 1.  See HTML
 * 2.  See HTML
 * 3.  See CSS
 * 
 * 4.  Add an event listener to the DOM
 */

document.addEventListener('DOMContentLoaded', () => {

})
    /**
     * 5.  Create an array of objects for the card array
     *     Make two copies of each
     *
     */
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
        // ,
        // {
        //     name: 'sacreCoeur',
        //     img: 'media/sacreCoeur.jpg'
        // },
        // {
        //     name: 'sacreCoeur',
        //     img: 'media/sacreCoeur.jpg'
        // },
        // {
        //     name: 'tropez',
        //     img: 'media/stTropez.jpg'
        // },
        // {
        //     name: 'tropez',
        //     img: 'media/stTropez.jpg'
        // }
    ]

    // 24.  Randomize the cards array using sort and Math.random
    cardArray.sort(() => 0.5 - Math.random())

    /**
     * 6.  Create the game board
     *     get the grid element from the DOM
     * 
     */
    const grid = document.querySelector('.grid');

    // 22.  Get the resultDisplay from the DOM
    const resultDisplay = document.getElementById('result')

    /**
     * 11.  Create an empty array for cardsChosen
     */
    let cardsChosen = [];

    /**
     * 13.  Create an empty array for the cardId
     */
    let cardsChosenId = [];

    // 18.  Create a third empty array for cardsWon
    let cardsWon = [];

    /**
     * 7.  Create the board
     *      Declare a function createBoard 
     *      Loop through the cardArray and create an image element for each image in the array
     *      Set the attributes with the src set to the blank image and the data-id set to the iterator
     *      Add an event listener to call the flipcard function, but comment it out
     *      Append the card to the grid;
     */


    function createBoard() {
        for(let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', '/media/france1.png');
            card.setAttribute('data-id', i);
            card.classList.add('card')
            // Comment out the event listener until the function is written
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
    }
}

/**
 * 9.  Write a comment to add a Check for matches function later
 */
// Check for matches
/**
 * 17.  Write the checkForMatch function
 * create a node list cards for all images
 * set the values of the option ids to the first and second values in the cardsChosenId array
 * write a conditional that checks for a match and if there is a match sets an alert and changes the image
 * remove the event listeners from the cards
 * 
 */
const checkForMatch =()=> {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match')
        cards[optionOneId].setAttribute('src', 'media/france2.png')
        cards[optionTwoId].setAttribute('src', 'media/france2.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)

        // 19.  Push the cardsChosen into the new cardsWon array
        cardsWon.push(cardsChosen)
        // 20.  If the cards don't match, flip them back over and set an alert to try again
    } else {
        cards[optionOneId].setAttribute('src', 'media/france1.png')
        cards[optionTwoId].setAttribute('src', 'media/france1.png')
        alert('Sorry, try again')
    }
    // 21.  Once the card images have been reset, clear the cardsChosen and cardsChosenId arrays
    cardsChosen = []
    cardsChosenId = []
    // 22.  Set the resultDisplay text
    resultDisplay.textContent = cardsWon.length
    // 23.  Write a conditional to check if all cards have been matched and set the resultDisplay text to the complete message
    if (cardsWon.length === cardArray.length/2)
        resultDisplay.textContent = 'Congratulations! You found all the cards!'
}

/**
 * 10.  Write the flipCard function
 *  */
// Flip your card
function flipCard() {
    let cardId = this.getAttribute('data-id');

/**
 * 12.  Push the cards from the card array into the cardsChosen array
 */
    cardsChosen.push(cardArray[cardId].name);

/**
 * 14.  Push the cardId into the cardId array
 */
    cardsChosenId.push(cardId);
/**
 * 15.  Set the src attribute for the card to the cardArray image
 */
    this.setAttribute('src', cardArray[cardId].img);
    console.log('image set', cardsChosenId)
/**
 * 16.  Write a conditional to test if the two cards match
 *      Add a timeout function to accommodate real time
 *      Then write the check for match function above 
 */
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 3000)
    } else {
        console.log('first card')
    }
}

/**
 * 8. Call the createBoard function
 * Make sure the board displays in the browser
 */
createBoard();