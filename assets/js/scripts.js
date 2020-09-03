var cards = document.querySelectorAll(`.card`);

let flippedCard = false;
let firstCard, secondCard;
let locked = false;

function flipCard() {
    if (locked) return;    // makes you unable to check for a second pair while the first one is still visible
    if (this === firstCard) return;     // makes it so that you can't doubleclick a card
     this.classList.toggle('flip');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;    
        
        return;
    } 
    secondCard = this;

    checkMatch();   // checks for matches and if theres a match it keeps them up and makes them unable to click
    // if theres no match they flip themselves back after a short delay
    onTry()
}

function checkMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();  // disables the cards, making them unclickable since there was a match
    } else {
        unflipCards();  // flips the cards clicked back since there was no match
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetMap();  // Resets the map when there is a mismatch, making sure you can select "firstCard" again.

    setTimeout(() => {
        completed()
    }, 1300)
}

function completed() {
    if ($(".card.flip").length == $(".card").length) {   // checks to see whether these were the last cards you needed to flip or not
        modal.style.display = "block";  //  if it was the last card that needed to be flipped it pops up the "completed" screen
        resetgame()
        
    }
}

function unflipCards() { // unflips the cards when there is no match after a brief delay
    locked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetMap();
    }, 1300)
}

function resetMap() { // makes the cards clickable again when there is no match
    [flippedCard, locked] = [null, null];
    [firstCard, secondCard] = [null, null];
}

function shuffle(array) {       // The Fisher-Yates (aka Knuth) Shuffle used to shuffle the images
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


var images = new Array (document.querySelectorAll('.frontside'));
shuffle(images);
console.log(images);


(function randomizeMap() {
    shuffle(images);
    for (var i = 0; i < cards.length; i++) {
        images.src = cards[i];
    }
})()

cards.forEach(card => card.addEventListener(`click`, flipCard)) ;

var tries = 0;
function onTry() {
    tries += 1;
    document.getElementById("tries").innerHTML = tries;
};

$(".resetbutton").on('click', resetgame)  // allows you to reset the map by clicking the button allowing you to "retry"

function resetgame() {  //    function to make the game resettable by removing any flipped cards and re-randomizing the map layout.
    $(".card").removeClass('flip');
    cards.forEach(card => card.addEventListener(`click`, flipCard));
    setTimeout(() => { 
        cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 50);
        card.style.order = randomPos;
        });
    }, 1300)
    onTry(tries = -1)
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}