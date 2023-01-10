var troops = {
    infantry:{
        damage:1,
        range:5,
    },
    cavalry:{
        damage:5,
        range:10
    },
    archers:{
        damage:1,
        range:100.
    },
    artillery:{
        damage:10,
        range:200
    }
}
class set{
    constructor(population,cannon){
        this.infantry = Math.round(4*population/5)
        this.cavalry = Math.round(population/5)
        if(cannon){
            this.artillery = Math.round(population/100)
        }else{
            this.archers = Math.round(population/100)
        }
    }
    getType(){
        var hold = Object.keys(this)
        var retarr = [];
        for(var i of hold){
            retarr.push(i)
        }
        return retarr
    }
}
class faction{
    constructor(set,sets,pos){
        var troop = set.getType()
        var troopstats = {}
        for(var i of troop){
            this[i] = set[i]*sets
            troopstats[i] = troops[i]
        }
        this.stats = troopstats
        this.pos = pos;
    }
    move(dir){
        this.pos[0] += dir[0]
        this.pos[1] += dir[1]
    }
    dmg(enemypos){
        var damage = 0;
        var range = Math.hypot(enemypos[0] - this.pos[0],enemypos[1] - this.pos[1])
        for(var i of Object.keys(this.stats)){
            if(this.stats[i].range >= range){
                damage += this[i]*this.stats[i].damage
            }
        }
        return damage
    }
}