var direction = new vector(0,0)
var moves = {
    left:{
        keybinds:['a','ArrowLeft'],
        rotation:180,
        vector:new vector(-1,0)
    },
    up:{
        keybinds:['w','ArrowUp'],
        rotation:270,
        vector:new vector(0,-1)
    },
    down:{
        keybinds:['s','ArrowDown'],
        rotation:90,
        vector:new vector(0,1)
    },
    right:{
        keybinds:['d','ArrowRight'],
        rotation:0,
        vector:new vector(1,0)
    }
}
document.onkeydown = function(e){
    for(var i of Object.entries(moves)){
        for(var j of i[1].keybinds){
            if(j == e.key){
                direction = i[1].vector
                $('#player').css('transform',`rotate(${i[1].rotation}deg)`)
            }
        }
    }
}
var split = 4;
var ghosttrack = [vector.zero(2),vector.zero(2),vector.zero(2),vector.zero(2)]
var ghazoom = [0.7+Math.round(Math.random()*split)/(2*split),0.7+Math.round(Math.random()*split)/(2*split),0.7+Math.round(Math.random()*split)/(2*split),0.7+Math.round(Math.random()*split)/(2*split)]
var update = false
setTimeout(()=>{
    update = true
},10000)
