const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    // console.log(chain, this.chain);
    if (chain.length <= this.chain.length) {
      console.error("The incoming chain is not longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain is not valid");
      return;
    }
    this.chain = chain;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      console.error("Genesis block invalid");
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, nonce, difficulty, prevHash, hash, data } = chain[i];
      const realPrevHash = chain[i - 1].hash;
      const prevDifficulty = chain[i - 1].difficulty;

      if (prevHash !== realPrevHash) {
        console.error(
          `prevHash : ${prevHash} didn't match with realPrevHash : ${realPrevHash}`
        );
        return false;
      }

      const validatedHash = cryptoHash(
        timestamp,
        nonce,
        difficulty,
        prevHash,
        data
      );
      if (validatedHash !== hash) {
        console.error(
          `hash ${hash} invalid with validatedHash ${validatedHash}`
        );
        return false;
      }
      if (Math.abs(prevDifficulty - difficulty) > 1) {
        console.error(
          `Difficulty changed by more than 1 prevDifficulty : ${prevDifficulty} and curDifficulty : ${difficulty}`
        );
        return false;
      }
    }

    return true;
  }
}

// const bitcoin = new Blockchain();
// bitcoin.addBlock({ data: "Block1" });

// bitcoin.chain.push({
//   timestamp: Date.now(),
//   nonce: 300,
//   difficulty: 0,
//   prevHash: "000",
//   data: "1BTC to Armaan",
//   hash: "123",
// });

// console.log(bitcoin);
// console.log(Blockchain.isValidChain(bitcoin.chain));

module.exports = Blockchain;
