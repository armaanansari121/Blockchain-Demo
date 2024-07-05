const redis = require("redis");
// const { PORT } = require("./index");
const fs = require("fs");

const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
};

class PubSub {
  constructor({ blockchain }) {
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();
    this.blockchain = blockchain;

    this.subscriber.subscribe(CHANNELS.TEST);
    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

    this.subscriber.on("message", (channel, message) => {
      // console.log("message received");
      this.handleMessage({ channel, message });
    });
  }

  handleMessage({ channel, message }) {
    const parseMessage = JSON.parse(message);
    console.log(`Message: "${message}" received on Channel: ${channel}`);
    // console.log(parseMessage, message);
    if (channel === CHANNELS.BLOCKCHAIN) {
      // console.log(parseMessage);
      this.blockchain.replaceChain(parseMessage);
      // fs.writeFile("");
    }
  }

  publish({ channel, message }) {
    // console.log("published");
    // console.log(message);
    this.publisher.publish(channel, message);
  }

  broadcastChain() {
    // console.log("broadcasted chain");
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

module.exports = PubSub;
