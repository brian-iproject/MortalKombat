import {createElement, getRandomCount} from "./utils.js";
import {writeLog} from "./logs.js";
import {HIT, ATTACK} from "./constants.js";

class Player {
    constructor(id, props) {
        this.id = id;
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        this.lauoyt = this.create();
    }

    /**
     * Изменение HP
     * @param hpCount
     * @returns {number}
     */
    changeHP = (hpCount) => {
        this.hp = this.hp >= hpCount ? this.hp - hpCount : 0;

        return this.hp;
    }

    /**
     * Получение элемента с жизнями
     * @returns {Element}
     */
    elHP = () => this.lauoyt.querySelector(`.player${this.id} .life`);

    /**
     * Отрисовка жизней
     */
    renderHP = () => {
        const playerLife = this.elHP();
        playerLife.style.width = this.hp+'%';
    }

    /**
     * Генерирует параметры атаки и
     * возвращем их со значением силы удара
     * @param hit
     * @param defence
     * @returns {{hit: string, defence: string, value: number}}
     */
    generateAttack = (
        hit = ATTACK[getRandomCount(3) - 1],
        defence = ATTACK[getRandomCount(3) - 1]) => {
        return {
            value: getRandomCount(HIT[hit]),
            hit,
            defence
        }
    }

    /**
     * Нанесение удара
     * @param damage
     * @param enemy
     */
    attack = (damage, enemy) => {
        if (damage) {
            enemy.changeHP(damage);
            enemy.renderHP();

            writeLog('hit', this, enemy, damage);
        } else {
            writeLog('defence', this, enemy);
        }
    }

    /***
     * Создание разметки игрока
     * @param playerObj
     */
    create = () => {
        const {id, hp, name, img} = this;

        const $player = createElement('div', `player${id}`);

        const $progressbar = createElement('div', 'progressbar');
        const $character = createElement('div', 'character');

        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');

        const $img = createElement('img');

        $life.style.width = hp+'%';
        $name.innerText = name;
        $img.src = img;

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
    remove = () => {
        this.lauoyt.remove();
    }
}




export {Player}