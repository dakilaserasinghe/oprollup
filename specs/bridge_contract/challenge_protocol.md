# Dispute Resolution Protocol
In this work we implement a single-round non interactive dispute resolution protocol.
The high level breakdown of the protocol shown in Algorithm 1 shall be decomposed
into three main phases.

Firstly, a challenge should fulfill several properties to successfully contest a malicious
batch. The challenger should submit enough collateral set by the protocol, the
intended malicious batch should not have exceeded the challenge period and submitted
transaction batch should resemble the same hash value in the SCC. These checks will
be executed in the phase 1 of the challenge protocol.
The second phase is dedicated to data decompression. We use puff decompression
algorithm to decompress data. Here, the data decompression results in UTF-8
format. This is converted back to a hex stream before the Application Binary Interface
(ABI) decode.

In the third and final phase, transaction batch is re-executed to examine the correct
world state of the batch. This process begins by validating the transaction root,
ensuring that the generated transaction root aligns with the corresponding batch in
the SCC. Subsequently, the pre-state root is examined to confirm its correctness.

Finally the post-state root is generated after executing all transactions in the
decompressed batch. If an error detected in the process, necessary bridge contract
properties, such as “reBatching”, “batchId” will be changed appropriately. By setting
“reBatching”, it will stall all bridge calls both from users and sequencer, until the next
valid batch append. And “batchId” will be updated with the malicious batch id in
the context, which is expected to be re-batched in the next batch append call.
Consequently, all batches submitted after the contested batch, are revoked 
reordering the SCC. Then the protocol ends by slashing the malicious party and
rewarding the winner. Half of the perpetrator’s bond will be slashed and the other
half becomes the incentive for the winner.

&nbsp;
&nbsp;

<div align="center">
    <img src="protocol.PNG" alt="Image Alt Text" width="50%" height="50%" />
    <p><strong>Algorithm 1 Dispute Resolution Protocol</strong></p>
</div>

&nbsp;
&nbsp;

&nbsp;
&nbsp;

<div align="center">
    <img src="protocol_simplified.jpg" alt="Image Alt Text" width="50%" height="50%" />
    <p><strong> Dispute Resolution Protocol (Simplfied View) </strong></p>
</div>

&nbsp;
&nbsp;

## Rationale for Burning a Percentage of the Fidelity Bond
A percentage of the fidelity bond is burned without rewarding the whole amount
as an incentive to the winner. This mechanism discourages malicious sequencers by
“frountrunning” the protocol. In an optimistic case for a malicious party, he could
challenge his own fraudulent batch in the canonical chain.
This will allow him to win the challenge and not to loss any collateral except the
“frountruning” cost. To mitigate this vulnerability, protocol will slash substantial
amount (here 50%) of the bond discouraging such attacks by the sequencer.
