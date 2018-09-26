const tree = require("./tree.js");
const Node = tree.Node;

function BFS(rootNode) {

	let open = [rootNode];
	let closed = [];
	printSearchStates(open, closed);
	while (open.length != 0) {
		let children = open[0].children;
		if (children && children.length > 0) {
			open = open.concat(children);
		}
		closed.push(open[0]);
		open.shift();
		printSearchStates(open, closed);
	}
}

function printSearchStates(open, closed) {
	console.log("open: ", open.map(node => node.name));
	console.log("closed: ", closed.map(node => node.name));
	console.log("----------------------------------------");
}

function buildTestTree() {
	const B = new Node("B", null);
	const C = new Node("C", null);
	const D = new Node("D", null);
	const A = new Node("A", [B, C, D]);
	return A;
}

BFS(buildTestTree());