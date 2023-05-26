# Transaction Architecture

A transaction in Ethereum includes many different data fields including sender/reciever
addresses, signature, and gasLimit etc. And with newer changes like EIP-1559, it has
introduced more fields such as “maxPriorityFeePerGas”. In this work we use some of
the basic necessary fields as used in Ethereum and introduce new fields to assist our
Rollup protocol.

We prepare three different variants of a Rollup transaction. The first variant “type
1”, shown in the figure 19 lives in the sequencer mempool throughout its lifecycle
until it gets removed. The second variant “type 2” is the concise version of the
first, which goes through transaction management cycles such as queuing, re-queuing.
Third version “type 3”, is the last variant which goes in to the Layer-1 as compressed
Calldata.

## Layer-2 Transaction Format - Type I

The first version of a transaction that appears in the mempool contains all the
necessary data for the user interface. This includes the transaction status shown
as “status”, and any error messages displayed to the user in case the transaction is
rejected, known as “errormsg”.

Furthermore, it carries information such as “batchid”, the batch number in which
the transaction got included and “finality” the timestamp transaction achieves the
hard finality. These information facilitates the sequencer to identify and execute in
case of a “re-batching” situation following a malicious batch.

below shows all the information included in a Rollup transaction. The granularity
is differed based on the transaction type.

- **id** : A unique index to identify the transaction
- **sender** : The sender’s address, that will be signing the transaction
- **target** : The receiver’s address.
- **type** : Transaction type (deposit, l2transfer, withdraw)
- **value** : Amount of ETH to transfer from the sender to receipt( denominated in WEI)
- **nonce** : A sequentially incrementing counter which indicates the transaction number from the account
- **timestamp** : The timestamp when transaction get included in the mempool
- **status** : Current state of the transaction
- **batchid** : Batch index in which transaction gets included
- **errormsg** : Error message if transaction is rejected by the sequencer
- **finality** : The timestamp on which the transaction is expected to reach hard finality


```json
    {
        id : 2 ,
        sender : 0 x70997970C51812dc3A010C7d01b50e0d17dc79C8 ,
        target : 0 x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC ,
        type : ’ l2transfer ’ ,
        value : 100000000000000000 n ,
        nonce : ’1 ’,
        timestamp : 1679642993121 ,
        status : 2 ,
        batchid : 1 ,
        errormsg : undefined ,
        finality : 1679643934000
    }
```
<p align="center">Layer-2 Transaction Format - Type I</p>
&nbsp;
&nbsp;

## Layer-2 Transaction Format - Type II

Second version of the transaction, named as “txref” (in the software architecture)
which abbreviates to “transaction reference”, carries enough information for the
sequencer to carry out necessary operations having a pointer to the full data.
Sequencer will include “txref” in its transaction queue and when it starts sequencing,
it will extract the detailed version of the transaction by indexing from the mempool.
Mempool is implemented as a hashmap having a key-value combination with transaction id to transaction data. “texref” carries the transaction id (shown below), a
unique number and this is indexed in mempool to withdraw full data.



```json
    {
        id : 2 ,
        type : ’ l2transfer ’ ,
        timestamp : 1679642993121
    }

```
<p align="center">Layer-2 Transaction Format - Type II</p>