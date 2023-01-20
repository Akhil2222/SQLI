'''var code = `1 + 1`
commands = code.split('\n')
parts = commands[0].split(' ')
parts = parts.filter((a)=>{return a})
console.log(parts)
console.log(parts[parts.indexOf('+')-1],parts[parts.indexOf('+')+1])
operations = {
    '+':function(a,b){
        if(getType(a) == getType(b)){

        }
    }
}

function getType(i){
    var isNum = false
    for(var j = 0;j < 10;j++){
        isNum = isNum || i.includes(`${j}`)
    }
    if(i.includes('"') || i.includes("'")){
        return 'string'
    }else if(isNum){
        return "num";
    }else if(i.includes("true") || i.includes("false")){
        return 'bool'
    }
}
function getValue(type,i){
    if(type == 'string'){
        return i.replaceAll('"','').replaceAll("'",'')
    }else if(type == 'number'){
        turns = i.split('.')
        var sum = 0;
        for(var i in turns){
            for(var j in i){

            }
        }
    }
}
'''