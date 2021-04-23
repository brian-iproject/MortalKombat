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
 * Получение рандомного числа
 * @param maxCount
 * @returns {number}
 */
const getRandomCount = (maxCount) => Math.ceil(Math.random() * maxCount);

/**
 * Возвращает время в
 * отформатированном виде
 * @returns {string}
 */
const getTimeFormatted = () => {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes();
}

export {getRandomCount, createElement, getTimeFormatted}