from txntable import txntable
from fptreenode import Node

"""test fptreenode.py
t2 = Node('t', 2)
z5 = Node('z', 5, node_link=t2)
t2.inc_cnt()
print(t2)
print(z5)
"""

def create_sample_txns():
    transactions = txntable()
    transactions.insert(set(['r', 'z', 'h', 'j', 'p']))
    transactions.insert(set(['z', 'y', 'x', 'w', 'v', 'u', 't', 's']))
    transactions.insert(set(['z']))
    transactions.insert(set(['r', 'x', 'n', 'o', 's']))
    transactions.insert(set(['y', 'r', 'x', 'z', 'q', 't', 'p']))
    transactions.insert(set(['y', 'z', 'x', 'e', 'q', 's', 't', 'm']))
    return transactions

def update_tree(entry, itemlist, node_links_table):
    node2append = entry
    for item in itemlist:
        isThere = False
        for node in node2append.children_nodes:
            if item == node.item:
                isThere = True
                node2append = node
                node2append.inc_cnt()
                break
        if not isThere:
            newnode = Node(item, 1, parent_node=node2append)
            node_links_table[item].append(newnode)
        
        if node2append.children_nodes is None:
            node2append.children_nodes = []
        node2append.children_nodes.append(newnode)

"""
# get item and their supcnts
item_supcnt = transactions.get_item_supcnt(minsup=minsup)
"""
def create_tree(transactions, minsup):

    # create the fp tree
    entry = Node('null', 1)
    node_links_table = {item: [] for item in item_supcnt.keys()}

    for key, itemset in transactions.get_table_copy().items():
        itemlist = list(itemset)
        itemlist.sort(key=lambda item: item_supcnt[item], reverse=True)
        update_tree(entry, itemlist, node_links_table)
    
    # create node links
    for key in node_links_table.keys():
        node_links_table[key].sort(key=lambda node: node.supcnt, reverse=True)
        prev = None
        for node in node_links_table[key]:
            if prev is not None:
                prev.node_link = node
                prev = node
    
    return entry, node_links_table
    
