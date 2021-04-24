import {createElement, getRandomCount} from "./utils.js";
import {clearLogs, writeLog} from "./logs.js";
import {Player} from "./player.js";

class Game {
    constructor(props) {
        this.$arenas = document.querySelector('.arenas');
        this.$control = document.querySelector('.control');
        this.fightButton = document.querySelector('.button[type=submit]')
        this.player1 = {};
        this.player2 = {};
    }

    /**
     * Создаеёт игроков
     */
    getPlayers = () => {
        this.player1 = new Player(1,{
            name: 'Scorpion',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
            weapon: ['Палка', 'Ружьё'],
        });
        this.player2 = new Player(2,{
            name: 'Kitana',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
            weapon: ['автомат', 'рогатка'],
        });
    }

    /**
     * Выбор случайной арены
     */
    setRandomArenas = () => {
        this.$arenas.classList.add('arena'+getRandomCount(5));
    }

    /**
     * Создание кнопки перезапуска игры
     */
    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button', 'button');

        $reloadButton.type = 'reset';
        $reloadButton.innerText = 'Restart';

        $reloadWrap.appendChild($reloadButton);
        this.$arenas.appendChild($reloadWrap);

        $reloadButton.addEventListener('click', this.reset);
    }

    /**
     * Возвращает результаты боя
     * @returns {{player1: (string), player2: (string)}}
     */
    getResult = () => {
        this.player1.winners = this.player1.hp !== 0 && true;
        this.player2.winners = this.player2.hp !== 0 && true;

        return {
            player1: this.player1.hp !== 0 && true,
            player2: this.player2.hp !== 0 && true
        };
    }

    /**
     * Выводит результаты
     */
    showResult = () => {
        const $winsTitle = createElement('div', 'winnerTitle');
        const result = this.getResult();

        if (!result.player1 && !result.player2) {
            writeLog('draw');
            $winsTitle.innerText = `draw`;
        }

        if (result.player1) {
            writeLog('end', this.player1, this.player2);
            $winsTitle.innerText = `${this.player1.name} wins`;
        }

        if (result.player2) {
            writeLog('end', this.player2, this.player1);
            $winsTitle.innerText = `${this.player2.name} wins`;
        }

        this.$arenas.appendChild($winsTitle);
    }

    /**
     * Завершение игры и вывод победителя
     */
    end = () => {
        this.showResult();

        this.fightButton.disabled = 1;
        this.createReloadButton();
    }

    /**
     * Перезапуск игры
     */
    reset = () => {
        clearLogs();

        this.player1.hp = 100;
        this.player2.hp = 100;

        this.player1.remove();
        this.player2.remove();

        this.$arenas.querySelector('.reloadWrap').remove();
        this.$arenas.querySelector('.winnerTitle').remove();

        this.fightButton.disabled = 0;

        this.init();
    }

    /**
     * Инициализация игры
     */
    init = () => {
        this.getPlayers();

        this.$arenas.append(...[this.player1.lauoyt, this.player2.lauoyt]);
        this.setRandomArenas();

        this.$control.addEventListener('submit', this.fight);

        writeLog('start', this.player1, this.player2);
    }

    /**
     * Возвращает параметры атаки из формы
     * @param form
     * @returns {{Object}}
     */
    playerAttack = (form) => {
        const attack = {};
        for (let item of form) {
            if (item.checked) {
                attack[item.name] = item.value;
            }
            item.checked = false;
        }

        return attack;
    }

    /**
     * Ведение боя
     * @param attack
     */
    fight = (event) => {
        event.preventDefault();

        const {hit, defence} = this.playerAttack(event.target);

        const player1Attack = this.player1.generateAttack(hit, defence);
        const player2Attack = this.player2.generateAttack();

        this.player1.attack(player1Attack.hit !== player2Attack.defence && player1Attack.value, this.player2);
        this.player2.attack(player1Attack.defence !== player2Attack.hit && player2Attack.value, this.player1);

        if (!this.player1.hp || !this.player2.hp)
            this.end();
    }
}

export default Game;