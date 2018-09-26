/*
Backtracking exhaustively tries all paths on a search tree
*/

function Node(name, children) {
	this.name = name;
	this.children = children;
}

function buildTestTree() {
	const H = new Node("H", null);
	const I = new Node("I", null);
	const J = new Node("J", null);
	const E = new Node("E", [H, I]);
	const F = new Node("F", [J]);
	const G = new Node("G", null);
	const B = new Node("B", [E, F]);
	const C = new Node("C", [F, G]);
	const D = new Node("D", null);
	const A = new Node("A", [B, C, D]);
	return A;
}

function backTrack(rootNode) {
	let CS = rootNode;
	let SL = [CS];
	let NSL = [CS];
	let DE = [];
	printSearchStates(CS, SL, NSL, DE);
	while (NSL.length != 0) {
		/**
		 * Check if CS is goal, but here we skip this step
		 */
		let children = CS.children ? CS.children.filter(child => !(SL.includes(child)
			|| NSL.includes(child) || DE.includes(child))) : [];
		if (children.length != 0) {
			NSL = children.concat(NSL);
			CS = NSL[0];
			SL.unshift(CS);
		} else { // leaf node
			while (SL.length > 0 && CS == SL[0]) {
				DE.push(CS);
				SL.shift();
				NSL.shift();
				CS = NSL[0];
			}
			SL.unshift(CS);
		}
		printSearchStates(CS, SL, NSL, DE);
	}
}

function printSearchStates(CS, SL, NSL, DE) {
	if (CS) {
		CS = CS.name;
	} else {
		return;
	}
	if (SL.length > 0) {
		SL = SL.map(s => s.name);
	} else {
		SL = "[]";
	}
	if (NSL.length > 0) {
		NSL = NSL.map(ns => ns.name);
	} else {
		NSL = "[]";
	}
	if (DE.length > 0) {
		DE = DE.map(de => de.name);	
	} else {
		DE = "[]";
	}
	console.log("CS: ", CS);
	console.log("SL: ", SL);
	console.log("NSL: ", NSL);
	console.log("DE: ", DE);
	console.log("----------------------------------------");
}

backTrack(buildTestTree());