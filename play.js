import { Gameboard } from "./gameboard";

class player{
    constructor(name){
        this.title = name;
        this.board = new Gameboard;
    }
    buildboard(){
       

    }
    randombuild(board){
        let randx = (Math.random*10).toFixed(0);
        let randy = (Math.random*10).toFixed(0);
        let shipsize = [1,1,1,1,2,2,3,3,4];
        

    }
}