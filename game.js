import {$arenas, $control, $randomButton} from "./globals.js"
import {createElement, getRandomCount} from "./utils.js";
import {clearLogs, writeLog} from "./logs.js";
import {removePlayers, getAttack, player1, player2, createPlayer} from "./player.js";

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

/**
 * Возвращает результаты боя
 * @returns {{player1: (string), player2: (string)}}
 */
function getResult() {
    return {
        player1: player1.hp === 0 ? 'lose' : 'winner',
        player2: player2.hp === 0 ? 'lose' : 'winner',

    };
}

/**
 * Выводит результаты
 */
function showResult() {
    const $winsTitle = createElement('div', 'winnerTitle');
    const result = getResult();

    if (result.player1 === 'lose' && result.player2 === 'lose') {
        writeLog('draw');
        $winsTitle.innerText = `draw`;
    }

    if (result.player1 === 'winner') {
        writeLog('end', player1, player2);
        $winsTitle.innerText = `${player1.name} wins`;
    }

    if (result.player2 === 'winner') {
        writeLog('end', player2, player1);
        $winsTitle.innerText = `${player2.name} wins`;
    }

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

    gameInit();
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
function gameInit() {
    $arenas.append(...[createPlayer(player1), createPlayer(player2)]);
    setRandomArenas();

    $control.addEventListener('submit', combat);

    writeLog('start', player1, player2);
}

export {gameInit};