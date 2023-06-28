# The Verifier
In contrast to the Zero-Knowledge Rollups, Optimistic Rollups assume the “state”
submitted by the sequencer is correctly executed unless challenged. Therefore in
order to maintain optimal system performance, participants are expected to alarm
the malevolence of the sequencer. These participants of the system who are assigned
with this task are called **“Verifiers”**.

One of the main assumptions, we made in an Optimistic Rollup system is the
availability of a “single verifier” who act for the integrity of the Rollup. As in a
Layer-1 (Ethereum etc.) blockchain, they are incentivized for the correct verification
on the state commitment chain.

Even though this work is based on a centralized sequencer, our architecture enables
multiple verifiers to actively challenge and interact with the layer-1 bridge contract.

&nbsp;
&nbsp;

<div align="center">
    <img src="verifier.jpg" alt="Image Alt Text" width="70%" height="70%" />
    <p><strong>Figure 1 : The Verification Process</strong></p>
</div>
&nbsp;
&nbsp;


## Verification Process
The primary task of a Verifier is to listen on the events from Ethereum bridge contract.
When the sequencer successfully append a sequenced batch in the state commitment
chain, bridge contract will emit an event notifying the update on the chain. Verifiers
who are being triggered by this event then retrieve the “calldata” related to this
append call from Ethereum. This extracted data includes compressed transaction
batch, pre-state root, post-state root, transaction batch root and the batch index.
The task of the verifier is to attest the post-state submitted by the sequencer. This
is executed by generating the Merkle state root over the post-world state, which is
the resultant of executing the transaction batch upon the pre-world state.
Verification process starts with the transaction batch decoding. In the sequencing
process, sequencer encode the transaction data and then compress it. The verifier
then decompresses the compressed transaction batch and decode before re-execution.
After the raw transaction batch is reconstructed, verifier shall start the execution
process.

Before the execution, verifier has to validate the precision of the pre-state and the
transaction batch. Accordingly verifier compute the merkle root for the previous
world state and transaction batch then compare them with the values from the
sequencer submission.

After the accuracy of the transaction root and previous world state root are verified,
verifier re-execute the transactions and generate the new post world state root. This
state root should match with the retrieved post state from the sequencer. If any
of the state roots, pre-state, post-state or transaction state is mismatched with the
calculated roots, verifier challenges the batch submitting a **“fraud proof”**.


