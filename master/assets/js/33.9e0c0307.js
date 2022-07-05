(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{574:function(e,t,a){e.exports=a.p+"assets/img/mempool-v0.dfa44159.jpeg"},698:function(e,t,a){"use strict";a.r(t);var o=a(1),n=Object(o.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"adr-067-mempool-refactor"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#adr-067-mempool-refactor"}},[e._v("#")]),e._v(" ADR 067: Mempool Refactor")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"#adr-067-mempool-refactor"}},[e._v("ADR 067: Mempool Refactor")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"#changelog"}},[e._v("Changelog")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#status"}},[e._v("Status")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#context"}},[e._v("Context")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"#current-design"}},[e._v("Current Design")])])])]),e._v(" "),o("li",[o("a",{attrs:{href:"#alternative-approaches"}},[e._v("Alternative Approaches")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#prior-art"}},[e._v("Prior Art")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"#ethereum"}},[e._v("Ethereum")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#diem"}},[e._v("Diem")])])])]),e._v(" "),o("li",[o("a",{attrs:{href:"#decision"}},[e._v("Decision")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#detailed-design"}},[e._v("Detailed Design")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"#checktx"}},[e._v("CheckTx")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#mempool"}},[e._v("Mempool")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#eviction"}},[e._v("Eviction")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#gossiping"}},[e._v("Gossiping")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#performance"}},[e._v("Performance")])])])]),e._v(" "),o("li",[o("a",{attrs:{href:"#future-improvements"}},[e._v("Future Improvements")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#consequences"}},[e._v("Consequences")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"#positive"}},[e._v("Positive")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#negative"}},[e._v("Negative")])]),e._v(" "),o("li",[o("a",{attrs:{href:"#neutral"}},[e._v("Neutral")])])])]),e._v(" "),o("li",[o("a",{attrs:{href:"#references"}},[e._v("References")])])])])]),e._v(" "),o("h2",{attrs:{id:"changelog"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),o("ul",[o("li",[e._v("April 19, 2021: Initial Draft (@alexanderbez)")])]),e._v(" "),o("h2",{attrs:{id:"status"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),o("p",[e._v("Accepted")]),e._v(" "),o("h2",{attrs:{id:"context"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),o("p",[e._v("Tendermint Core has a reactor and data structure, mempool, that facilitates the\nephemeral storage of uncommitted transactions. Honest nodes participating in a\nTendermint network gossip these uncommitted transactions to each other if they\npass the application's "),o("code",[e._v("CheckTx")]),e._v(". In addition, block proposers select from the\nmempool a subset of uncommitted transactions to include in the next block.")]),e._v(" "),o("p",[e._v("Currently, the mempool in Tendermint Core is designed as a FIFO queue. In other\nwords, transactions are included in blocks as they are received by a node. There\ncurrently is no explicit and prioritized ordering of these uncommitted transactions.\nThis presents a few technical and UX challenges for operators and applications.")]),e._v(" "),o("p",[e._v("Namely, validators are not able to prioritize transactions by their fees or any\nincentive aligned mechanism. In addition, the lack of prioritization also leads\nto cascading effects in terms of DoS and various attack vectors on networks,\ne.g. "),o("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/discussions/8224",target:"_blank",rel:"noopener noreferrer"}},[e._v("cosmos/cosmos-sdk#8224"),o("OutboundLink")],1),e._v(".")]),e._v(" "),o("p",[e._v("Thus, Tendermint Core needs the ability for an application and its users to\nprioritize transactions in a flexible and performant manner. Specifically, we're\naiming to either improve, maintain or add the following properties in the\nTendermint mempool:")]),e._v(" "),o("ul",[o("li",[e._v("Allow application-determined transaction priority.")]),e._v(" "),o("li",[e._v("Allow efficient concurrent reads and writes.")]),e._v(" "),o("li",[e._v("Allow block proposers to reap transactions efficiently by priority.")]),e._v(" "),o("li",[e._v("Maintain a fixed mempool capacity by transaction size and evict lower priority\ntransactions to make room for higher priority transactions.")]),e._v(" "),o("li",[e._v("Allow transactions to be gossiped by priority efficiently.")]),e._v(" "),o("li",[e._v("Allow operators to specify a maximum TTL for transactions in the mempool before\nthey're automatically evicted if not selected for a block proposal in time.")]),e._v(" "),o("li",[e._v("Ensure the design allows for future extensions, such as replace-by-priority and\nallowing multiple pending transactions per sender, to be incorporated easily.")])]),e._v(" "),o("p",[e._v("Note, not all of these properties will be addressed by the proposed changes in\nthis ADR. However, this proposal will ensure that any unaddressed properties\ncan be addressed in an easy and extensible manner in the future.")]),e._v(" "),o("h3",{attrs:{id:"current-design"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#current-design"}},[e._v("#")]),e._v(" Current Design")]),e._v(" "),o("p",[o("img",{attrs:{src:a(574),alt:"mempool"}})]),e._v(" "),o("p",[e._v("At the core of the "),o("code",[e._v("v0")]),e._v(" mempool reactor is a concurrent linked-list. This is the\nprimary data structure that contains "),o("code",[e._v("Tx")]),e._v(" objects that have passed "),o("code",[e._v("CheckTx")]),e._v(".\nWhen a node receives a transaction from another peer, it executes "),o("code",[e._v("CheckTx")]),e._v(", which\nobtains a read-lock on the "),o("code",[e._v("*CListMempool")]),e._v(". If the transaction passes "),o("code",[e._v("CheckTx")]),e._v("\nlocally on the node, it is added to the "),o("code",[e._v("*CList")]),e._v(" by obtaining a write-lock. It\nis also added to the "),o("code",[e._v("cache")]),e._v(" and "),o("code",[e._v("txsMap")]),e._v(", both of which obtain their own respective\nwrite-locks and map a reference from the transaction hash to the "),o("code",[e._v("Tx")]),e._v(" itself.")]),e._v(" "),o("p",[e._v("Transactions are continuously gossiped to peers whenever a new transaction is added\nto a local node's "),o("code",[e._v("*CList")]),e._v(", where the node at the front of the "),o("code",[e._v("*CList")]),e._v(" is selected.\nAnother transaction will not be gossiped until the "),o("code",[e._v("*CList")]),e._v(" notifies the reader\nthat there are more transactions to gossip.")]),e._v(" "),o("p",[e._v("When a proposer attempts to propose a block, they will execute "),o("code",[e._v("ReapMaxBytesMaxGas")]),e._v("\non the reactor's "),o("code",[e._v("*CListMempool")]),e._v(". This call obtains a read-lock on the "),o("code",[e._v("*CListMempool")]),e._v("\nand selects as many transactions as possible starting from the front of the "),o("code",[e._v("*CList")]),e._v("\nmoving to the back of the list.")]),e._v(" "),o("p",[e._v("When a block is finally committed, a caller invokes "),o("code",[e._v("Update")]),e._v(" on the reactor's\n"),o("code",[e._v("*CListMempool")]),e._v(" with all the selected transactions. Note, the caller must also\nexplicitly obtain a write-lock on the reactor's "),o("code",[e._v("*CListMempool")]),e._v(". This call\nwill remove all the supplied transactions from the "),o("code",[e._v("txsMap")]),e._v(" and the "),o("code",[e._v("*CList")]),e._v(", both\nof which obtain their own respective write-locks. In addition, the transaction\nmay also be removed from the "),o("code",[e._v("cache")]),e._v(" which obtains it's own write-lock.")]),e._v(" "),o("h2",{attrs:{id:"alternative-approaches"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#alternative-approaches"}},[e._v("#")]),e._v(" Alternative Approaches")]),e._v(" "),o("p",[e._v("When considering which approach to take for a priority-based flexible and\nperformant mempool, there are two core candidates. The first candidate is less\ninvasive in the required  set of protocol and implementation changes, which\nsimply extends the existing "),o("code",[e._v("CheckTx")]),e._v(" ABCI method. The second candidate essentially\ninvolves the introduction of new ABCI method(s) and would require a higher degree\nof complexity in protocol and implementation changes, some of which may either\noverlap or conflict with the upcoming introduction of "),o("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/docs/rfc/rfc-013-abci%2B%2B.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("ABCI++"),o("OutboundLink")],1),e._v(".")]),e._v(" "),o("p",[e._v("For more information on the various approaches and proposals, please see the\n"),o("a",{attrs:{href:"https://github.com/tendermint/tendermint/discussions/6295",target:"_blank",rel:"noopener noreferrer"}},[e._v("mempool discussion"),o("OutboundLink")],1),e._v(".")]),e._v(" "),o("h2",{attrs:{id:"prior-art"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#prior-art"}},[e._v("#")]),e._v(" Prior Art")]),e._v(" "),o("h3",{attrs:{id:"ethereum"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#ethereum"}},[e._v("#")]),e._v(" Ethereum")]),e._v(" "),o("p",[e._v("The Ethereum mempool, specifically "),o("a",{attrs:{href:"https://github.com/ethereum/go-ethereum",target:"_blank",rel:"noopener noreferrer"}},[e._v("Geth"),o("OutboundLink")],1),e._v(",\ncontains a mempool, "),o("code",[e._v("*TxPool")]),e._v(", that contains various mappings indexed by account,\nsuch as a "),o("code",[e._v("pending")]),e._v(" which contains all processable transactions for accounts\nprioritized by nonce. It also contains a "),o("code",[e._v("queue")]),e._v(" which is the exact same mapping\nexcept it contains not currently processable transactions. The mempool also\ncontains a "),o("code",[e._v("priced")]),e._v(" index of type "),o("code",[e._v("*txPricedList")]),e._v(" that is a priority queue based\non transaction price.")]),e._v(" "),o("h3",{attrs:{id:"diem"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#diem"}},[e._v("#")]),e._v(" Diem")]),e._v(" "),o("p",[e._v("The "),o("a",{attrs:{href:"https://github.com/diem/diem/blob/master/mempool/README.md#implementation-details",target:"_blank",rel:"noopener noreferrer"}},[e._v("Diem mempool"),o("OutboundLink")],1),e._v("\ncontains a similar approach to the one we propose. Specifically, the Diem mempool\ncontains a mapping from "),o("code",[e._v("Account:[]Tx")]),e._v(". On top of this primary mapping from account\nto a list of transactions, are various indexes used to perform certain actions.")]),e._v(" "),o("p",[e._v("The main index, "),o("code",[e._v("PriorityIndex")]),e._v(". is an ordered queue of transactions that are\n“consensus-ready” (i.e., they have a sequence number which is sequential to the\ncurrent sequence number for the account). This queue is ordered by gas price so\nthat if a client is willing to pay more (than other clients) per unit of\nexecution, then they can enter consensus earlier.")]),e._v(" "),o("h2",{attrs:{id:"decision"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),o("p",[e._v("To incorporate a priority-based flexible and performant mempool in Tendermint Core,\nwe will introduce new fields, "),o("code",[e._v("priority")]),e._v(" and "),o("code",[e._v("sender")]),e._v(", into the "),o("code",[e._v("ResponseCheckTx")]),e._v("\ntype.")]),e._v(" "),o("p",[e._v("We will introduce a new versioned mempool reactor, "),o("code",[e._v("v1")]),e._v(" and assume an implicit\nversion of the current mempool reactor as "),o("code",[e._v("v0")]),e._v(". In the new "),o("code",[e._v("v1")]),e._v(" mempool reactor,\nwe largely keep the functionality the same as "),o("code",[e._v("v0")]),e._v(" except we augment the underlying\ndata structures. Specifically, we keep a mapping of senders to transaction objects.\nOn top of this mapping, we index transactions to provide the ability to efficiently\ngossip and reap transactions by priority.")]),e._v(" "),o("h2",{attrs:{id:"detailed-design"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#detailed-design"}},[e._v("#")]),e._v(" Detailed Design")]),e._v(" "),o("h3",{attrs:{id:"checktx"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#checktx"}},[e._v("#")]),e._v(" CheckTx")]),e._v(" "),o("p",[e._v("We introduce the following new fields into the "),o("code",[e._v("ResponseCheckTx")]),e._v(" type:")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"diff",base64:"bWVzc2FnZSBSZXNwb25zZUNoZWNrVHggewogIHVpbnQzMiAgICAgICAgIGNvZGUgICAgICAgPSAxOwogIGJ5dGVzICAgICAgICAgIGRhdGEgICAgICAgPSAyOwogIHN0cmluZyAgICAgICAgIGxvZyAgICAgICAgPSAzOyAgLy8gbm9uZGV0ZXJtaW5pc3RpYwogIHN0cmluZyAgICAgICAgIGluZm8gICAgICAgPSA0OyAgLy8gbm9uZGV0ZXJtaW5pc3RpYwogIGludDY0ICAgICAgICAgIGdhc193YW50ZWQgPSA1IFtqc29uX25hbWUgPSAmcXVvdDtnYXNfd2FudGVkJnF1b3Q7XTsKICBpbnQ2NCAgICAgICAgICBnYXNfdXNlZCAgID0gNiBbanNvbl9uYW1lID0gJnF1b3Q7Z2FzX3VzZWQmcXVvdDtdOwogIHJlcGVhdGVkIEV2ZW50IGV2ZW50cyAgICAgPSA3IFsoZ29nb3Byb3RvLm51bGxhYmxlKSA9IGZhbHNlLCAoZ29nb3Byb3RvLmpzb250YWcpID0gJnF1b3Q7ZXZlbnRzLG9taXRlbXB0eSZxdW90O107CiAgc3RyaW5nICAgICAgICAgY29kZXNwYWNlICA9IDg7CisgaW50NjQgICAgICAgICAgcHJpb3JpdHkgICA9IDk7Cisgc3RyaW5nICAgICAgICAgc2VuZGVyICAgICA9IDEwOwp9Cg=="}}),e._v(" "),o("p",[e._v("It is entirely up the application in determining how these fields are populated\nand with what values, e.g. the "),o("code",[e._v("sender")]),e._v(" could be the signer and fee payer\nof the transaction, the "),o("code",[e._v("priority")]),e._v(" could be the cumulative sum of the fee(s).")]),e._v(" "),o("p",[e._v("Only "),o("code",[e._v("sender")]),e._v(" is required, while "),o("code",[e._v("priority")]),e._v(" can be omitted which would result in\nusing the default value of zero.")]),e._v(" "),o("h3",{attrs:{id:"mempool"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#mempool"}},[e._v("#")]),e._v(" Mempool")]),e._v(" "),o("p",[e._v("The existing concurrent-safe linked-list will be replaced by a thread-safe map\nof "),o("code",[e._v("<sender:*Tx>")]),e._v(", i.e a mapping from "),o("code",[e._v("sender")]),e._v(" to a single "),o("code",[e._v("*Tx")]),e._v(" object, where\neach "),o("code",[e._v("*Tx")]),e._v(" is the next valid and processable transaction from the given "),o("code",[e._v("sender")]),e._v(".")]),e._v(" "),o("p",[e._v("On top of this mapping, we index all transactions by priority using a thread-safe\npriority queue, i.e. a "),o("a",{attrs:{href:"https://en.wikipedia.org/wiki/Min-max_heap",target:"_blank",rel:"noopener noreferrer"}},[e._v("max heap"),o("OutboundLink")],1),e._v(".\nWhen a proposer is ready to select transactions for the next block proposal,\ntransactions are selected from this priority index by highest priority order.\nWhen a transaction is selected and reaped, it is removed from this index and\nfrom the "),o("code",[e._v("<sender:*Tx>")]),e._v(" mapping.")]),e._v(" "),o("p",[e._v("We define "),o("code",[e._v("Tx")]),e._v(" as the following data structure:")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBUeCBzdHJ1Y3QgewogIC8vIFR4IHJlcHJlc2VudHMgdGhlIHJhdyBiaW5hcnkgdHJhbnNhY3Rpb24gZGF0YS4KICBUeCBbXWJ5dGUKCiAgLy8gUHJpb3JpdHkgZGVmaW5lcyB0aGUgdHJhbnNhY3Rpb24ncyBwcmlvcml0eSBhcyBzcGVjaWZpZWQgYnkgdGhlIGFwcGxpY2F0aW9uCiAgLy8gaW4gdGhlIFJlc3BvbnNlQ2hlY2tUeCByZXNwb25zZS4KICBQcmlvcml0eSBpbnQ2NAoKICAvLyBTZW5kZXIgZGVmaW5lcyB0aGUgdHJhbnNhY3Rpb24ncyBzZW5kZXIgYXMgc3BlY2lmaWVkIGJ5IHRoZSBhcHBsaWNhdGlvbiBpbgogIC8vIHRoZSBSZXNwb25zZUNoZWNrVHggcmVzcG9uc2UuCiAgU2VuZGVyIHN0cmluZwoKICAvLyBJbmRleCBkZWZpbmVzIHRoZSBjdXJyZW50IGluZGV4IGluIHRoZSBwcmlvcml0eSBxdWV1ZSBpbmRleC4gTm90ZSwgaWYKICAvLyBtdWx0aXBsZSBUeCBpbmRleGVzIGFyZSBuZWVkZWQsIHRoaXMgZmllbGQgd2lsbCBiZSByZW1vdmVkIGFuZCBlYWNoIFR4CiAgLy8gaW5kZXggd2lsbCBoYXZlIGl0cyBvd24gd3JhcHBlZCBUeCB0eXBlLgogIEluZGV4IGludAp9Cg=="}}),e._v(" "),o("h3",{attrs:{id:"eviction"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#eviction"}},[e._v("#")]),e._v(" Eviction")]),e._v(" "),o("p",[e._v("Upon successfully executing "),o("code",[e._v("CheckTx")]),e._v(" for a new "),o("code",[e._v("Tx")]),e._v(" and the mempool is currently\nfull, we must check if there exists a "),o("code",[e._v("Tx")]),e._v(" of lower priority that can be evicted\nto make room for the new "),o("code",[e._v("Tx")]),e._v(" with higher priority and with sufficient size\ncapacity left.")]),e._v(" "),o("p",[e._v("If such a "),o("code",[e._v("Tx")]),e._v(" exists, we find it by obtaining a read lock and sorting the\npriority queue index. Once sorted, we find the first "),o("code",[e._v("Tx")]),e._v(" with lower priority and\nsize such that the new "),o("code",[e._v("Tx")]),e._v(" would fit within the mempool's size limit. We then\nremove this "),o("code",[e._v("Tx")]),e._v(" from the priority queue index as well as the "),o("code",[e._v("<sender:*Tx>")]),e._v("\nmapping.")]),e._v(" "),o("p",[e._v("This will require additional "),o("code",[e._v("O(n)")]),e._v(" space and "),o("code",[e._v("O(n*log(n))")]),e._v(" runtime complexity. Note that the space complexity does not depend on the size of the tx.")]),e._v(" "),o("h3",{attrs:{id:"gossiping"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#gossiping"}},[e._v("#")]),e._v(" Gossiping")]),e._v(" "),o("p",[e._v("We keep the existing thread-safe linked list as an additional index. Using this\nindex, we can efficiently gossip transactions in the same manner as they are\ngossiped now (FIFO).")]),e._v(" "),o("p",[e._v("Gossiping transactions will not require locking any other indexes.")]),e._v(" "),o("h3",{attrs:{id:"performance"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#performance"}},[e._v("#")]),e._v(" Performance")]),e._v(" "),o("p",[e._v("Performance should largely remain unaffected apart from the space overhead of\nkeeping an additional priority queue index and the case where we need to evict\ntransactions from the priority queue index. There should be no reads which\nblock writes on any index")]),e._v(" "),o("h2",{attrs:{id:"future-improvements"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#future-improvements"}},[e._v("#")]),e._v(" Future Improvements")]),e._v(" "),o("p",[e._v("There are a few considerable ways in which the proposed design can be improved or\nexpanded upon. Namely, transaction gossiping and for the ability to support\nmultiple transactions from the same "),o("code",[e._v("sender")]),e._v(".")]),e._v(" "),o("p",[e._v("With regards to transaction gossiping, we need empirically validate whether we\nneed to gossip by priority. In addition, the current method of gossiping may not\nbe the most efficient. Specifically, broadcasting all the transactions a node\nhas in it's mempool to it's peers. Rather, we should explore for the ability to\ngossip transactions on a request/response basis similar to Ethereum and other\nprotocols. Not only does this reduce bandwidth and complexity, but also allows\nfor us to explore gossiping by priority or other dimensions more efficiently.")]),e._v(" "),o("p",[e._v("Allowing for multiple transactions from the same "),o("code",[e._v("sender")]),e._v(" is important and will\nmost likely be a needed feature in the future development of the mempool, but for\nnow it suffices to have the preliminary design agreed upon. Having the ability\nto support multiple transactions per "),o("code",[e._v("sender")]),e._v(" will require careful thought with\nregards to the interplay of the corresponding ABCI application. Regardless, the\nproposed design should allow for adaptations to support this feature in a\nnon-contentious and backwards compatible manner.")]),e._v(" "),o("h2",{attrs:{id:"consequences"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),o("h3",{attrs:{id:"positive"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),o("ul",[o("li",[e._v("Transactions are allowed to be prioritized by the application.")])]),e._v(" "),o("h3",{attrs:{id:"negative"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),o("ul",[o("li",[e._v("Increased size of the "),o("code",[e._v("ResponseCheckTx")]),e._v(" Protocol Buffer type.")]),e._v(" "),o("li",[e._v("Causal ordering is NOT maintained.\n"),o("ul",[o("li",[e._v("It is possible that certain transactions broadcasted in a particular order may\npass "),o("code",[e._v("CheckTx")]),e._v(" but not end up being committed in a block because they fail\n"),o("code",[e._v("CheckTx")]),e._v(" later. e.g. Consider Tx"),o("sub",[e._v("1")]),e._v(" that sends funds from existing\naccount Alice to a "),o("em",[e._v("new")]),e._v(" account Bob with priority P"),o("sub",[e._v("1")]),e._v(" and then later\nBob's "),o("em",[e._v("new")]),e._v(" account sends funds back to Alice in Tx"),o("sub",[e._v("2")]),e._v(" with P"),o("sub",[e._v("2")]),e._v(",\nsuch that P"),o("sub",[e._v("2")]),e._v(" > P"),o("sub",[e._v("1")]),e._v(". If executed in this order, both\ntransactions will pass "),o("code",[e._v("CheckTx")]),e._v(". However, when a proposer is ready to select\ntransactions for the next block proposal, they will select Tx"),o("sub",[e._v("2")]),e._v(" before\nTx"),o("sub",[e._v("1")]),e._v(" and thus Tx"),o("sub",[e._v("2")]),e._v(" will "),o("em",[e._v("fail")]),e._v(" because Tx"),o("sub",[e._v("1")]),e._v(" must\nbe executed first. This is because there is a "),o("em",[e._v("causal ordering")]),e._v(",\nTx"),o("sub",[e._v("1")]),e._v(" ➝ Tx"),o("sub",[e._v("2")]),e._v('. These types of situations should be rare as\nmost transactions are not causally ordered and can be circumvented by simply\ntrying again at a later point in time or by ensuring the "child" priority is\nlower than the "parent" priority. In other words, if parents always have\npriories that are higher than their children, then the new mempool design will\nmaintain causal ordering.')])])])]),e._v(" "),o("h3",{attrs:{id:"neutral"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),o("ul",[o("li",[e._v("A transaction that passed "),o("code",[e._v("CheckTx")]),e._v(" and entered the mempool can later be evicted\nat a future point in time if a higher priority transaction entered while the\nmempool was full.")])]),e._v(" "),o("h2",{attrs:{id:"references"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/docs/rfc/rfc-013-abci%2B%2B.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("ABCI++"),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://github.com/tendermint/tendermint/discussions/6295",target:"_blank",rel:"noopener noreferrer"}},[e._v("Mempool Discussion"),o("OutboundLink")],1)])])],1)}),[],!1,null,null,null);t.default=n.exports}}]);