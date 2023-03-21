# Design and Implementation of an Optimistic Rollup System

This project demonstrates an optimistic rollup implementation.

Setup guide:

1. install packages:
go to the root directory and run.

```shell
npm install    
```

2. start a local blockchain (hardhat node)\
For Windows: open Windows Subsystem for Linux (WSL) in the the project directory and run.\
```shell
    npx hardhat node
```

3. deploy contracts.\
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
If the contract address difers with above, change it in the .env file.

4. connect user wallet.\
In the root directory and run
```shell
npm link
opr
```
This should list down all the wallet commands (add, l1deposit etc.)

5. run sequencer.\
open a command prompt in the root directory and run
```shell
node scripts\sequencer.mjs
```

6. run Verifier.\
open a command prompt in the root directory and run
```shell
node scripts\verifer.mjs
```
