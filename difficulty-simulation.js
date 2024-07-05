const Blockchain = require("./blockchain");

const blockchain = new Blockchain();

blockchain.addBlock({ data: "Block 0" });
let prevTimeStamp,
  curTimeStamp,
  curBlock,
  timeDiff,
  totalTime = 0,
  averageTime;

for (let i = 1; i < 500; i++) {
  prevTimeStamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({ data: `Block ${i}` });
  curBlock = blockchain.chain[blockchain.chain.length - 1];
  curTimeStamp = curBlock.timestamp;
  timeDiff = curTimeStamp - prevTimeStamp;
  totalTime += timeDiff;
  averageTime = totalTime / i;
  console.log(
    `Time Taken : ${timeDiff} Difficulty : ${curBlock.difficulty} Average Time : ${averageTime}`
  );
}

// console.log(blockchain);
