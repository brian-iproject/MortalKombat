import {$arenas} from "./globals.js"
import {createElement, getRandomCount} from "./utils.js";
import {writeLog} from "./logs.js";

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
 * Получаем параметры атаки и
 * возвращем их уже со значением силы удара
 * @param hit
 * @param defence
 * @returns {{hit: string, defence: string, value: number}}
 */
function getAttack(
    hit = ATTACK[getRandomCount(3) - 1],
    defence = ATTACK[getRandomCount(3) - 1]) {
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

        writeLog('hit', this, enemy, damage);
    } else {
        writeLog('defence', this, enemy);
    }
}

/**
 * Принимает текущего игрока и
 * Возвращает соперника
 * @param player
 * @returns {{elHP: (function(): Element), weapon: string[], img: string, attack: attack, name: string, hp: number, changeHP: (function(*): number), player: number, renderHP: function()}|{elHP: (function(): Element), weapon: string[], img: string, attack: attack, name: string, hp: number, changeHP: (function(*): number), player: number, renderHP: renderHP}}
 */
const getEnemy = (player) => player.player === 1 ? player2 : player1;

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

export {createPlayer, removePlayers, getAttack, player1, player2}