import random,os
import numpy as np
from numpy.random.mtrand import choice
randnum = np.random.randint(100)+1
retmsg = ['less than','more than','correct']
guess = 0
waverguess = 50
numguess = 0
guesses = set()
guessset = set(range(1,101))
def guessNum(num):
    hold = (np.sign(num-randnum)+1)/2
    if(hold == 0.5):
        return 2
    else:
        return hold

guess = 50
while (guessNum(guess) != 2):
    guesses.add(guess)
    hold = guessNum(guess)
    if(hold < 0.5):
        waverguess = waverguess*1.5
        for i in range(1,guess+1):
            guesses.add(i)
    if(hold > 0.5):
        waverguess = waverguess/2
        for i in range(guess,101):
            guesses.add(i)
    os.system("clear")
    numguess += 1
    guess = random.choice(list(guessset.difference(guesses)))
    print(guessset.difference(guesses),numguess,randnum,waverguess)