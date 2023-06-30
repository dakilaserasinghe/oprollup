## Future Work

As part of a future work, we identify several ways to enhance our implementation as
listed below.


– **Sequence and Execution Separation**: Our Rollup implementation faced a decrease
 in throughput due to the burden of multiple responsibilities on the
sequencer. In line with the latest advancements in Rollup architectures, it is
essential to separate the execution task from the sequencer and delegate it to a
dedicated validator. By separating the execution from the sequencer, we can
significantly improve the throughput of our Rollup system. The sequencer is
no longer encumbered by the execution task, allowing it to focus solely on its
sequencing responsibilities. This separation of duties enhances the efficiency
and performance of the Rollup system, resulting in higher throughput and
improved overall scalability.

– **A Fast low-level Implementation of Protocol**: Initially, we chose to implement the
complete Rollup protocol in JavaScript, considering the ease of implementation.
However, this decision had a significant negative impact on the performance of
our system.
To address this limitation and improve the system’s performance, it is crucial to
transition to a more low-level and efficient implementation using languages such
as Rust, Go, or C++. By leveraging the capabilities and optimizations offered
by these languages, we can achieve higher performance and better utilization of
system resources.

– **A mechanism for Censorship Resistance**: It is important to develop a mechanism
that allows users to submit transactions directly on Layer-1 in the event of a
sequencer failure or explicit censorship. This would provide an additional layer
of security and ensure that users can continue to interact with the system even
in adverse conditions.

– **Trust-minimized and Time-insensitive Withdrawal Process**: Our current withdrawal
 mechanism relies on users submitting proof of inclusion for their withdrawal 
 transactions within a matured batch. However, this approach introduces
a level of trust in the sequencer, as users must rely on the provided proof of
inclusion. This reliance on a trusted system poses potential challenges.
Furthermore, the periodic deletion of state roots from the state commitment
chain creates a time-sensitive withdrawal process. Users face pressure to
withdraw their funds within a specific timeframe, which can be inconvenient
and restrictive.
To overcome these limitations, it is essential to enhance the withdrawal mechanism. 
This can be achieved by introducing a trust-minimized method that
eliminates the need for a second user transaction on Layer-1. By implementing
a more secure and efficient withdrawal process, users can withdraw their funds
without relying on a trusted third party and without being constrained by time
limitations.

– **Trust Removal from Sequenced Transaction Data**: In limitations sections we
discussed the lack of transparency on transactions data submitted by the
sequencer. This has introduced an unnecessary trust on the sequencer. To
address this limitation, it is crucial to explore mechanisms such as decentralized
transaction verification or cryptographic-proofs, that enhance the transparency
and verifiability of the transaction data within the Rollup system.
By introducing measures to validate and cross-check the integrity of the sequencer’s 
transaction data, we can mitigate the risks associated with relying
solely on the sequencer’s submissions, thereby enhancing the overall security
and reliability of the system.

– **An Escape Hatch**: An escape hatch should be implemented to ensure the
security of user funds in the event of an emergency within the Optimistic Rollup
system. This escape hatch would serve as a fail-safe mechanism to protect
user assets in unforeseen circumstances such as protocol vulnerabilities, critical
failures, or external attacks.
By incorporating an escape hatch, users can have peace of mind knowing that
their funds are safeguarded and can be accessed even in the face of emergencies,
further enhancing the overall security and reliability of the Optimistic Rollup
system.