###############################################################################
# Apriori facilitates finding out frequent itemsets by reducing number of
# candidates, that is to prune superstes of infrequent itemsets. Implementation
# below omits checking confidence
#
###############################################################################

from copy import deepcopy
from txntable import txntable

def selfjoin(candidates):
	nextcandidates = list()
	nextlen = len(candidates[0]) + 1
	for c1 in candidates:
		for c2 in candidates:
			nextc = c1.union(c2)
			if len(nextc) == nextlen and nextc not in nextcandidates:
				nextcandidates.append(nextc)

	return nextcandidates

def filtersupcnt(txntable, candidates, minsupcnt):
	return list(filter(lambda itemset : txntable.getsupcnt(itemset) >= minsupcnt, candidates))

def prune(candidates, freqsets):

	if len(candidates[0]) <= 2: # no need to check C2
		return candidates

	pruned = list()

	for candidate in candidates:

		_candidate = deepcopy(candidate)
		prunable = False

		for itmrmv in candidate:
			_candidate.remove(itmrmv)
			for freqset in freqsets:
				if freqset == _candidate:
					break
			else:
				prunable = True
				break
			_candidate.add(itmrmv)

		if not prunable:
			pruned.append(candidate)

	return pruned

def apriori(txntable, minsupcnt, minconf):

	candidates = [set(item) for item in txntable.getitems()]
	kfreqsets = []
	freqsets = []

	while len(candidates) > 0:

		# prune
		candidates = prune(candidates, kfreqsets)

		# check support
		candidates = filtersupcnt(txntable, candidates, minsupcnt)

		# update freqsets
		kfreqsets = candidates
		freqsets += kfreqsets

		# selfjoin
		candidates = selfjoin(candidates)

	return freqsets

if __name__ == "__main__":

	transactions = txntable().example()

	print(apriori(transactions, 2, 0))