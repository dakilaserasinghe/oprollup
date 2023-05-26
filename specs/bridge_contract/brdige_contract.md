# The Bridge Contract
The bridge contract is responsible to act as the middle layer in a Rollup between
Layer-1 and Layer-2. It facilitates user entrance and exit of rollup supporting asset
transfers between layers. The integrity and security of the Rollup is held up by the
bridge contract.

A bridge contract has several roles in a simple payment system. It should accept
deposits from the users and allow users to exit from the Rollup. It should perform as
a “messenger ” between Layer-1 and Layer-2. And finally the bridge contract operate
as the final referee in case of a dispute over a fraudulent batch submission.
In the following subsections we describe our approach in accomplishing 
aforementioned properties of a Rollup bridge contract.

## Protocol Assumptions of the Layer-1 Blockchain
In designing a bridge contract, we rely on several assumptions that are made on the
underlying blockchain.

- Neutrality Validators of the underlying blockchain are not colluding with
the Rollup operators. Currently, Layer-1 blockchains are fairly decentralized
networks, where colluding is extremely difficult. Hence it is correct to assume
strong neutrality from Ethereum.
- Eventual Delivery A user transaction will be minted in the underlying
blockchain given that he pays an appropriate base fee. Ethereum operates on
an economic-incentive gas fee mechanism, ensuring that the transaction will
eventually be added to an upcoming block.
- Safety of Smart Contract A smart contract is considered as a trustless
immutable third party. It is a deterministic decentralized program which carries
the same security as Ethereum. This enables a trust-minimized bridge creation
for Layer-2.
