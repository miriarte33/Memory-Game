$(function() {
  let openCards = [] //global array
  let counter = 0; //global move counter
  let cardsMatched = 0; //global counter for matches. If 8, game over
  let timer = new Timer();

  //Create a list that holds all of cards
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

  //flip the card
  function displayCard(card) {
    $(card).addClass('open show');
  }

  //unflip the cards when the second one doesn't match the first
  function hideCard(card) {
    $(card).removeClass('open show');
  }

  //Sets the class to 'match' if the cards are equal
  function cardsMatch(card1, card2) {
    if (card1 !== card2) { //if theyre not the same exact card, then they match
      console.log('equal');
      while (openCards.length !== 0) {
        openCards.pop();
      }
      $(card1).removeClass('open show');
      $(card2).removeClass('open show');
      $(card1).addClass('match');
      $(card2).addClass('match');
      cardsMatched++;
    } else { //the user clicked the same exact card twice, so they cant match (that would be cheating)
      cardsDontMatch(card1, card2);
    }
  }

  //Sets the class to 'dont-match' if the cards are not equal, which does an animation on both cards
  function cardsDontMatch(card1, card2) {
    console.log('not equal');
    $(card1).addClass('dont-match');
    $(card2).addClass('dont-match');
    while (openCards.length !== 0) {
      openCards.pop();
    }
    setTimeout(function() {
      $(card1).removeClass('open show dont-match');
      $(card2).removeClass('open show dont-match');
    }, 1000); //1 second delay so that the user can see the second card before it disappears
  }

  //add a card to the openCards list and check if those cards are equal
  function addCard(card) {
    openCards.push(card);
    if (openCards.length === 2) {
      if(openCards[0].innerHTML === openCards[1].innerHTML) {
        cardsMatch(openCards[0], openCards[1]);
      } else {
        cardsDontMatch(openCards[0], openCards[1]);
      }
      incrementMove();
      gameOver();
    }
  }

  //Checks whether or not the game is over
  function gameOver() {
    if (cardsMatched === 8) {
      console.log('YOU WON!!!!');
      let winner = document.querySelector('.deck');
      let starCount = document.querySelector('.stars');
      let timeElapsed = document.querySelector('.time');
      winner.innerHTML = `<li class='winner'>YOU WON! <br> Moves: ${counter} <br> Time: ${timer.getTimeValues()} ` + '<br>' + starCount.innerHTML + '</li>';
      timer.stop();
    }
  }

  //Tracks how many moves the user has done
  function incrementMove() {
    counter++;
    let starCount = document.querySelector('.stars');
    if (counter < 24) {
      starCount.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>'
    } else if (counter >= 24 && counter < 40) {
      starCount.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
    } else {
      starCount.innerHTML = '<i class="fa fa-star"></i>';
    }
    let moveCounter = document.querySelector('.moves');
    moveCounter.textContent = `Moves: ${counter}`;
  }

  function play() {
    shuffle(cards);
    let deck = document.getElementsByClassName('card');
    let card = document.createElement('li');//create a new element for the shuffled cards
    let timeElapsed = document.querySelector('.time');
    timer.start();
    for (let i=0; i<deck.length; i++) {
      $(cards[i]).removeClass('show open match');//Make sure every card starts off facing backwards
      $(card).addClass('card');
      card.appendChild(cards[i].firstElementChild);//add the shuffled cards at children of the new element

      let x = deck[i];
      x.addEventListener('click', function(evt) { //event listener for when a card is clicked
        evt.preventDefault();
        timer.addEventListener('secondsUpdated', function (e) {
          timeElapsed.textContent = timer.getTimeValues().toString();
        });
        displayCard(x);
        addCard(x);
      });

      deck[i].appendChild(card.firstElementChild);//add the shuffled cards
    }
  }

  //reloads the page if the restart element is clicked
  function replay() {
    let replayButton = document.querySelector('.restart');
    replayButton.addEventListener('click', function(evt) {
      evt.preventDefault();
      location.reload();
    });
  }

  replay();
  play();
});
