import fs from 'fs';
import * as abi_1 from "@ethersproject/abi";
import ethers from 'ethers';
import { keccak256 } from 'ethereum-cryptography/keccak.js';
import { StandardMerkleTree } from "../merkle-tree/dist/standard.js";
import { hexToBytes, bytesToHex, concatBytes, utf8ToBytes } from 'ethereum-cryptography/utils.js';
import assert from 'assert';
import { defaultAbiCoder } from '@ethersproject/abi';

/**
 * L2 Transaction structure.
 */
const l2Transaction = {
    sender: 0,
    target: 1,
    type: 2,
    value: 3,
    nonce: 4,
    timestamp: 5,
    txid: 6
}

/**
 * L2 Transaction status.
 */
const l2Status = {
    PENDING: 0,
    ACCEPTED_IN_L2: 1,
    ACCEPTED_IN_L1: 2,
    FINALIZED: 3,
    REJECTED: 4,
    NONE: 10
}

const readContractABI = (contractABIPath) => {
    let contractABI;
    try {
        contractABI = JSON.parse(fs.readFileSync(contractABIPath)).abi;
    } catch (error) {
        console.log("unable to open file")
        console.error(error.message);
        process.exit();
    }
    return contractABI;
};

const maptoArray = (stateMap) => {
    // const sortedMap = new Map([...stateMap.entries()].sort());
    const arr = Array.from(stateMap);
    // convert value object to array.
    arr.forEach((i) => {
        i[1] = Object.values(i[1]);
    });
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].flat(1);
    }
    return arr;
}

// create a merkle tree for state map.
const creatStateMerkleTree = (stateMap) => {
    const arr = maptoArray(stateMap);
    // leaf encoding - [user address, user balance, nonce]
    const leafEncoding = ['address', 'uint', 'uint'];
    console.log("sequencer balances: ", arr)
    const stateTree = StandardMerkleTree.of(arr, leafEncoding);
    return stateTree;
};

const createTrasactionMerkleTree = (transactionBatch) => {
    console.log("transaction batch: ", transactionBatch);
    // leaf encoding - [sender address, target address, tx type, value, nonce, timestamp, txid]
    const leafEncoding = ['address', 'address', 'string', 'uint', 'uint', 'uint', 'uint'];
    const transactionTree = StandardMerkleTree.of(transactionBatch,
        leafEncoding);
    return transactionTree;
};

/**
 * Returns hash value of the leaf for a proof.
 * @param {*} value candidate values of the leaf
 * @returns hex string.
 */
const standardLeafHash = (value) => {
    const types = ['address', 'address', 'string', 'uint', 'uint', 'uint', 'uint'];
    return bytesToHex(keccak256(keccak256(hexToBytes(defaultAbiCoder.encode(types, value)))));
};

// creating a transaction with extracted calldata for queuing.
// for Sequencer.
const createTransaction = (txId, sender, target, type, value, nonce) => {
    return {
        id: txId,
        sender: sender,
        target: target,
        type: type,
        value: value,
        nonce: nonce,
        timestamp: new Date().getTime(),
        status: l2Status.PENDING,
        batchid: undefined,
        errormsg: undefined,
        finality: undefined
    }
};

// recreate a transaction.
// for Verfier.
const reCreateTransaction = (txId, sender, target, type, value, nonce, timestamp) => {
    return {
        id: txId,
        sender: sender,
        target: target,
        type: type,
        value: value,
        nonce: nonce,
        timestamp: timestamp
    }
};

const intermState = (stateMap, txId) => {
    const interStateRoot = creatStateMerkleTree(stateMap).root;
    // intermediate state root hash in-dependance with tx id
    const imStateHash = abi_1.defaultAbiCoder.encode(['bytes32', 'uint'],
        [interStateRoot, txId]);
    // ethers.utils.hexlify.
    return [ethers.utils.hexlify(keccak256(keccak256(hexToBytes(imStateHash))))];
};

const intermStateTreeRoot = (intermStates) => {
    console.log("Interim States: ", intermStates);
    assert(intermStates, "Intermediate state roots should not be empty.");
    // leaf encoding - [32bytes string]
    const leafEncoding = ['string'];
    return StandardMerkleTree.of(intermStates, leafEncoding).root;
};

const logError = (msg) => {
    console.error('\x1b[31m%s\x1b[0m', msg);
}

const logInfo = (msg) => {
    console.log('\x1b[32m%s\x1b[0m', msg);
}

const logWarn = (msg) => {
    console.warn('\x1b[33m%s\x1b[0m', msg);
}

const fakeRoot = () => {
    return '0x' + keccak256("fakeRoot").toString('hex');
}


export {
    readContractABI,
    creatStateMerkleTree,
    createTrasactionMerkleTree,
    createTransaction,
    reCreateTransaction,
    intermState,
    intermStateTreeRoot,
    maptoArray,
    l2Transaction,
    logError,
    logInfo,
    logWarn,
    fakeRoot,
    l2Status,
    standardLeafHash
}