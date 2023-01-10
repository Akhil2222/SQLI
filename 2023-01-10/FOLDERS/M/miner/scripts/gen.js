var size = [100,100]
var sqsize = [50,50]
var oppos = [size[0]*sqsize[0]/2,20]
var ppos = [...oppos]
//console.log(ppos)
var iteminf = []
class metal{
    constructor(i,j){
        this.pos = [i,j]
        this.dim = sqsize
    }
    create(){
        var coord = [(ppos[0]-(this.pos[0]*sqsize[0])),(ppos[1]+(this.pos[1]*sqsize[1]))]
        return `<div style='left:${coord[0]}px;top:${coord[1]}px;width:${this.dim[0]}px;height:${this.dim[1]}px;' hold='metal' class='dirt'>a</div>`
    }
}
function creitm(){
    for(var i = 0;i < size[0];i++){
        for(var j = 2;j < size[1];j++){
            var hold = new metal(i,j)
            //console.log(hold) 
            iteminf.push(hold)
        }
    }
    $('#container').html('')
    for(var i of iteminf){
        //console.log(i.create())
        $('#container').append(i.create())
    }
    for(var i of Object.entries(metals)){
        for(var j of $(`.${i[1].replace}`)){
            //console.log(i,j)
            if(Math.random()<i[1].chance){
                //console.log(j,j.setAttribute)
                j.setAttribute('class',i[0])
                j.innerHTML = i[1].durability
            }
        }
    }
}

creitm()