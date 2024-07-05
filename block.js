const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");
// const fs = require("fs");

class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.nonce = nonce;
    this.difficulty = difficulty;
    this.prevHash = prevHash;
    this.data = data;
    this.hash = hash;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ prevBlock, data }) {
    let hash,
      timestamp = Date.now();
    const prevHash = prevBlock.hash;
    let { difficulty } = prevBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, nonce, difficulty, data, prevHash);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );
    // console.log("\nTIMESTAMP : ", timestamp, "\nNONCE : ", nonce);
    // fs.appendFile("timestamps.txt", timestamp.toString() + "\n", (err) => {
    //   if (err) console.log("Error appending");
    //   else console.log("Appended successfully");
    // });
    return new Block({
      timestamp,
      nonce,
      difficulty,
      data,
      prevHash,
      hash: cryptoHash(timestamp, nonce, difficulty, prevHash, data),
    });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

module.exports = Block;
// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const res = Block.mineBlock({ prevBlock: genesisBlock, data: "block2" });
// console.log(res);