var code = `([1,2,3] - [1]) + ([1] + ( [1] + [2] ))`

operators = {
    '+':function(a,b){
        if(a.type == b.type){
            if(a.type == 'num'){
                return a.value + b.value
            }else if(a.type == 'str'){
                return a.value + b.value
            }else if(a.type.includes('[')){
                return a.value.concat(b.value)
            }else{
                return null
            }
        }else{
            return null
        }
    },
    '-':function(a,b){
        if(arguments.length == 1){
            if(a.type == 'num'){
                return a.value * -1
            }
        }else{
            if(a.type == b.type){
                if(a.type == 'num'){
                    return a.value - b.value
                }else if(a.type == 'str'){
                    var str = ''
                    for(i of a.value){
                        if(!b.value.includes(i)){
                            str += i
                        }
                    }
                    return str
                }else if(a.type.includes('[')){
                    var str = []
                    for(i of a.value){
                        if(!b.value.includes(i)){
                            str.push(i)
                        }
                    }
                    return str
                }
            }
        }
    },
    '<':null,
    '<=':null,
    '++':null,
    '+#':null,
    '+&':null

}
class value{
    constructor(i){
        var hold = i.replaceAll(' ','')
        this.type = this.getType(hold)
        this.value = eval(hold)
    }
    getType(i){
        var isNum = false;
        var brackets = 0;
        var bracketString = '['
        for(var j = 0;j < 10;j++){
            isNum = isNum || i.includes(String(j))
        }
        while(i.includes(bracketString)){
            bracketString += '['
            brackets += 1;
        }
        if(brackets > 0){
            var type = new value(i.slice(i.indexOf(bracketString) + bracketString.length,i.indexOf(','))).type
            return `${type}[${brackets}]`
        }else if(i.includes('"') || i.includes("'")){
            return 'str'
        }else if(isNum){
            return "num";
        }else if(i.includes("true") || i.includes("false")){
            return 'bool'
        }
    }
}

commands = code.split('\n')
var parts = String(commands[0])
parts = parts.replaceAll('[','/')
parts = parts.replaceAll(']','\\')
parts = parts.replaceAll('(','[`')
parts = parts.replaceAll(')','`]')
parts = parts.replaceAll(' ','')
console.log(parts)
hold = Object.keys(operators).sort((a,b) => {return a.length < b.length ? 1 : -1})
console.log(hold,parts)

for(var i of hold){
    console.log(i)
    parts = parts.replaceAll(i,`\`,\`${i}\`,\``)
}
hold = hold.filter(function(a){return a.length > 1})
console.log(hold,'\n', parts)
parts = parts.replaceAll(',``,',',')
for(var i of hold){
    constr = ''
    for(var j of i){
        constr += `\`${j}\`,`
    }
    parts = parts.replaceAll(constr,`\`${i}\`,`)
    console.log(constr,parts)
}
parts = parts.replaceAll(']`,','],')
parts = parts.replaceAll(',`[',',[')
parts = parts.replaceAll(']`]',']]')
parts = parts.replaceAll('/','[')
parts = parts.replaceAll(']`]',']]')
parts = parts.replaceAll('\\',']')
console.log(parts)
parts = eval(`[${parts}]`)
console.log(parts)