import os,re
items = os.popen('ls').read().split('\n')
regex = [".html$","c"]
terms = []
for i in items:
    cond = True
    for j in regex:
        if re.search(j,i) is None:
            cond = False
    if cond:
        terms.append(os.path.join(os.path.dirname(__file__),i))
print(terms)
