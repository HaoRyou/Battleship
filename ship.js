export class ship{
    constructor(size){
        this.length = size;
        this.life = 0;
        this.sunk = false
        this.location = [];
    }
    hit(){
        this.life++;
        this.issunk();
    }
    issunk(){
        if (this.life >= this.length) {
            this.sunk = true;
        }
        return this.sunk;
    }
}
