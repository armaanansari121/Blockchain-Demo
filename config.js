const MINE_RATE = 1000; // 1000ms
const INITIAL_DIFFICULTY = 2;
const GENESIS_DATA = {
  timestamp: 1,
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
  prevHash: "0x000",
  hash: "0x123",
  data: "GENESIS BLOCK",
};

module.exports = { GENESIS_DATA, MINE_RATE };
