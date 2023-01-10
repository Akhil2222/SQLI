function getBind(mapel){
    var letp = new vector(mapel.offsetLeft,mapel.offsetTop)
    var hl = new vector(mapel.offsetWidth,mapel.offsetHeight)
    return [letp,hl]
}
function bindplay(play){
    var letp = new vector(...Object.values(play.offset()).reverse())
    var hl = new vector(play.width(),play.height())
    return [letp,hl]
}
var boundbox = []
for(var i of $('.barrier')){
    boundbox.push(getBind(i))
}
function coll(mati,matj){
    if(mati[0][0] < matj[0][0] + matj[1][0] && mati[0][0] + mati[1][0] > matj[0][0] && mati[0][1] < matj[0][1] + matj[1][1] && mati[0][1] + mati[1][1] > matj[0][1]){
        return true;
    }else{
        return false;
    }
}