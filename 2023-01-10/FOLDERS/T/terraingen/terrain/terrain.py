from PIL import Image
import numpy as np,math as Math,random as rand
size = (256,256)
save = Image.new(mode="L", size=size)
img = np.zeros(size)
counter = 0
while 0 in img:
    hold = np.where(img == 0)
    start = np.array([hold[0][0],hold[1][0]])
    counter = (counter + 1) % 8
    img[start[0],start[1]] = 31*counter
    for i in range(256):
        move = [int(Math.cos(Math.pi*rand.randint(0,4)/2)),int(Math.sin(Math.pi*rand.randint(0,4)/2))]
        start += move
        if start[0] < 0 or start[0] > size[0]-1:
            start -= move
            continue
        elif start[1] < 0 or start[1] > size[1]-1:
            start -= move
            continue
        elif img[start[0],start[1]] == 0:
            img[start[0],start[1]] = 30*counter
    run = True
print(img[10,0],img[15,0],img[0,10],img[0,15])
save.putdata(img.flatten())
save.save('terr_new.jpg')