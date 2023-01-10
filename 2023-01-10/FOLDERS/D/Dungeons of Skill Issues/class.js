function randint(a,b){
    return Math.round(Math.random()*(b-a)+a)
}
var dung_eff = [['attack'],['speed'],['range'],['attack','range'],['speed','range'],['attack','speed'],['attack','speed','range']]
function drop(power,dungeon){
    var powerhold = power
    var speed = Math.ceil(Math.random()*Math.sqrt(powerhold)*2)
    powerhold = Math.round(powerhold/speed)
    var attack = Math.ceil(Math.random()*(powerhold/2) + powerhold/2)
    powerhold = Math.round(powerhold/attack)        
    var range = Boolean(Math.floor(powerhold-1))
    var rest = Math.floor(power/(attack + speed))
    var energy = Math.ceil((power)**2/(attack*speed*rest))
    var type = ['sword','sheild','bow'][randint(0,2)]
    effects = {
        'attack':0,
        'speed':0,
        'range':0
    }
    if(Math.random() > 0.8){
        keys = dung_eff[dungeon]
        for(let i of keys){
            effects[i] =  power/1000/keys.length   
        }
    }
    return new weapon(power,speed,attack,range,rest,energy,effects,type,false,false)
}

class weapon{
    constructor(power,speed,attack,range,rest,energy,effects,type,merged,enchant){
        this.power = power
        this.speed = speed
        this.attack = attack
        this.range = range
        this.rest = rest
        this.energy = energy
        this.effects = effects
        this.type = type
        this.merged = merged
        this.enchant = enchant
        this.custforge = 0
    }
    static merge(a,b){
        if(a.type == b.type && !a.merged && !b.merged){
            var attack = randint(a.attack,b.attack)
            var speed = randint(a.speed,b.speed)
            var range = a.range && b.range
            var power = Math.round(speed*attack*(Number(range)+1)/10)*10
            var rest = Math.floor(power/(attack + speed))
            var energy = Math.ceil((power)**2/(attack*speed*rest))
            var effects = {
                'attack':0,
                'speed':0,
                'range':0
            }
            for(let i in a.effects){
                if(Math.random() < 0.4){
                    effects[i] = effects[i] + a.effects[i]
                }
            }
            for(let i in b.effects){
                if(Math.random() < 0.4){
                    effects[i] = effects[i] + b.effects[i]
                }
            }
            return new weapon(power,speed,attack,range,rest,energy,effects,a.type,true,false)
        }else{
            return null
        }
    }
    custom(scale,buff,nerf){
        if(buff == 'range'){
            this.range = true
            Math.ceil(this[nerf] = this[nerf]/2)
        }else if(nerf == 'range'){
            this.range = false
            Math.floor(this[buff] = this[buff]*2)
        }else{
            Math.floor(this[buff] = this[buff]*scale)
            Math.ceil(this[nerf] = this[nerf]/scale)
        }
        this.custforge = this.custforge + 1
    }
}