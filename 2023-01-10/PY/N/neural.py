import numpy as np
mnist = open('mnist_test.csv','r').read()
mnist = mnist.split('\n')[1:]
for i in range(len(mnist)):
    hold = mnist[i].split(',')
    
    items = []
    for i in range(28):
        items.append(hold[1:][i*28:(i+1)*28])
    items = np.matrix(items)
    mnist[i] = (hold[0],items.shape)           
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

print(neural([784,16,16,4]))