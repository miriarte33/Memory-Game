$(function() {
  var openCards = [] //global array
  var counter = 0; //global move counter

  //Create a list that holds all of your cards
  const diamonds = document.getElementsByClassName('fa-diamond');
  const paperPlanes = document.getElementsByClassName('fa-paper-plane-o');
  const anchors = document.getElementsByClassName('fa-anchor');
  const bolts = document.getElementsByClassName('fa-bolt');
  const cubes = document.getElementsByClassName('fa-cube');
  const leaves = document.getElementsByClassName('fa-leaf');
  const bicycles = document.getElementsByClassName('fa-bicycle');
  const bombs = document.getElementsByClassName('fa-bomb');

  const cards = [diamonds[0].parentElement, diamonds[1].parentElement, paperPlanes[0].parentElement,
              paperPlanes[1].parentElement, anchors[0].parentElement, anchors[1].parentElement,
              bolts[0].parentElement, bolts[1].parentElement, cubes[0].parentElement,
              cubes[1].parentElement, leaves[0].parentElement, leaves[1].parentElement,
              bicycles[0].parentElement, bicycles[1].parentElement, bombs[0].parentElement,
              bombs[1].parentElement];

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

  function displayCard(card) {
    $(card).addClass('open show');
  }

  function hideCard(card) {
    $(card).removeClass('open show');
  }

  function cardsMatch(card1, card2) {
    console.log('equal');
    while (openCards.length !== 0) {
      openCards.pop();
    }
    $(card1).addClass('match');
    $(card2).addClass('match');
  }

  function cardsDontMatch(card1, card2) {
    console.log('not equal');
    while (openCards.length !== 0) {
      openCards.pop();
    }
    setTimeout(function() {
      $(card1).removeClass('open show');
      $(card2).removeClass('open show');
    }, 1000);
  }

  function addCard(card) {
    openCards.push(card);
    if (openCards.length === 2) {
      if(openCards[0].innerHTML === openCards[1].innerHTML) {
        cardsMatch(openCards[0], openCards[1]);
      } else {
        cardsDontMatch(openCards[0], openCards[1]);
      }
      incrementMove();
    }

  }

  function incrementMove() {
    counter++;
    let starCount = document.querySelector('.stars');

    if (counter >= 24 && counter < 40) {
      starCount.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
    } else if (counter >= 40 && counter < 56) {
      starCount.innerHTML = '<li><i class="fa fa-star"></i></li>';
    } else if (counter >= 56) {
      starCount.innerHTML = '';
    }
    let moveCounter = document.querySelector('.moves');
    moveCounter.textContent = counter;
  }
  /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */

  shuffle(cards);
  let deck = document.getElementsByClassName('card');
  let card = document.createElement('li');

  for (let i=0; i<deck.length; i++) {
    $(cards[i]).removeClass('show open match');
    $(card).addClass('card');
    card.appendChild(cards[i].firstElementChild);
    //deck[i].appendChild(card.firstElementChild);

    let x = deck[i];

    x.addEventListener('click', function(evt) {
      evt.preventDefault();

      displayCard(x);
      addCard(x);
    });

    deck[i].appendChild(card.firstElementChild);
  }


  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */
});
