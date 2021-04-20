import {getRandomCount} from "./utils.js";

const $chatContainer = document.querySelector('.chat__inner');

/**
 * Записывает строку в лог
 * @param logStr
 */
function writeLog(logStr) {
    $chatContainer.insertAdjacentHTML('afterbegin', `<p>${logStr}</p>`)
}

/**
 * Чистит логи
 */
function clearLogs() {
    $chatContainer.innerHTML = '';
}

/**
 * Возвращает время в
 * отформатированном виде
 * @returns {string}
 */
function getTimeFormatted() {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes();
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
    let baseLog = '';

    switch (type) {
        case 'hit':
            baseLog = `[time] ${logs[type][getRandomCount(logs[type].length - 1)]} -[damage] [[hp]/100]`;
            break;
        case 'defence':
            baseLog = `[time] ${logs[type][getRandomCount(logs[type].length - 1)]}`;
            break;
        case 'end':
            baseLog = `[time] ${logs[type][getRandomCount(logs[type].length - 1)]}`;
            break;
        default:
            baseLog = logs[type];
            break;
    }

    const textLog = baseLog
        .replace('[playerDefence]', `<span class="red">${player2.name}</span>`)
        .replace('[playerKick]', `<span class="red">${player1.name}</span>`)
        .replace('[time]', getTimeFormatted())
        .replace('[player1]', `<span class="red">${player1.name}</span>`)
        .replace('[player2]', `<span class="red">${player2.name}</span>`)
        .replace('[playerWins]', `<span class="red">${player1.name}</span>`)
        .replace('[playerLose]', `<span class="red">${player2.name}</span>`)
        .replace('[damage]', `<span class="red">${damage}</span>`)
        .replace('[hp]', `<span class="red">${player2.hp}</span>`)
        .replace('[playerWins]', `<span class="red">${player1.name}</span>`)
        .replace('[playerLose]', `<span class="red">${player2.name}</span>`);

    writeLog(textLog);
}

/**
 * Объект с вариантами логов
 * @type {{hit: string[], defence: string[], start: string, end: string[], draw: string}}
 */
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

export {writeLog, clearLogs, generateLog};