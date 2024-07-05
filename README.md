# My First Step in the World of Blockchain

## Understanding Blockchain Technology

Blockchain technology is a revolutionary concept that leverages a decentralized network to maintain a distributed ledger. Each node in the network maintains a copy of the blockchain, ensuring complete transparency and immutability of the data. This decentralization eliminates the need for a central authority, thereby fostering trust and security among participants in the network.

### How Does Blockchain Work?

At its core, blockchain is a chain of blocks where each block contains a list of transactions. These transactions are grouped together and cryptographically secured. The key components include:

1. **Decentralization**: Unlike traditional centralized databases, a blockchain network is decentralized, with each node maintaining a copy of the entire blockchain.
2. **Transparency**: All transactions are recorded on a public ledger that is accessible to all participants, ensuring transparency.
3. **Security**: Transactions are verified by network nodes through cryptography and consensus algorithms, making the blockchain highly secure and resistant to tampering.

### Problems Addressed by Blockchain

- **Trust**: By eliminating the need for intermediaries, blockchain fosters trust between parties.
- **Transparency**: All transactions are publicly recorded, providing complete transparency.
- **Security**: The cryptographic nature of blockchain makes it secure against fraud and tampering.
- **Efficiency**: Blockchain can streamline processes and reduce the time and cost associated with traditional methods.

## Practical Demo

To demonstrate the key concepts of blockchain, I created a practical example using JavaScript and Redis. Redis was employed to incorporate the publisher-subscriber model, ensuring that newly mined blocks are shared with the entire network in real time.

### Key Components

- **JavaScript**: Used for the core logic of the blockchain.
- **Redis**: Utilized to implement the publisher-subscriber model for real-time block sharing.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Postman Agent
- Redis

### Steps to execute demonstration
1. **Clone the repository**:
   ```sh
   git clone https://github.com/armaanansari121/Blockchain-Demo.git
   ```
2. **Install Dependencies**:
   ```sh
   npm i
   ```
3. **Run Postman Agent**:
4. **Run redis server**:
   ```sh
   redis-server
   ```
5. **Initialize the first node**:
   ```sh
   npm run dev
   ```
6. **Initialize other nodes**:
   ```sh
   npm run dev-peer
   ```
7. **Mine blocks**:
   Mine blocks by sending post requests using Postman Agent to 'https://localhost:3000/api/mine'. Replace 3000 with other port number to send requests to other blocks.
