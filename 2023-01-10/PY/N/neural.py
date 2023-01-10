import numpy as np
class neural:
    def __init__(self,layarr):
        c = 0
        self.inputs = layarr
        self.weights = []
        for i in range(len(layarr)-1):
            self.weights.append(np.random.rand(layarr[i],layarr[i+1])*2-1)
    def doit(self,inparr):
        if len(inparr) == self.inputs[0]:
            inp = np.matrix(inparr)
            for i in range(len(self.inputs)-1):
                inp = inp*self.weights[i]
            return inp
def cost(exparr,retarr):
    return sum(abs(np.array(retarr) - np.array(exparr))[0])
networks = []
price = []
for i in range(100):
    networks.append(neural([4,4,2]))
for i in networks:
    costs = []
    for j in range(15):
        arr = []
        for k in str(bin(j))[2:]:
            arr.append(int(k))
        arr = [0]*(4-len(arr)) + arr
        costs.append(cost(neural([4,4,2]).doit(arr),[int(bool(j%3)),int(not bool(j%3))]))
    price.append(sum(costs)/len(costs))
print(price)