/**
 * Alpha Beta Pruning searches in a DFS manner based on Minimax principle.
 * It foresees branches that are unnecessary to visit and perform ab cut off.
 * The two rules used are (cut-off conditions):
 * 1) MAX's alpha >= any MIN ancestor's beta
 * 2) MIN's beta <= any MAX ancestor's alpha
 */

function ABP(alpha, beta, isMax, rootNode) {
    let v;
    let children = rootNode.children;

    if (!children) {
        return rootNode.heuVal;
    }

    if (isMax) {
        v = -999;
        for (let child of children) {
            v = Math.max(v, ABP(alpha, beta, false, child));
            alpha = Math.max(v, alpha);
            if (alpha >= beta) {
                break;
            }
        }
        return v;
    } else {
        v = 999;
        for (let child of children) {
            v = Math.min(v, ABP(alpha, beta, true, child));
            beta = Math.min(v, beta);
            if (beta <= alpha) {
                break;
            }
        }
        return v;
    }
}