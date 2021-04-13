const $arenas = document.querySelector('.arenas');
const $randomButton = $arenas.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Палка', 'Ружьё'],
    attack: attack,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};
const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['автомат', 'рогатка'],
    attack: attack,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

$randomButton.addEventListener('click', function () {
    player1.attack();
    player2.attack();

    const player1HP = player1.hp;
    const player2HP = player2.hp;

    if (player1HP === 0 && player2HP === 0) {
        gameOver();
    } else if (player1HP === 0) {
        gameOver(player2.name);
    } else if (player2HP === 0) {
        gameOver(player1.name);
    }
});

/**
 * Нанесение удара
 */
function attack() {
    const enemy = this.player === 1 ? player2 : player1;

    enemy.changeHP(getRandomCount(20));
    enemy.renderHP();

    addLog(`${this.name} нанёс удар ${enemy.name} [${enemy.hp} / 100]`);
}

/**
 * Завершение игры и вывод победителя
 * @param name
 */
function gameOver(name) {
    const $winsTitle = createElement('div', 'loseTitle');

    if (name) {
        $winsTitle.innerText = `${name} wins`;
    } else {
        $winsTitle.innerText = 'draw';
    }

    $arenas.appendChild($winsTitle);
    $randomButton.disabled = 1;
    createReloadButton();
}

/**
 * Изменение HP
 * @param hpCount
 * @returns {number}
 */
function changeHP(hpCount) {
    this.hp = this.hp >= hpCount ? this.hp - hpCount : 0;

    return this.hp;
}

/**
 * Получение элемента с жизнями
 * @returns {Element}
 */
function elHP() {
    return $arenas.querySelector(`.player${this.player} .life`);
}

/**
 * Отрисовка жизней
 */
function renderHP() {
    const playerLife = this.elHP();
    playerLife.style.width = this.hp+'%';
}

/**
 * Создание кнопки перезапуска игры
 */
function createReloadButton() {
    const $control = $arenas.querySelector('.control');
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);
    $control.appendChild($reloadWrap);

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });
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

/**
 * Добавление строки в лог
 * @param logStr
 */
function addLog(logStr) {
    const $chatContainer = document.querySelector('.chat__inner');
    $chatContainer.insertAdjacentHTML('afterbegin', `<p>${logStr}</p>`)
}

/**
 * Получение рандомного числа
 * @param maxCount
 * @returns {number}
 */
function getRandomCount(maxCount) {
    return Math.ceil(Math.random() * maxCount);
}

const players = $arenas.append(...[createPlayer(player1), createPlayer(player2)]);

addLog('Fight!!!');