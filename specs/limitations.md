## Limitations

Our Rollup work has certain limitations that should be acknowledged. These limitations include:

– **Throughput Constraints**: Despite our efforts to optimize the Rollup system,
we have observed limited throughput in comparison to Ethereum’s transaction
processing capabilities. The number of transactions per block and the block
time intervals significantly impact the overall system throughput. We identify
the bottleneck in our Rollup architecture as the sequencer’s dual responsibilities
of sequencing and execution of transactions, coupled with direct user interface
interaction. This arrangement has led to significant performance degradation,
particularly impacting the block time intervals.

– **Centralized Sequencing**: Our Rollup implementation relies on centralized sequencing, 
wherein a central authority or entity is responsible for ordering and
sequencing transactions. This introduces a centralized point of control and can
impact the decentralization and trustlessness of the system.

– **Limited Transparency of Transaction Data**: Another limitation we have identified 
is the inherent trust placed on the transaction data submitted by the
sequencer within the sequenced batch. As the sequencer acts as the sole connection 
point for users, there is a lack of transparency regarding the transaction
data within the network.
The effectiveness of the fraud proof mechanism heavily relies on the accuracy and
completeness of the transactions to successfully recreate the state root. However,
in the event that the transaction batch becomes corrupted or compromised,
verifiers will be unable to submit a correct state root, rendering on-chain
challenges ineffective.

– **Security Considerations**: Our Rollup implementation may have potential security
vulnerabilities, making it susceptible to crypto-economic attacks. It is crucial to
conduct a comprehensive external security audit to identify and address these
vulnerabilities before considering production usage.

– **Lack of an Escape Hatch**: One another notable limitation in our Rollup systems
is the absence of an escape hatch mechanism. An escape hatch serves as a safety
mechanism that allows for exceptional circumstances or emergency situations
to bypass the standard rules and protocols of the Rollup system.
To mitigate this limitation, it is important to explore and design mechanisms
that provide a controlled and secure escape hatch, enabling the system to handle
exceptional cases while maintaining the overall integrity and security of the
Rollup implementation.

– **Lack of Extensive Testing**: Although we have conducted experiments and evaluations, 
there might be scenarios or corner cases that have not been thoroughly
tested. Further testing and analysis are required to uncover potential edge cases
and ensure robustness.

– **Censorship Vulnerability**: Our Rollup implementation has limitations in terms
of robustness against censorship compared to fully decentralized systems. It
is important to note that all production Rollup systems have implemented
measures to mitigate potential censorship by operators, typically by introducing
a transaction inclusion delay in blocks.

– **Time-Constrained Withdrawal Process**: Our Rollup withdrawals depend on
users submitting proof of inclusion for their withdrawal transactions within
a matured batch. However, this approach introduces a level of trust in the
sequencer, as users rely on the provided proof of inclusion. Additionally users
are expected to withdraw their funds within a time period (currently set as
three times the Challenge Period) otherwise funds are lost and not accessible.

– **Fraud Proof Limitation**: Our Rollup system utilizes a single round proof system
for validating the entire block on Layer-1. This is due to our approach on
Rollup architecture as we do not implement a separate Layer-2 blockchain for
the process. However, it is important to note that this approach is considered
outdated and incurs higher costs when compared to the latest approaches in
Optimistic Rollups.

– **Developmental Stage**: Our Rollup implementation should be considered as
a work in progress or at an experimental stage. It may not yet possess the
maturity or stability required for widespread production usage.

It is important to recognize these limitations as they help identify issues in the
design of Rollup systems. By acknowledging these limitations, we can understand the
areas that require improvement and focus our efforts on enhancing the robustness
and efficiency of this Rollup solution. This continuous pursuit of improvement ensures
that we can deliver a more resilient and efficient Rollup system.
