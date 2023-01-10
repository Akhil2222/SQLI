var score = 0;
var lives = 3;
var fisrtghost = [false,false,false,false];
var start = bindplay($('#player'))[0]
var sheild = 0;
var audiofile = new Audio('audio/pacman_death.wav')
setInterval(()=>{
    var pacbound = bindplay($('#player'))
    var tablebound = bindplay($('#power'))
    var pos = new vector(...(Object.values($('#player').offset()).reverse()))
    pos = vector.add(pos,direction)
    var collcheck = []
    for(var i of boundbox){
        collcheck.push(coll(i,[pos,pacbound[1]]))
    }
    if(lives <= 0){
        $('body').html(`<h1 class='hold'>Game Over</h1>`)
    }
    var closepellet = excel(Math.round((pacbound[0][0]-tablebound[0][0])/(tablebound[1][0]/19)),
    Math.round(2*(pacbound[0][1]-tablebound[0][1])/(3*(tablebound[1][1]/29))))
    if(!closepellet.className){
        closepellet.className = 'eaten';
        score += 10;
        $('#score').text(score)
    }
    if(!$('td:not(.eaten):not(.gone)').length){
        score += 1000;

        for(i of $('td:not(.gone)')){
            i.className = ''
        }
    }   
    if(update){
        var ghostbind = []

        for(var i of $('.ghost')){
            ghostbind.push(getBind(i))
        }
        sheild = Math.max(sheild-1,0)
        for(var i of ghostbind){
            if(coll(i,pacbound) && !sheild){
                $('#player').offset({left:start[0],top:start[1]})
                sheild = 10;
                collcheck.push(true)
                audiofile.play()
                $(`#${lives}`).css('display','none')
                lives -= 1;   
            }   
        }
        
        var inc = 0;
        var uparr = ['bghost','oghost','pghost','rghost']
        for(var i of ghostbind){
            var rawmove = vector.add(pacbound[0],i[0].scale(-1)).scale(ghazoom[inc]/vector.dist(vector.zero(2),vector.add(pacbound[0],i[0].scale(-1))))
            rawmove = new vector(Math.round(rawmove[0]),Math.round(rawmove[1])).scale(ghazoom[inc])
            var wanmoves = [new vector(rawmove[0],0),new vector(0,rawmove[1])]
            var zerovect = wanmoves.findIndex((a)=>{return !vector.dist(a,vector.zero(2))})
            var ghstbnd = [...ghostbind].splice(inc,1);
            if(zerovect >= 0){
                wanmoves.splice(zerovect,1)
            }
            var posmoves = []
            for(var j of Object.values(moves)){
                var ghostmove = vector.add(i[0],j.vector.scale(ghazoom[inc]));
                var ghostcoll = []
                for(var k in boundbox){
                    if($('.barrier')[k].id != 'ghosts_pass'){
                        ghostcoll.push(coll(boundbox[k],[ghostmove,i[1]]))
                    }
                }
                if(!Math.hypot(...ghostcoll)){
                    posmoves.push(j.vector.scale(ghazoom[inc]))
                }
            }
            posmoves.push(vector.zero(2))
            var moved = false
            if(fisrtghost[inc]){
                for(var j of wanmoves){
                    for(var k of posmoves){
                        if(vector.dist(j,k) == 0){
                            var newpos = vector.add(i[0],k);
                            $(`#${uparr[inc]}`).offset({left:newpos[0],top:newpos[1]})
                            moved = true;
                        }
                    }
                }
                if(!moved){
                    var newpos = vector.add(i[0],posmoves[0]);
                    $(`#${uparr[inc]}`).offset({left:newpos[0],top:newpos[1]})
                }
            }else{
                var newpos = vector.add(i[0],new vector(0,-50));
                $(`#${uparr[inc]}`).offset({left:newpos[0],top:newpos[1]})
                fisrtghost[inc] = true;
            }
            inc++;
            
        }
    }
    if(!Math.hypot(...collcheck)){ 
        $('#player').offset({left:pos[0],top:pos[1]})
    }
},12.5)