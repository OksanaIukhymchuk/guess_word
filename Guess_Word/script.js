'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const answer = document.querySelector('.btn-answer');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let player0Name;
let player1Name;

let activePlayer;
let playing = true;
let score = 0;
let scores = [0, 0];
let currentscore = 0;
let input = ``;
let pictures =document.querySelector('.pictures');

let wordBankSorted;
let wordBankSortedPictures = [];
let wordBankSortedWords = [];


document.querySelector('.dice').addEventListener('click', function(){
    let dice = Math.ceil(Math.random() *6);
    document.querySelector('.dice').src = `./images/dice/dice-${dice}.png`;
})

function init() {
    document.querySelector('.btn-input').focus();
    if(wordBankSortedPictures.length === 0) {    
        wordBankSorted = wordBank.sort(() => Math.random() - 0.5).slice(0,6);
        for(let i = 0; i < wordBankSorted.length; i++) {
            wordBankSortedPictures.push(wordBankSorted[i][1]); 
            wordBankSortedWords.push(wordBankSorted[i][0]); 
        }
        pictures.innerHTML = wordBankSortedPictures.join('');
    }    



    document.querySelector('.btn-input').focus();
    document.querySelector('.btn-input').value = ``;
    currentscore = 0;
    document.querySelectorAll('.current-score').forEach(function(item) {
        item.innerHTML = 0;
    })
    document.querySelector('.btn-input').focus();
    activePlayer = 0;   
    scores = [0,0];
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
init();

answer.addEventListener('click', writeWord);
document.querySelector('.btn-input').addEventListener('keydown', function(event) {
    if(event.key == "Enter") {
        writeWord();
    }
})

function writeWord() {
    // якщо ще є слова в базі
    if (wordBankSortedPictures.length > 0) {
        input = document.getElementById('word').value.toLowerCase().trim();
        
        for(let i = 0; i < wordBankSortedPictures.length; i++) {
            if(input === wordBankSortedWords[i]) {
                scores[activePlayer] += Number(wordBankSortedWords[i].length);
                document.getElementById(`current--${activePlayer}`).textContent = scores[activePlayer];
                // зменшувати базу слів та виводити на екран
                wordBankSortedPictures.splice(i, 1)
                wordBankSortedWords.splice(i, 1)
                wordBankSorted.splice(i, 1)
                pictures.innerHTML = wordBankSortedPictures.join('');
                // очистити ввід слів
                document.querySelector('.btn-input').focus();
                document.querySelector('.btn-input').value = ``;
                if(wordBankSortedPictures.length === 0) {
        			document.querySelector(`.player--0`).classList.remove('player--active')
                    document.querySelector(`.player--1`).classList.remove('player--active')
                    player0Name = document.querySelector('.label-0').value;
                    player1Name = document.querySelector('.label-1').value;

                    if(scores[0] > scores[1]) {
                        pictures.innerHTML = `Игра окончена! ${player0Name? `Победил(а) ${player0Name[0].toUpperCase() + player0Name.slice(1)}` : ' Победил ИГРОК 1'}. <br> 👍💪🎉🎸🍨🥥🍩🦄🎂🐞☕🥙🥑🦚🍉🥝🥨🍇🥞🍒🍦🍓🍣`
                        document.querySelector(`.player--0`).classList.add('player--winner');
              
                    }
                    else if(scores[0] < scores[1]) {
                        pictures.innerHTML = `Игра окончена! ${player1Name? `Победил(а) ${player1Name[0].toUpperCase() + player1Name.slice(1)}` : 'Победил ИГРОК 2'}. <br> 👍💪🎉🎸🍨🥥🍩🦄🎂🐞☕🥙🥑🦚🍉🥝🥨🍇🥞🍒🍦🍓🍣`
                        document.querySelector(`.player--1`).classList.add('player--winner')
                    }
                    else  {
                        pictures.innerHTML = `Игра окончена! НИЧЬЯ! <br> 👍💪🎉🎸🍨🥥🍩🦄🎂🐞☕🥙🥑🦚🍉🥝🥨🍇🥞🍒🍦🍓🍣`
                    }
                }
            }
            else {
              switchPlayer();
               document.querySelector('.btn-input').focus();
               document.querySelector('.btn-input').value = ``;
            }

            switchPlayer();    
        }
        
    }
}


const again = document.querySelector('.btn--new');
again.addEventListener('click', init);


const switchPlayer = function(){    
    document.getElementById(`current--${activePlayer}`).textContent = scores[activePlayer];
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    currentscore = scores[activePlayer];
}

const keyboard = document.querySelector('.keyboard');

const btnKeyboard = document.querySelector('.btn-keyboard').addEventListener('click', function() {
    keyboard.classList.remove('hidden');
})

keyboard.addEventListener('click', hideKeyboard);
document.addEventListener('keydown', hideKeyboard);


function hideKeyboard() {
    keyboard.classList.add('hidden');
    document.querySelector('.btn-input').focus();    
}

console.log(window)