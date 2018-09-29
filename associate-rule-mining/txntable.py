from uuid import uuid1

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

	def buildexample(self):
		self.insert(set(["A", "C"]))
		self.insert(set(["A", "B"]))
