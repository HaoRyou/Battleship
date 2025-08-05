import { Gameboard } from './gameboard.js';

export class player{
    constructor(name){
        this.title = name;
        this.board = new Gameboard;
    }
}
