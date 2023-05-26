# Abstract

As the popularity of blockchain technology grows, the demand for efficient and
scalable solutions becomes more apparent. Layer-1 blockchains frequently encounter
difficulties in managing a large number of transactions, leading to higher fees and
longer processing times. These challenges have hindered the ability of blockchains to
deliver efficient user experiences and achieve widespread adoption.

Various solutions have emerged to address scalability issues in Layer-1 blockchains,
with Rollups being a prominent contender. Rollups provide a Layer-2 scaling solution that complements blockchain infrastructure by introducing additional layers or
protocols. They aim to enhance transaction throughput and lower costs by leveraging off-chain computations. This approach lightens the load on the parent chain,
improving scalability while maintaining decentralization and security.

Rollups come in different flavors, with Optimistic Rollups and Zero-Knowledge
Rollups being the primary realizations. Optimistic Rollups operate on the assumption
that transactions are valid until proven wrong and rely on fraud proofs to ensure
the integrity of the protocol. And Zero-Knowledge Rollups incorporate advanced
cryptographic techniques to ensure security and faster finality.

The objective of this thesis is to design and implement an Optimistic Rollup
prototype specifically tailored for a simple payment system. In pursuit of this
objective, we delve into comprehensive discussions on various aspects related to
Optimistic Rollups. We explore the current architectural trends, advantages, and
limitations associated with these solutions.

Additionally, we analyze the economics and transaction cost intricacies of Rollups,
focusing on Layer-2 transaction costs and identifying critical cost factors. Furthermore,
we investigate data compression methods employed in Optimistic Rollups and conduct
experiments to evaluate their effectiveness. By conducting a thorough analysis of the
security properties and associated challenges, we aim to gain deeper insights into the
design considerations of Optimistic Rollups.

Finally, the thesis concludes with a summary of the research findings, highlighting
the contributions, insights and recommendations for a future work.
