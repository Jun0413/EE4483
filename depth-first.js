/**
 * Depth First Search examines descendants of child nodes
 * before their siblings
 */

const tree = require("./tree.js");
const { Node } = tree;

function DFS(rootNode) {

	let open = [rootNode];
	let closed = [];

	printSearchStates(open, closed);

	while (open.length > 0) {

		let children = open[0].children;
		closed.push(open[0]);
		open.shift();

		if (children) {
			open = children.concat(open);
		}

		printSearchStates(open, closed);
	}
}

function printSearchStates(open, closed) {
	console.log("open: ", open.map(node => node.name));
	console.log("closed: ", closed.map(node => node.name));
	console.log("----------------------------------------");
}

function buildTestTree() {
	const H = new Node("H", null);
	const G = new Node("G", null);
	const F = new Node("F", null);
	const E = new Node("E", null);
	const B = new Node("B", [E, F]);
	const C = new Node("C", [G, H]);
	const D = new Node("D", null);
	const A = new Node("A", [B, C, D]);
	return A;
}

DFS(buildTestTree());