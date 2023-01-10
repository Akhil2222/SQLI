

# Fixing random state for reproducibility
import matplotlib.pyplot as plt
import numpy as np
place = ['Mediteranian Avenue',None,'Baltic Avenue',None,'Oriental Avenue','Vermont Avenue',None,'Conneticut Avenue',None,'St. Charles Place',None,'States Avenue','Virginia Avenue',"St. James Place",'Tennessee Avenue',None,'New York Ave',None,'Kentucky Ave',None,'Indiana Ave','Illonois Avenue','Atlantic Ave','Ventnor Avenue',None,'Marvin Gardens',4,'Pacific Ave',None,'North Carolina Ave','Pennsylvania Ave',None,'Park Place',None,'Boardwalk']
cost = {
    'Mediteranian Avenue':6,
    'Baltic Avenue':6,
    'Oriental Avenue':10,
    'Vermont Avenue':10,
    'Conneticut Avenue':12,
    'St. Charles Place':14,
    'States Avenue':14,
    'Virginia Avenue':16,
    "St. James Place":18,
    'Tennessee Avenue':18,
    'New York Ave':20,
    'Kentucky Ave':22,
    'Indiana Ave':22,
    'Illonois Avenue':24,
    'Atlantic Ave':26,
    'Ventnor Avenue':26,
    'Marvin Gardens':28,
    'Pacific Ave':30,
    'North Carolina Ave':30,
    'Pennsylvania Ave':32,
    'Park Place':35,
    'Boardwalk':40
}
colour= ['Black','Brown','Brown','Cyan','Cyan','Cyan','Magenta','Magenta','Magenta','Orange','Orange','Orange','Red','Red',"Red",'Yellow','Yellow','Yellow','Green','Green','Green','Blue','Blue']
scores = {}
othscores = {}
scores['ppp'] = 0
othscores['ppp'] = 0
for i in place:
    if i != 4 and i != None:
        scores[i] = 0
        othscores[i] = 0
print(len(place))
for j in range(1000):
    sum = 0
    for i in range(100):
        die = np.random.randint(2,12)
        sum = sum + die
        sum = sum % len(place)
        if place[sum] == 4:
            sum = 10
        elif place[sum] is not None:
            scores[place[sum]] += cost[place[sum]]
            othscores[place[sum]] += 1
print(scores, othscores,len(scores),len(othscores))
labels = scores.keys()
men_means = scores.values()
women_means = othscores.values()
x = np.arange(len(labels))  # the label locations
width = 0.3  # the width of the bars

fig, ax = plt.subplots()
rects1 = ax.bar(x - width/2, men_means, width, label='Money Made', color=colour)
rects2 = ax.bar(x + width/2, women_means, width, label='Times Landed')

# Add some text for labels, title and custom x-axis tick labels, etc.
ax.set_ylabel('Scores')
ax.set_title('Scores by group and gender')
ax.set_xticks(x)
ax.legend()


ax.bar_label(rects1, padding=0)
ax.bar_label(rects2, padding=0)

fig.tight_layout()

plt.show()
