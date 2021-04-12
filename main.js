const $arenas = document.querySelector('.arenas');
const $randomButton = $arenas.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Палка', 'Ружьё'],
    attack: function() {
        const enemyHP = changeHP(player2);

        addLog(`${this.name} нанёс удар ${player2.name} [${enemyHP} / 100]`);

        if (enemyHP === 0)
            playerWins(this.name);
    }
};
const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['автомат', 'рогатка'],
    attack: function() {
        const enemyHP = changeHP(player1);

        addLog(`${this.name} нанёс удар ${player1.name} [${enemyHP} / 100]`);

        if (enemyHP === 0)
            playerWins(this.name);
    }
};

$randomButton.addEventListener('click', function (){
    player1.attack();
    player2.attack();
});

/**
 * Добавление строки в лог
 * @param logStr
 */
function addLog(logStr) {
    const $chatContainer = document.querySelector('.chat__inner');
    $chatContainer.insertAdjacentHTML('afterbegin', `<p>${logStr}</p>`)
}

/**
 * Завершение игры и вывод победителя
 * @param name
 */
function playerWins(name) {
    const $winsTitle = createElement('div', 'loseTitle');
    $winsTitle.innerText = `${name} wins`;

    $arenas.appendChild($winsTitle);
    $randomButton.disabled = 1;
}

/**
 * Получение рандомного числа
 * @param maxCount
 * @returns {number}
 */
function getRandomCount(maxCount) {
    return Math.ceil(Math.random() * maxCount);
}

/**
 * Изменение HP
 * @param playerObj
 * @returns {number}
 */
function changeHP(playerObj) {
    const $player = $arenas.querySelector(`.player${playerObj.player}`);
    const playerLife = $player.querySelector('.life');

    const randomCount = getRandomCount(20);

    playerObj.hp = playerObj.hp >= randomCount ? playerObj.hp - randomCount : 0;

    playerLife.style.width = playerObj.hp+'%';

    return playerObj.hp;
}

/**
 * Создание элемента DOM
 * @param tag
 * @param tagClass
 * @returns {*}
 */
function createElement(tag, tagClass) {
    const $tag = document.createElement(tag);

    if (tagClass)
        $tag.classList.add(tagClass);

    return $tag;
}

/***
 * Создание разметки игрока
 * @param playerObj
 */
function createPlayer(playerObj) {
    const $player = createElement('div', `player${playerObj.player}`);

    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');

    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');

    const $img = createElement('img');


    $life.style.width = playerObj.hp+'%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player
}


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

addLog('Fight!!!');