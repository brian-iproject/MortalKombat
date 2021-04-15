const $chatContainer = document.querySelector('.chat__inner');

/**
 * Добавление строки в лог
 * @param logStr
 */
function writeLog(logStr) {
    $chatContainer.insertAdjacentHTML('afterbegin', `<p>${logStr}</p>`)
}

/**
 * Чистим логи
 */
function clearLogs() {
    $chatContainer.innerHTML = '';
}


function fightLog(player, hitValue, enemy, enemyHP) {
    writeLog(`${player} нанёс удар <span class="red">[${hitValue}]</span> ${enemy} <span class="red">[${enemyHP} / 100]</span>`);
}

export {writeLog, clearLogs, fightLog};