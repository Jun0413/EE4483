from uuid import uuid1
from copy import deepcopy

class txntable:

	class __txntable:
		def __init__(self):
			self.table = dict()

	__instance = None

	def __init__(self):
		if not self.__instance:
			self.__instance = self.__txntable()
		else:
			pass

	def __str__(self):
		s = "transaction table\ntxnid:   \titemset\n"
		for k, v in self.__instance.table.items():
			s += k[:5] + "...\t" + str(v) + "\n"
		return s

	def insert(self, itemset):
		try:
			self.__instance.table[uuid1().hex] = itemset
			print("successfully insert into txntable")
		except e:
			print("failed to insert into txntable")
			print(e)

	def clear(self):
		self.__instance.table.clear()

	def getitems(self):
		items = set()
		for key in self.__instance.table.keys():
			items.update(self.__instance.table[key])
		return items

	def getsupcnt(self, itemset):
		supcnt = 0
		if itemset and len(itemset) > 0:
			for key in self.__instance.table.keys():
				if self.__instance.table[key].issuperset(itemset):
					supcnt += 1
		return supcnt
	
	def get_item_supcnt(self, minsup=0):
		item_supcnt = dict()
		for key in self.__instance.table.keys():
			for item in self.__instance.table[key]:
				if item in item_supcnt.keys():
					item_supcnt[item] += 1
				else:
					item_supcnt[item] = 1
		for item in item_supcnt.keys():
			if item_supcnt[item] < minsup:
				del(item_supcnt[item])
		return item_supcnt
	
	def get_table_copy(self):
		return deepcopy(self.__instance.table)

	def example(self):
		transactions = txntable()
		transactions.insert(set(["A", "C", "D"]))
		transactions.insert(set(["B", "C", "E"]))
		transactions.insert(set(["A", "B", "C", "E"]))
		transactions.insert(set(["B", "E"]))
		return transactions
