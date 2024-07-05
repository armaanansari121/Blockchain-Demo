const redis = require("redis");

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
      this.handleMessage({ channel, message });
    });
  }

  handleMessage({ channel, message }) {
    const parseMessage = JSON.parse(message);
    console.log(`Message: "${message}" received on Channel: ${channel}`);
    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(parseMessage);
    }
  }

  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

module.exports = PubSub;
