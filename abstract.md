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

Rollups come in various flavors, including Optimistic Rollups and Zero-Knowledge
Rollups. Optimistic Rollups assume transaction validity until proven otherwise and
employ fraud proofs for protocol integrity. Zero-Knowledge Rollups utilize advanced
cryptographic techniques for enhanced security and faster finality.

The objective of this thesis is to design and implement an Optimistic Rollup
prototype for a simple payment system. We extensively discuss various aspects of
Optimistic Rollups, including current architectural trends and approaches in the
state-of-the-art. Additionally, we analyze Layer-2 economics, identifying critical cost
factors and associated challenges in the Rollup protocol.

Having presented our Rollup architecture, we delve deeper into the exploration of
data compression techniques utilized in Optimistic Rollups. We perform comprehensive experiments to evaluate the efficacy of our compression mechanism.

Subsequently, we conduct an extensive analysis, focusing on the scalability and
usability aspects of our implementation. This involves comparing key system performance metrics with existing works. Further, we identify the limitations inherent in
our Rollup and propose potential avenues for future research and development.

Finally, the thesis concludes by summarizing the research findings, emphasizing
the contributions and insights gained.

