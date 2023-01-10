var metals = {
    stone:{
        replace:'dirt',
        chance:0.25,
        durability:10,
        cost:4
    },
    iron:{
        replace:'stone',
        chance:0.25,
        durability:25,
        cost:16
    },
    diamond:{
        replace:'stone',
        chance:0.05,
        durability:100,
        cost:80
    }
}
var basecost = 1;
var money = 10;
function sell(metal){
    if(!isNaN(Number(metals[metal].cost))){
        money += Math.round(basecost*metals[metal].cost)
    }
}
var picinf = {
    power:1,
    speed:0.5
}
class item{
    constructor(name,ref,multiplyer){
        this.name = name;
        this.multiply = {
            ref:ref,
            up:multiplyer
        }
        this.level = 1
    }
}
var upgrades = {}
upgrades.furnace = new item('Improved Smelting','basecost','*=1.1')
upgrades.picpow = new item('Stronger Pickaxe','picinf.power','+=1')
upgrades.picsp = new item('Faster Swing','picinf.speed','*=0.9')
function stonks(){
    var move = -0.2+Math.random()*0.4
    basecost += move
    if(basecost <= 0){
        basecost = 0.1
    }
    //console.log(upgrades,basecost*metals.diamond.cost)
}
stonks()
setInterval(stonks,10000)
setInterval(()=>{$('#money').html(money)})
function upgrade(id){
    var hold = upgrades[id]
    var hold2 = String(hold.multiply.ref) + String(hold.multiply.up)
    var upcost = $(`#${id}_cost`).html()
    if(money - Number(upcost) >= 0){
    money -= Number(upcost)
    }else{
        alert(`You are too poor. You need $${-(money - Number(upcost))} to afford this upgrade`)
    }
    eval(hold2)
    hold.level += 1
    $(`#${id}_lvl`).html(hold.level)
    var hold3 = hold.multiply.up.replace('=','')
    //console.log(eval(upcost+hold3),hold3,1+1/basecost)
    $(`#${id}_cost`).html(Math.ceil(eval(upcost+hold3)*(1+1/basecost)))
}
for(var i of Object.keys(upgrades)){
    var el = $(`#${i}`)
    el.html(upgrades[i].name)
    el.click((e)=>{
        upgrade(e.target.id)
    })
}
var iftoggle = false;
$('#upflip').click(()=>{
    if(iftoggle){
        $('#upgradepanel').css({display:'inline-flex'})
    }else{
        $('#upgradepanel').css({display:'none'})
    }
    iftoggle = !iftoggle
})