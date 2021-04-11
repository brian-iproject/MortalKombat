const player1 = {
    name: 'Scorpion',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Палка', 'Ружьё'],
    attack: function() {
        console.log(this.name + 'Figth...')
    }
};
const player2 = {
    name: 'Kitana',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['автомат', 'рогатка'],
    attack: function() {
        console.log(this.name + 'Figth...')
    }
};

function createPlayer(playerClass, player) {

    const $arenas = document.querySelector('.arenas');
    const $player = document.createElement('div');


    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');

    const $life = document.createElement('div');
    const $name = document.createElement('div');

    const $img = document.createElement('img');

    $player.classList.add(playerClass);
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $life.classList.add('life');
    $name.classList.add('name');


    $life.style.width = player.hp+'%';
    $name.innerText = player.name;
    $img.src = player.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $arenas.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);