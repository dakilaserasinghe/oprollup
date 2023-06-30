# Design and Implementation of an Optimistic Rollup System

This project aims to design and implement an Optimistic Rollup prototype for a simple payment system. As the demand for efficient and scalable blockchain solutions grows, Layer-1 blockchains face challenges in managing a large number of transactions, leading to higher fees and longer processing times. Optimistic Rollups offer a Layer-2 scaling solution that enhances transaction throughput and lowers costs by leveraging off-chain computations.

In this project, we explore the architecture and approaches of Optimistic Rollups, including current trends in the state-of-the-art. We analyze Layer-2 economics, identifying critical cost factors and challenges in the Rollup protocol. Our objective is to develop a prototype that improves scalability while maintaining decentralization and security.

### Key Features:

- Optimistic Rollup implementation: Our prototype demonstrates the fundamental principles of an Optimistic Rollups utilizing fraud proofs for protocol integrity.
- Simple payment system: We focus on creating a user-friendly payment system within the Rollup, enabling fast and cost-effective transactions.
- Data compression techniques: We explore data compression mechanisms to optimize storage and enhance efficiency within the Rollup architecture.
- Scalability and usability analysis: We conduct comprehensive experiments to evaluate the performance metrics of our implementation and compare them with existing works.
- Future research and development: We identify the limitations inherent in our Rollup and propose potential avenues for future enhancements and exploration.

Through this project, we aim to contribute to the advancement of scalable blockchain solutions by showcasing the benefits and challenges of Optimistic Rollups. We hope this work will facilitate widespread adoption and efficient user experiences in the blockchain ecosystem.

For detailed information and instructions on setting up the Optimistic Rollup prototype, please refer to the documentation provided in [specification](/specs/).

&nbsp;
&nbsp;
## The Rollup System Architecture
<div align="center">
    <img src="system_arch.jpg" alt="Image Alt Text" />
    <p><strong>Figure : System Architecture</strong></p>
</div>
&nbsp;
&nbsp;

## Setup guide

1. install packages:
go to the root directory and run.

```shell
npm install    
```
2. create a .env file according to the given sample file.

3. start a local blockchain (hardhat node)\
For Windows: open Windows Subsystem for Linux (WSL) in the the project directory and run.
```shell
npx hardhat node
```

4. deploy contracts.\
open a command prompt (cmd) a terminal (WSL) or in the project root directory.
```shell
npx hardhat run scripts/deploy.js or 
npx hardhat run scripts/deploy.js --network localhost
```
successful deployment should output follow
```shell
Compiled 7 Solidity files successfully
opr_contract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
If the contract address differs with above, change it in the .env file.

5. connect user wallet.\
In the root directory and run
```shell
npm link
opr
```
This should list down all the wallet commands (add, l1deposit etc.)

6. run sequencer.\
open a command prompt in the root directory and run
```shell
node scripts\sequencer.mjs
```

7. run verifier.\
open a command prompt in the root directory and run
```shell
node scripts\verifer.mjs
```

8. interact in the L2 by making transactions :)


<!-- ## Transaction lifecycle
![Alt text](./ORU_Arch_V1.0.0.svg)
<img src="./ORU_Arch_V1.0.0.svg"> -->

## System Evaluation

### Performance Evaluation

| System | Max Theoretical Throughput (tps) | practical Throughput (tps)[^*] | L2 Approach | Finality |
|:------------:|:--------------:|:-------------:|:-------------:|:-------------:|
|   Polygon      |     65,000     |     6,900    | Sidechain/Plasma | 3h(PoS), 7days(Plasma) |
|   Optimism      |     200     |     110    | Optimistic Rollup | 7 days |
|   Arbitrum      |     4,500     |     102    | Optimistic Rollup | 7 days |
|   ZkSync      |     3,000     |     165    | Zero-Knowledge Rollup | 1 hour |
|   This Work      |     9,000     |     1[^1]    | Optimistic Rollup | 7 days |

[^1]: Practical throughput of this work was not properly tested. The proposed Rollup system has not
undergone a comprehensive test that would encompass the entire network and utilization.

[^*]: R. Neiheiser, G. Inácio, L. Rech, C. Montez, M. Matos, and L. Rodrigues, “Practical limitations of ethereum’s layer-2,” IEEE Access, vol. 11, pp. 8651–
8662, 2023.

&nbsp;
&nbsp;

### Characteristic Evaluation

| Properties | Arbitrum | Optimism | Fuel V1 | This Work |
|:------------:|:--------------:|:-------------:|:-------------:|:-------------:|
| Purpose | Universal | Universal | Payments | Payments |
| Model | Account | Account | UTXO | Account |
| Data Availability | On-chain |On-chain |On-chain |On-chain |
| State Validation | Fraud Proofs(MR)[^2] |  In Development | Fraud Proofs(SR)[^3] | Fraud Proof(SR) |
| Upgreadibility | Security Council & DAO[^4] | Upgrade Keys | Immutable | Upgrade Keys |
| Centralized Sequence | Yes | Yes | Yes | Yes |
| Censorship Resistance | Self-sequence | Self-sequence | Self-sequence | No mechanism |
| Security Audits | Yes | Yes | Yes | No |
| Rollup Stage | Stage 1 | Stage 0 | Stage 2 | Stage 0 |

[^2]: Multi-Round proof system
[^3]: Single-Round proof system
[^4]: Decentralized Autonomous Organization

&nbsp;
&nbsp;

### Rollup Maturity Assessment[^6]

| <div style="width: 400px">Stage 0 Requirements</div>  | |
| :-- | :---: |
| Does the project call itself a Rollup? | ✔️ |
| Are L2 state roots posted on L1? | ✔️ | 
| Does the project provide Data Availability (DA) on L1? | ✔️ |
| Is software capable of reconstructing the rollup’s state open source? | ✔️ |

| <div style="width: 600px">Stage 1 Requirements</div> | |
| :-- | :---: |
| Does the project use a proper proof system? | ✔️ |
| Are there at least 5 external actors that can submit a fraud proof? | ✔️ |
| Can the users exit without the operator’s coordination? | ❌ |
| Do users have at least 7 days to exit in case of unwanted upgrades (Security Council
and governance excluded)? | ❌ |
Is the Security Council properly set up? | ❌ |

| <div style="width: 400px">Stage 2 Requirements</div>  | |
| :-- | :---: |
| Is the fraud proof system permissionless? | ✔️ |
| Do users have at least 30 days to exit in case of unwanted upgrades? | ❌ |
| Is the Security Council restricted to act only due to errors detected on chain? | ❌ |

[^6]: Luca Donno, [“Introducing stages — a framework to evaluate rollups maturity.”](https://medium.com/l2beat/introducing-stages-a-framework-to-evaluate-rollups-maturity-d290bb22befe), June 20, 2023 [Online]. [Online; last accessed 20-June-2023].
