import os, math,shutil
from datetime import date
path = '/Users/akhily/Documents/projects that i can acsess 2/'
items = os.popen(f'ls "{path}"').read().split('\n')
extensions = []
for i in items:
    if '.' in i:
        extensions.append(i.split('.')[-1].upper())

folders = {
    '/#.':None
}
foldfold = []

for i in extensions:
    folders[i] = []
for i in items:
    if '.' in i:
        folders[i.split('.')[-1].upper()].append(i)
    else:
        foldfold.append(i)
folders.pop('/#.')

for i in folders:
    folders[i].sort()

foldfold = foldfold[:-1]

def sort(arr):
    category = {
    '$$$':None
    }
    for i in arr:
        if not (i[0].upper() in category):
            category[i[0].upper()] = []
        category[i[0].upper()].append(i)
    category.pop('$$$')
    return category
for i in folders:
    folders[i] = sort(folders[i])
foldfold = sort(foldfold)
dirs = {
    '!@#$%':None
}
today = str(date.today())
os.mkdir(path + today)
os.mkdir(path + '/'.join([today,'FOLDERS']))
for i in foldfold:
    os.mkdir(path + '/'.join([today,'FOLDERS',i]))
    for j in foldfold[i]:
        os.rename(path + j,path + '/'.join([today,'FOLDERS',i,j]))
for i in folders:
    os.mkdir(path + '/'.join([today,i]))
    for j in folders[i]:
        os.mkdir(path + '/'.join([today,i,j]))
        for k in folders[i][j]:
            os.rename(path + k, path + '/'.join([today,i,j,k]))