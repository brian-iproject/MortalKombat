import {getRandomCount, getTimeFormatted} from "./utils.js";
import {LOGS} from "./constants.js";

const $chatContainer = document.querySelector('.chat__inner');

/**
 * Записывает сгенерированную
 * строку в лог
 * @param rest
 */
function writeLog(...rest) {
    $chatContainer.insertAdjacentHTML('afterbegin', `<p>${generateLog(...rest)}</p>`)
}

/**
 * Чистит логи
 */
function clearLogs() {
    $chatContainer.innerHTML = '';
}

/**
 * Генерирует лог и вызывает запись
 * строки в лог
 * @param type
 * @param player1
 * @param player2
 * @param damage
 */
function generateLog(type, player1 = false, player2 = false, damage = 0) {
    const {name: player1Name} = player1;
    const {name: player2Name, hp: player2HP} = player2;

    let textLog = '';
    let randomLog = '';

    if (typeof LOGS[type] === 'object')
        randomLog = LOGS[type][getRandomCount(LOGS[type].length - 1) - 1];

    switch (type) {
        case 'hit':
            textLog = `[time] ${randomLog} -[damage] [[hp]/100]`;
            break;
        case 'defence':
        case 'end':
            textLog = `[time] ${randomLog}`;
            break;
        default:
            textLog = LOGS[type] ? LOGS[type] : 'error type log';
            break;
    }

    return textLog
        .replace('[playerDefence]', `<span class="red">${player2Name}</span>`)
        .replace('[playerKick]', `<span class="red">${player1Name}</span>`)
        .replace('[time]', getTimeFormatted())
        .replace('[player1]', `<span class="red">${player1Name}</span>`)
        .replace('[player2]', `<span class="red">${player2Name}</span>`)
        .replace('[playerWins]', `<span class="red">${player1Name}</span>`)
        .replace('[playerLose]', `<span class="red">${player2Name}</span>`)
        .replace('[damage]', `<span class="red">${damage}</span>`)
        .replace('[hp]', `<span class="red">${player2HP}</span>`);
}

export {writeLog, clearLogs, generateLog};