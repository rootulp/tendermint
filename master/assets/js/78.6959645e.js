(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{644:function(t,e,a){"use strict";a.r(e);var s=a(1),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"adr-004-historical-validators"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adr-004-historical-validators"}},[t._v("#")]),t._v(" ADR 004: Historical Validators")]),t._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[t._v("#")]),t._v(" Context")]),t._v(" "),a("p",[t._v("Right now, we can query the present validator set, but there is no history.\nIf you were offline for a long time, there is no way to reconstruct past validators. This is needed for the light client and we agreed needs enhancement of the API.")]),t._v(" "),a("h2",{attrs:{id:"decision"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[t._v("#")]),t._v(" Decision")]),t._v(" "),a("p",[t._v("For every block, store a new structure that contains either the latest validator set,\nor the height of the last block for which the validator set changed. Note this is not\nthe height of the block which returned the validator set change itself, but the next block,\nie. the first block it comes into effect for.")]),t._v(" "),a("p",[t._v("Storing the validators will be handled by the "),a("code",[t._v("state")]),t._v(" package.")]),t._v(" "),a("p",[t._v("At some point in the future, we may consider more efficient storage in the case where the validators\nare updated frequently - for instance by only saving the diffs, rather than the whole set.")]),t._v(" "),a("p",[t._v("An alternative approach suggested keeping the validator set, or diffs of it, in a merkle IAVL tree.\nWhile it might afford cheaper proofs that a validator set has not changed, it would be more complex,\nand likely less efficient.")]),t._v(" "),a("h2",{attrs:{id:"status"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[t._v("#")]),t._v(" Status")]),t._v(" "),a("p",[t._v("Implemented")]),t._v(" "),a("h2",{attrs:{id:"consequences"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[t._v("#")]),t._v(" Consequences")]),t._v(" "),a("h3",{attrs:{id:"positive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[t._v("#")]),t._v(" Positive")]),t._v(" "),a("ul",[a("li",[t._v("Can query old validator sets, with proof.")])]),t._v(" "),a("h3",{attrs:{id:"negative"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[t._v("#")]),t._v(" Negative")]),t._v(" "),a("ul",[a("li",[t._v("Writes an extra structure to disk with every block.")])]),t._v(" "),a("h3",{attrs:{id:"neutral"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[t._v("#")]),t._v(" Neutral")])])}),[],!1,null,null,null);e.default=r.exports}}]);