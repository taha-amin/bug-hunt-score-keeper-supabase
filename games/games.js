import { 
    logout, 
    checkAuth,
    getGames,
    createGame,
} from '../fetch-utils.js';
import { renderGame } from '../render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const logoutButton = document.getElementById('logout');
const pastGamesEl = document.getElementById('past-games-container');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

checkAuth();

let pastGames = [];

let currentGame = {
    name1: '',
    name2: '',
    score1: 0,
    score2: 0,
};

nameForm.addEventListener = ('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(nameForm);

    const name1 = formData.get('team-1');
    const name2 = formData.get('team-2');

    currentGame.name1 = name1;
    currentGame.name2 = name2;
    
    nameForm.reset();
    displayCurrentGameEl();
});


teamOneAddButton.addEventListener('click', () => {
    currentGame.score1++;
    
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    currentGame.score2++;

    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    currentGame.score1--;

    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    currentGame.score2--;
    displayCurrentGameEl();
});

function displayCurrentGameEl() {
    currentGameEl.textContent = '';

    teamOneLabel.textContent = currentGame.name1;
    teamTwoLabel.textContent = currentGame.name2;

    const gameEl = displayGame(currentGame);
    
    gameEl.classList.add('current');

    currentGameEl.append(gameEl);
}


function displayAllGames() {
    pastGamesEl.textContent = '';

    for (let game of pastGames) {
        const gameEl = displayGame(game);

        gameEl.classList.add('past');
        
        pastGamesEl.append(gameEl);
    }
}


finishGameButton.addEventListener('click', async() => {
    
    await createGame(currentGame);
    
    const games = getGames();

    pastGames = games;
    
    displayAllGames();
    
    currentGame = {};

    displayCurrentGameEl();
});

displayCurrentGameEl();


logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    const games = await getGames();

    if (games) {
        pastGames = games;

        displayAllGames();
    }
});
