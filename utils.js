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
function getRandomCount(maxCount) {
    return Math.ceil(Math.random() * maxCount);
}

export {getRandomCount, createElement}