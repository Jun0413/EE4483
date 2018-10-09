class Node(object):

    def __init__(self, item, supcnt, parent_node=None, children_nodes=None, node_link=None):
        self.item = item
        self.supcnt = supcnt
        self.parent_node = parent_node
        self.children_nodes = children_nodes # list
        self.node_link = node_link # 用来维护头部链表

    def inc_cnt(self, cnt2add=1):
        self.supcnt += cnt2add
    
    def __str__(self):
        return self.item + ': ' + str(self.supcnt)
