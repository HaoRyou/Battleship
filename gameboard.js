import { ship, ship } from "./ship";

class Gameboard{
    constructor(){
        this.score = 0;
        this.miss = 0;
        this.numsunk = 0;
        this.board = Array.from({10:10}, () => new Array.fill(0));
        this.numships = [];
    }
    receiveAttack(x,y){
        this.numships.forEach(ships => {
            ships.location.forEach(location => {
                let fire = {x,y};
                if(fire == location){
                    ships.hit();
                    if(ships.issunk()){
                        this.score++;
                    }
                    return;
                }
            
            });
        });
        miss++;
    }
    match(x,y){
        this.numships.forEach(ships => {
            ships.location.forEach(location => {
                let fire = {x,y};
                if(fire == location){
                    return true;
                }
            
            });
        });
        return false;
    }
    printboard(){
        for(let i=0;i<10;i++){
            for(let z=0;z<10;z++){
                console.log(this.board[i][y]);
            }
        }
    }

    clearboard(){
        this.shiplocation = [];
    }

    randomcoord(){
        return Math.floor(Math.random()*10);
    }

    randombuild(){
        let shipsize = [1,1,1,1,2,2,3,3,4];

        while(shipsize.length > 0){
            const size = shipsize[0];
            const x = this.randomcoord();
            const y = this.randomcoord();

            const validDirs = this.checkfit(size, x, y);

            if (validDirs.length > 0) {
                const randIndex = Math.floor(Math.random() * validDirs.length);
                const direction = validDirs[randIndex];
                this.placeShip(size, x, y, direction);
                shipsize.shift();
            }
        }
    }
    checkfit(size,x,y){

        const directions = {
            right: [0, 1],
            left: [0, -1],
            down: [1, 0],
            up: [-1, 0]
        };

        const valid = [];

        for(const [dir, [dx, dy]] of Object.entries(directions)) {
            let fits = true;
            for(let i = 0; i < size; i++){
                const nx = x + dx * i;
                const ny = y + dy * i;

                if(
                    nx < 0 || nx >= 10 || ny < 0 || ny >= 10 ||
                    this.grid[nx][ny] !== 0
                ){
                    fits = false;
                    break;
                }
            }
            if(fits){
                valid.push(dir);
            } 
        }

        return valid;
    }

    placeShip(size,x,y,direction){
        const ship = new ship(size);
        let dx = 0;
        let dy = 0;
        if (direction === "right") dy = 1;
        if (direction === "left") dy = -1;
        if (direction === "down") dx = 1;
        if (direction === "up") dx = -1;

        const shipCoords = [];

        for(let i = 0; i < size; i++){
            const nx = x + dx * i;
            const ny = y + dy * i;
            this.board[nx][ny] = 1;
            ship.location.push({ x: nx, y: ny });
        }

        this.numships.push(ship);
    }  
}

export {Gameboard};