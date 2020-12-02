const sha256 = require('crypto-js/sha256');

class Block {
    constructor (index = 0, previousHash = null, data = "Bloco gênesis", difficulty = 1){
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = new Date().toString();
        this.difficulty = difficulty;
        this.nonce = 0;
        this.mineBlocks();
    }

    calculateHash() {
        return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp + this.nonce).toString();
    }


    mineBlocks(difficulty) {
        this.hash = this.calculateHash();

        while (this.hash.substring(0, this.difficulty) != (new String('0', difficulty))) {
            this.nonce++;
            this.hash = this.calculateHash();
            console.log("Minerando " + this.hash);
        }
        console.log("BLOCO MINERADO: " + this.index);
        console.log("HASH:", this.hash);
        console.log("PROXIMO BLOCO... ");
    }
}

module.exports = Block;