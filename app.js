/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll;

init(); // initialize game

// Roll Dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
    
        //Display result
        document.querySelector('.dice1').style.display = 'block';
        document.querySelector('.dice1').src = 'dice-' + dice1 + '.png';
        document.querySelector('.dice2').style.display = 'block';
        document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';

        //Update round score (if score is not 1)
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += (dice1 + dice2);
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            
            // roll two sixes, lose all points
            /*if (dice === 6 && prevRoll === 6) {
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            }
            prevRoll = dice;*/
        } else {
            //next player
            nextPlayer();
        }
    }
});

// Hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
            // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
    
        // update user interface (UI)
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        // read input to update winning score
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        input ? winningScore = input : winningScore = 20;
        
        // check if player won the game
        if (scores[activePlayer] >= input) {
            //halt gameplay
            gamePlaying = false;

            //announce victory by changing player name to "WINNER!"
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        } else {
            nextPlayer();
        }
    }
})

// New Game button
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    // zero scores
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0'; 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevRoll = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

























































