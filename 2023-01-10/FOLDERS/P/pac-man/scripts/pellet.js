var imgsrc = ['img/pellet.png','img/power.png']
var table = $('#power')
var dim = new vector($('#power').width(),$('#power').height())
var html = ''
for(var i = 0;i < Math.floor(dim[1]/29);i++){
    html += '<tr>'
    for(var j = 0;j < Math.floor(dim[0]/25)-1;j++){
        html += `<td><img src='${imgsrc[0]}'></td>'`
    }
    html += '</tr>'
}
table.append(html)


function excel(a,b){
    return $('#power').children()[b].children[a]
}
for(var i = 1;i < 13;i++){
    excel(1,i).className = 'gone'
}

excel(2,15).className = 'gone'
excel(3,15).className = 'gone'
excel(14,0).className = 'gone'
excel(14,1).className = 'gone'
excel(14,2).className = 'gone'
excel(4,0).className = 'gone'
excel(4,1).className = 'gone'
excel(4,2).className = 'gone'
excel(7,1).className = 'gone'
excel(9,5).className = 'gone'
for(var i = 14;i < 17;i++){
    excel(16,i).className = 'gone'
}
excel(14,15).className = 'gone'
excel(15,15).className = 'gone'
for(var i = 4;i < 8;i++){
    excel(i,12).className = 'gone'
}
for(var i = 11;i < 15;i++){
    excel(i,12).className = 'gone'
}
for(var i = 7;i < 11;i++){
    excel(i,6).className = 'gone'
}
for(var i = 6;i < 10;i++){
    excel(5,i).className = 'gone'
}
for(var i = 0;i < 3;i++){
    excel(9,i).className = 'gone'
}
for(var i = 7;i < 11;i++){
    excel(i,15).className = 'gone'
}
excel(9,16).className = 'gone'
excel(9,17).className = 'gone'
for(var i = 7;i < 12;i++){
    excel(i,9).className = 'gone'
}
for(var i = 7;i<12;i++){
    excel(i,8).className = 'gone'
}
for(var i = 6;i < 10;i++){
    excel(13,i).className = 'gone'
}
excel(14,14).className = 'gone'
for(var i = 7;i < 12;i++){
    excel(i,14).className = 'gone'
}
for(var i = 0;i < 19;i++){
    excel(i,18).className = 'gone'
}
excel(9,11).className = 'gone'
excel(9,12).className = 'gone'
