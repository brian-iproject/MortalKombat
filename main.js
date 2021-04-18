import {writeLog, clearLogs, generateLog} from "./logs.js";
import {getRandomCount, createElement} from "./utils.js";

const $arenas = document.querySelector('.arenas');
const $control = document.querySelector('.control');
const $randomButton = $arenas.querySelector('.button[type=submit]');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Палка', 'Ружьё'],
    attack,
    changeHP,
    elHP,
    renderHP
};
const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['автомат', 'рогатка'],
    attack,
    changeHP,
    elHP,
    renderHP
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

/**
 * Получаем параметры атаки и
 * возвращем их уже со значением силы удара
 * @param hit
 * @param defence
 * @returns {{hit: string, defence: string, value: number}}
 */
function getAttack(hit = ATTACK[getRandomCount(3) - 1], defence = ATTACK[getRandomCount(3) - 1]) {
    return {
        value: getRandomCount(HIT[hit]),
        hit,
        defence
    }
}

/**
 * Нанесение удара
 * @param damage
 */
function attack(damage) {
    const enemy = getEnemy(this);

    if (damage) {
        enemy.changeHP(damage);
        enemy.renderHP();

        generateLog('hit', this, enemy, damage);
    } else {
        generateLog('defence', this, enemy);
    }
}

/**
 * Принимает текущего игрока и
 * Возвращает соперника
 * @param player
 * @returns {{elHP: (function(): Element), weapon: string[], img: string, attack: attack, name: string, hp: number, changeHP: (function(*): number), player: number, renderHP: function()}|{elHP: (function(): Element), weapon: string[], img: string, attack: attack, name: string, hp: number, changeHP: (function(*): number), player: number, renderHP: renderHP}}
 */
function getEnemy(player) {
    return player.player === 1 ? player2 : player1;
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
 * Выбор случайной арены
 */
function setRandomArenas() {
    $arenas.classList.add('arena'+getRandomCount(5));
}

/**
 * Создание кнопки перезапуска игры
 */
function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.type = 'reset';
    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);

    $reloadButton.addEventListener('click', gameReset);
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
 * Удаление игроков
 */
function removePlayers() {
    const players = $arenas.querySelectorAll('[class*=player]');

    for (let player of players) {
        player.remove();
    }
}

/**
 * Возвращает результаты боя
 * @returns {{player1: (string), player2: (string)}}
 */
function getResult() {
    return {
        player1: player1.hp === 0 ? 'lose' : 'winner',
        player2: player2.hp === 0 ? 'lose' : 'winner'
    };
}

/**
 * Выводит результаты
 */
function showResult() {
    const $winsTitle = createElement('div', 'winnerTitle');
    const result = getResult();

    if (result.player1 === 'lose' && result.player2 === 'lose')
        generateLog('draw');

    if (result.player1 === 'winner')
        generateLog('end', player1, player2);

    if (result.player2 === 'winner')
        generateLog('end', player2, player1);

    $arenas.appendChild($winsTitle);
}

/**
 * Завершение игры и вывод победителя
 */
function gameOver() {
    showResult();

    $randomButton.disabled = 1;
    createReloadButton();
}

/**
 * Перезапуск игры
 */
function gameReset() {
    removePlayers();
    clearLogs();

    player1.hp = 100;
    player2.hp = 100;

    $arenas.querySelector('.reloadWrap').remove();
    $arenas.querySelector('.winnerTitle').remove();

    $randomButton.disabled = 0;

    init();
}

/**
 * Ведение боя
 * @param event
 */
function combat(event) {
    event.preventDefault();

    const attack = {};
    for (let item of this) {
        if (item.checked) {
            attack[item.name] = item.value;
        }
        item.checked = false;
    }

    const player1Attack = getAttack(attack.hit, attack.defence);
    const player2Attack = getAttack();

    player1.attack(player1Attack.hit !== player2Attack.defence && player1Attack.value);
    player2.attack(player1Attack.defence !== player2Attack.hit && player2Attack.value);

    if (player1.hp === 0 || player2.hp === 0) {
        gameOver();
    }
}

/**
 * Инициализация игры
 */
function init() {
    $arenas.append(...[createPlayer(player1), createPlayer(player2)]);
    setRandomArenas();

    $control.addEventListener('submit', combat);

    generateLog('start', player1, player2);
}

init();