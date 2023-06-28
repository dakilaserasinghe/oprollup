# The Sequencer
The sequencer is a single centralized entity whose task is to accept and execute
Layer-2 transactions and then submit compressed batches to the Layer-1 blockchain.
The responsibilities of a sequencer may differ on the Rollup architecture. Commonly,
the sequencer is the gateway for users in Layer-2, sending direct signed transactions.
The sequencer design depends on the trust assumptions in the system. For e.g.
Arbitrum’s sequencer is trusted on transaction ordering. And it guarantees the
sequencer has no capacity to censor any transaction in Layer-2.

In general a sequencer has two ways of getting transactions. First through a direct
peer-to-peer connection where users send their signed transactions to the sequencer.
But if a malicious sequencer prevent a user from using the network, users are allowed
to directly submit transactions to the Layer-1 which will be inserted in the next
blocks given a delay.

This work is not performing a mechanism to mitigate censorship
resistance. Henceforth we assume an honest behavior on transaction acceptance by
the sequencer.
&nbsp;
&nbsp;

<div align="center">
    <img src="sequencer.jpg" alt="Image Alt Text" width="70%" height="70%" />
    <p><strong>Figure 1 : The Structure of The Sequencer</strong></p>
</div>
&nbsp;
&nbsp;

The sequencer is entitled to order and execute transactions following a First-Come-First-Serve (FCFS) policy.
It gets transactions in two ways, one via peer-to-peer transactions
for Layer-2 transfers and Layer-2 withdrawals and others through Ethereum events for
deposits and Layer-1 withdrawals. Periodically sequencer will get these by listening
to the Layer-1 events. Layer-1 events may consists of events from deposits and events
related to the verification challenge. Both deposits and Layer-2 transactions are
added in the transaction mempool of the sequencer.

As shown in the Figure 1 sequencer will start by creating a transaction batch.
The number of maximum transactions is a parameter which should be decided on
several inputs such as Layer-1 batch size, dispute challenge cost etc. Here we have
set the maximum transactions in a batch to 5 considering the ease of demonstration
but it can be easily changed for any reasonable value. Valid transactions will be
then encoded and compressed. Compressed batch along with other mandatory values
(merkle roots) will be sent to Layer-1.

In a Rollup system we shall assume two ways of sequencer behaviors. Best case
scenario is an honest behavior from the sequencer where the chain rolls without
any hustle. In the worst case, sequencer compromises the chain validity behaving
maliciously.

## An Honest Sequencer
An honest sequencer is a fully functional component which is running with the intent
of giving the best user experience by processing transactions in as safe and timely
manner possible. We assume of a zero down-time or negligible interference with the
operations. As mentioned above sequencer will receive transactions through two ways.
Direct peer-to-peer requests (REST) or via Ethereum events.
In the best case scenario sequencer will batch them as they receive based on the
FCFS policy. Once a transaction request or a deposit event is received, sequencer first
will create a Layer-2 transaction (Type I) with the necessary information including
a timestamp and a unique id. Then this transaction will be added in the mempool
and a concise version of the transaction (Type II) is pushed into the transaction
queue.

As we are assuming an honest sequencer, he will execute transactions in the received
order, generate correct merkle roots demonstrating the complete world state and then
append it to the state commitment chain in Ethereum. Once the transaction batch is
submitted in the layer-1, it enters the challenge period. Over this period verifiers all
allowed to challenge the purity of the block. Since our sequencer is acting honestly,
no verifier would challenge it. And consequently batch will get finalized in Layer-1
allowing secure fund withdrawals.

## A Malicious Sequencer
In a malicious scenario, sequencer would likely be trying to manipulate the world
state of the Layer-2 or prevent users from using the blockchain by censoring their
transactions. In this work we only try to answer the first case and for the latter, we
make an assumption on the honesty from the sequencer on censorship.
Assume a malicious sequencer submits a faulty batch in the Layer-1. Then the
verifiers start verification against the batch and corresponding merkle roots (state
root, transaction root etc.). Verifier will ask the sequencer for the pre-state-map,
which is the world state before the transaction batch is executed. Accordingly, verifier
will execute transactions and get into a conclusion on the malicious batch.
Eventually, verifier will challenge the batch which will end up on the verifier’s
favor. Here sequencer will loose its fidelity bond and state commitment chain will be
rearranged.