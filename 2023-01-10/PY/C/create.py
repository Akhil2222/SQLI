import os
path = '/Users/akhily/Documents/projects that i can acsess/2023-01-10'
fileName = os.environ['fileName']
fileParts = fileName.split('.')
dirParts = [path,fileParts[1].upper(),fileParts[0][0].upper()]
for i in range(1,len(dirParts)):
    dir = '/'.join(dirParts[0:i])
    folders = os.popen(f'ls "{dir}"').read()
    if folders.find(dirParts[i]) < 0:
        os.mkdir(f'{dir}/{dirParts[i]}')
open('/'.join(dirParts) + '/'+fileName,'x')
