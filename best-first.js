/**
 * Best First Search is a heuristic search that
 * expands the most promising node globally.
 */

const tree = require("./tree.js");
const { Node } = tree;

function BFS(rootNode) {

	let open = [rootNode];
	let closed = [];

	while (open.length > 0) {

		let children = open[0].children;

		closed.push(open[0]);
		open.shift();
		
		if (children) {
			/**
			 * By right, we need to check each child node
			 * to see if they appear in closed or open
			 * The rules are:
			 * 1) included in closed: if it is a better
			 * evaluation this time, move it from closed to open
			 * 2) included in open: if it is a better
			 * evaluation this time, update the open heuristics
			 *
			 * Here this step is omitted because we assume each node
			 * has a hard-coded heuristic value
			 */
			children = children.filter(child => !(open.includes(child) || closed.includes(child)))
			open = open.concat(children);
			open.sort((nA, nB) => {
				return nA.heuristic - nB.heuristic;
			});
		}

		printSearchStates(open, closed);
	}
}

function printSearchStates(open, closed) {
	console.log("open: ", open.map(node => node.name));
	console.log("closed: ", closed.map(node => node.name));
	console.log("----------------------------------------");
}

function heuNodeWrapper(name, children, heuristic) {
	let node = new Node(name, children);
	node.heuristic = heuristic;
	return node;
}

/*
 An example from Tutorial 4
 */
function buildTestTree() {
	const L = new heuNodeWrapper("L", null, 3);
	const N = new heuNodeWrapper("N", null, 1);
	const O = new heuNodeWrapper("O", null, 2);
	const M = new heuNodeWrapper("M", [N], 4);
	const F = new heuNodeWrapper("F", [L, M], 9);
	const G = new heuNodeWrapper("G", [N], 6);
	const H = new heuNodeWrapper("H", [N], 5);
	const I = new heuNodeWrapper("I", null, 14);
	const J = new heuNodeWrapper("J", [O], 13);
	const K = new heuNodeWrapper("K", [O], 15);
	const B = new heuNodeWrapper("B", [F, M, G, H], 8);
	const C = new heuNodeWrapper("C", [H, I], 12);
	const D = new heuNodeWrapper("D", [I, J], 10);
	const E = new heuNodeWrapper("E", [O, K], 19);
	const A = new heuNodeWrapper("A", [B, C, D, E], -1);
	return A;
}

BFS(buildTestTree());