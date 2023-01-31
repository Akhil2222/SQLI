var fs = require('fs');
var prompt = require('prompt-sync')();
require('dotenv').config();
file = process.env.fileName
var code = fs.readFileSync('/Users/akhily/Documents/projects that i can acsess/2023-01-10/FOLDERS/E/EPL/test.epl','utf8')
//Installed Node, prompt-sync, and dotenv  
operators = {
  '+': function(a, b) {
    if (a.type == b.type) {
      if (a.type == 'num') {
        return a.value + b.value
      } else if (a.type == 'str') {
        return a.value + b.value
      } else if (a.type.includes('[')) {
        return a.value.concat(b.value)
      }
    }
  },
  '-': function(a, b) {
    if (arguments.length == 1) {
      if (a.type == 'num') {
        return a.value * -1
      }
    } else {
      if (a.type == b.type) {
        if (a.type == 'num') {
          return a.value - b.value
        } else if (a.type == 'str') {
          var str = ''
          for (i of a.value) {
            if (!b.value.includes(i)) {
              str += i
            }
          }
          return str
        } else if (a.type.includes('[')) {
          var str = []
          for (i of a.value) {
            if (!b.value.includes(i)) {
              str.push(i)
            }
          }
          return str
        }
      }
    }
  },
  '{': function(a) {
    if (a.type == 'num') {
      return Math.floor(a.value)
    }
  },
  '}': function(a) {
    if (a.type == 'num') {
      return Math.ceil(a.value)
    }
  },
  ':': function(a, b) {
    if (a.type == 'num' && b.type == 'num') {
      return Math.random() * Math.abs(a.value - b.value) + Math.min(a.value, b.value)
    }
  },
  '*': function(a, b) {
    if (b.type == 'num') {
      if (a.type == 'num') {
        return a.value * b.value
      } else if (a.type == 'str') {
        var str = '';
        for (var i = 0; i < b.value; i++) {
          str += a.value
        }
        return str
      } else if (a.type.includes('[')) {
        var arr = []
        for (let i = 0; i < b.value; i++) {
          arr = arr.concat(a.value)
        }
        return arr
      }
    }
  },
  '/': function(a, b) {
    if (b.type == 'num' && a.type == 'num') {
      return a.value / b.value
    }
  },
  '//': function(a, b) {
    if (b.type == 'num' && a.type == 'num') {
      return Math.round(a.value / b.value)
    }
  },
  '^': function(a, b) {
    if (a.type == b.type) {
      if (a.type == 'num') {
        return Math.pow(a.value, b.value)
      } else if (a.type == 'str') {
        holda = operators['-'](a, b)
        holdb = operators['-'](b, a)
        return holda + holdb
      } else if (a.type.includes('[')) {
        holda = operators['-'](a, b)
        holdb = operators['-'](b, a)
        return holda.concat(holdb)
      }
    }
  },
  '%': function(a, b) {
    if (arguments.length == 2) {
      if (a.type == b.type) {
        if (a.type == 'num') {
          return a.value % b.value
        }
      }
    } else {
      if (a.type == 'str') {
        return Array.from(new Set(a.value.split(''))).join('')
      } else if (a.type.includes(']')) {
        return Array.from(new Set(a.value))
      }
    }

  },
  '=': function(a, b) {
    if (a.type == 'str' && !(a.values in operators)) {
      variables[a.value] = b.value
    }
  },
  '?': function(a) {
    if (a.type = 'str') {
      return variables[a.value]
    }
  },
  '&': function(a, b) {
    if (a.type == b.type) {
      if (a.type == "num") {
        var nums = [a.value, b.value].sort((a, b) => { a - b })
        while (Boolean(nums[0] % nums[1])) {
          nums.push(nums[0] % nums[1])
          nums.shift()
        }
        return nums[1]
      } else if (a.type == 'str') {
        str = ''
        holda = operators['^'](a, b)
        for (i of a.value) {
          if (holda.indexOf(i) < 0) {
            str += i
          }
        }
        return str
      } else if (a.type.includes('[')) {
        str = []
        holda = operators['^'](a, b)
        for (i of a.value) {
          if (holda.indexOf(i) < 0) {
            str.push(i)
          }
        }
        return str
      }
    }
  },
  '|': function(a, b) {
    if (a.type == b.type) {
      if (a.type == 'num') {
        return a.value * b.value / operators['&'](a, b)
      } else if (a.type == 'str') {
        return Array.from(new Set((a.value + b.value).split(''))).join('')
      } else if (a.type.includes('[')) {
        return Array.from(new Set(a.value.concat(b.value)))
      }
    }
  },
  '<<': function(a, b) {
    if (b.type == 'num') {
      if (a.type == 'num') {
        return a.value * Math.pow(2, b.value)
      } else if (a.type == 'str') {
        return a.value.slice(0, a.value.length - b.value)
      } else if (a.type.includes('[')) {
        return a.value.splice(0, a.value.length - b.value)
      }
    }
  },
  '>>': function(a, b) {
    if (b.type == 'num') {
      if (a.type == 'num') {
        return a.value / Math.pow(2, b.value)
      } else if (a.type == 'str') {
        return a.value.slice(b.value, a.value.length)
      } else if (a.type.includes('[')) {
        return a.value.splice(b.value, a.value.length)
      }
    }
  },
  'maxArr': function(a) {
    if (a.type == 'num') {
      for (var i = 0; i < a.value; i++) {
        eval(`operators[\`<${i}>\`] = function (a,b){
                    if(arguments.length == 1){
                        if(a.type.includes('[') || a.type == "str"){
                            return a.value[${i}]
                        }
                    }else{
                        if(a.type.includes('[') || a.type == "str"){
                            if(a.type.replace("[]","") == b.type)
                            a.value[${i}] = b.value
                            return a.value
                        }
                        
                    }
                }`)
      }
    }
  },
  'display': function(a) {
    hold = format(a.value)
    hold = hold.replaceAll('_',' ')
    hold = new value(hold)
    console.log(hold.value)
  },
  'read': function(a) {
    if (a.type == 'str') {
      a.value = a.value.replaceAll('_', ' ')
      hold = prompt(a.value + ':')
      return hold
    }
  },
  'mu': function(a, b) {
    if (b.type == 'str' && ((a.type.includes('[') || a.type == 'str'))) {
      newarr = [];
      for (var i of a.value) {
        hold = b.value
        hold = hold.replaceAll('\'','"')
        var parenarr = ['(',')']
        var c = 0
        while(hold.includes('@')){
            hold = hold.replace('@',parenarr[c])
            c++
            c %= 2
        }
        hold = hold.replaceAll('$', `${format(i)}`)
        newarr.push(operate(hold))
      }
      return newarr
    }
  },
  '~': function(a, b) {
    if ((a.type.includes('[') || a.type == 'str') && b.type == 'num') {
      return a.value[b.value]
    }
  },
  'goto': function(a, b) {

    if (arguments.length == 1 && a.type == 'num') {
      count = a.value - 2
    } else {
      if (a.type == 'bool' && b.type == 'num') {
        if (a.value) {
          count = b.value - 2
        }
      }
    }
  },
  '#': function(a) {
    if (a.type == 'str' || a.type.includes('[')) {
      return a.value.length
    }
  },
  '<': function(a, b) {
    if (arguments.length == 1) {
      if (a.type == 'str') {
        var min = a.value[0]
        for (var i of a.value) {
          if (i < min) {
            min = i
          }
        }
        return min
      } else if (a.type.includes('[')) {
        if (a.type.replaceAll('[]', '') == 'num') {
          return Math.max(...a.value)
        } else {
          var min = a.value[0]
          for (var i of a.value) {
            var hold = operators['<'](new value(format(i)), new value(format(min)))
            if (hold) {
              min = i
            }
          }
          return min
        }
      }
    } else {
      if (a.type == b.type) {
        if (a.type == 'num') {
          return a.value < b.value
        } else if (a.type.includes('[') || a.type == 'str') {
          for (var i in a.value) {
            if (a.value[i] < b.value[i]) {
              return true;
            } else if (a.value[i] > b.value[i]) {
              return false
            }
          }
          return false
        }
      }
    }
  },
  '<~': function(a, b) {
    if (a.type == b.type) {
      if (a.type == 'str' || a.type.includes('[')) {
        return a.value.length < b.value.length
      }
    }
  },
  '>': function(a, b) {
    if (arguments.length == 1) {
      if (a.type == 'str') {
        var max = a.value[0]
        for (var i of a.value) {
          if (i > max) {
            max = i
          }
        }
        return max
      } else if (a.type.includes('[')) {
        if (a.type.replaceAll('[]', '') == 'num') {
          return Math.max(...a.value)
        } else {
          var max = a.value[0]
          for (var i of a.value) {
            var hold = operators['>'](new value(format(i)), new value(format(max)))
            if (hold) {
              max = i
            }
          }
          return max
        }
      }
    } else {
      if (a.type == b.type) {
        if (a.type == 'num') {
          return a.value > b.value
        } else if (a.type.includes('[') || a.type == 'str') {
          for (var i in a.value) {
            if (a.value[i] > b.value[i]) {
              return true;
            } else if (a.value[i] < b.value[i]) {
              return false
            }
          }
          return false
        }
      }
    }
  },
  '>~': function(a, b) {
    if (a.type == b.type) {
      if (a.type == 'str' || a.type.includes('[')) {
        return a.value.length > b.value.length
      }
    }
  },
  '<=': function(a, b) {
    if (a.type == b.type) {
      if (a.type == 'num') {
        return a.value <= b.value
      } else if (a.type.includes('[') || a.type == 'str') {
        for (var i in a.value) {
          if (a.value[i] < b.value[i]) {
            return true;
          } else if (a.value[i] > b.value[i]) {
            return false
          }
        }
        return true
      }
    }
  },
  '>=': function(a, b) {
    if (a.type == b.type) {
      if (a.type == 'num') {
        return a.value >= b.value
      } else if (a.type.includes('[') || a.type == 'str') {
        for (var i in a.value) {
          if (a.value[i] > b.value[i]) {
            return true;
          } else if (a.value[i] < b.value[i]) {
            return false
          }
        }
        return true
      }
    }
  },
  '==': function(a, b) {
    if (a.type == b.type) {
      if (a.type == 'num' || a.type == 'bool') {
        return a.value == b.value
      } else if (a.type.includes('[') || a.type == 'str') {
        if (a.value.length < b.value.length) {
          return false
        }
        for (var i in a.value) {
          if (a.value[i] != b.value[i]) {
            return false;
          }
        }
        return true
      }
    }
  },
  '=~': function(a, b) {
    if (a.type == b.type) {
      if (a.type == 'str' || a.type.includes('[')) {
        return a.value.length == b.value.length
      }
    }
  },
  '&&': function(a, b) {
    if (a.type == 'bool' && b.type == 'bool') {
      return a.value && b.value
    }
  },
  '^^': function(a, b) {
    if (a.type == 'bool' && b.type == 'bool') {
      return a.value != b.value
    }
  },
  '||': function(a, b) {
    if (a.type == 'bool' && b.type == 'bool') {
      return a.value || b.value
    }
  },
  '!': function(a) {
    if (a.type == 'bool') {
      return !a.value
    }
  },
  'str': function(a) {
    return String(a.value)
  },
  'num': function(a) {
    var newnum = Number(a.value)
    if (isNaN(newnum)) {
      return 0
    } else {
      return newnum
    }
  },
  'bool': function(a) {
    return Boolean(a.value)
  },
  'arr': function(a) {
    return [a.value]
  },
  'find': function(a, b) {
    if (a.type.includes('[')) {
      if (a.type.replaceAll('[]', '') == b.type) {
        return a.value.indexOf(b.value)
      }
    } else if (a.type == 'str' && b.type == 'str') {
      return a.value.indexOf(b.value)
    }
  },
  'quit': function(a) {
    if (a.type == 'str') {
      a.value = a.value.replaceAll('_', ' ')
      console.log(a.value)
      process.exit(0)
    }
  }
}

variables = {}
function format(input) {
  if (typeof input == 'object') {
    if (typeof input[0] == 'string') {
      for (i in input) {
        input[i] = input[i].replaceAll('"', '')
        input[i] = `\"${String(input[i])}\"`
      }
      hold = `[${String(input)}]`
      return hold
    } else {
      return `[${String(input)}]`
    }
  } else if (typeof input == 'string') {
    input = input.replaceAll("\"", '')
    return `"${String(input)}"`
  } else {
    return String(input)
  }
}
class value {
  constructor(i) {
    this.type = this.getType(i)
    this.value = eval(i)
  }
  getType(i) {
    i = i.replaceAll(' ', '')
    var isNum = false;
    var brackets = 0;
    var bracketString = '['
    var revbrac = ''
    for (var j = 0; j < 10; j++) {
      isNum = isNum || i.includes(String(j))
    }
    while (i.includes(bracketString)) {
      bracketString += '['
      revbrac += ']'
      brackets += 1;
    }
    if (i[0] == '"') {
      return 'str'
    } else if (brackets > 0) {
      var type = new value(i.slice(i.indexOf(bracketString) + bracketString.length, i.indexOf(','))).type
      return `${type}[]`
    } else if (isNum) {
      return "num";
    } else if (i.includes("true") || i.includes("false")) {
      return 'bool'
    }
  }
}
for (var i = 0; i < 2 ** 7; i++) {
  eval(`operators[\`<${i}>\`] = function (a,b){
        if(arguments.length == 1){
            if(a.type.includes('[') || a.type == "str"){
                return a.value[${i}]
            }
        }else{
            if(a.type.includes('[') || a.type == "str"){
                if(a.type.replace("[]","") == b.type)
                a.value[${i}] = b.value
                return a.value
            }
            
        }
    }`)
}
var oneLen = []
for (var i of Object.keys(operators)) {
  if (operators[i].length == 2) {
    eval(`operators['${i}#'] = function(a,b){
            if(a.type == b.type){
                if(a.type.includes('[') && b.type.includes('[')){
                    dims = []
                    lengths = [[a.value.length,b.value.length]]
                    for(i in [a,b]){
                        var j = [a,b][i].value
                        var c = 0
                        while(typeof j == 'object'){
                            
                            c++;
                            j = j[0];
                            if(lengths[c] == undefined){
                                lengths[c] = [];
                            }
                            lengths[c].push(j.length)
                        }
                        dims.push(c)
                    }
                    lengths.pop()
                    if(dims[0] == dims[1]){
                        for(var i in lengths){
                            lengths[i] = Math.max(...lengths[i])
                        }
                        retarr = []
                        evstr = ''
                        var depth = ''
                        for(i in lengths){
                            evstr += \`for(var i\${i} = 0;i\${i} < \${lengths[i]};i\${i}++){\`
                            depth += \`[i\${i}]\`
                            if(i + 1 < lengths.length){
                                evstr += \`
                                retarr\${depth} = [];
                                if(typeof b.value\${depth} != 'object'){
                                    b.value\${depth} = [b.value\${depth}]
                                }
                                if(typeof a.value\${depth} != 'object'){
                                    a.value\${depth} = [a.value\${depth}]
                                }
                                \`
                            }
                        }
                        evstr += \`if(b.value\${depth} == undefined){
                            b.value\${depth} = basic(b.type)
                        }
                        if(a.value\${depth} == undefined){
                            a.value\${depth} = basic(a.type)
                        }
                        retarr\${depth} = operators['${i}'](new value(format(a.value\${depth})),new value(format(b.value\${depth})))
                        \`
                        for(i in lengths){
                            evstr += '}'
                        }
                        eval(evstr)
                        return retarr
                    }
                }
            }
        }`)
  }
}
for (var i of Object.keys(operators)) {
  if (String(operators[i]).includes('arguments.length')) {
    oneLen.push(i)
  }
}
function operate(parts) {
  if (parts.includes('>:')) {
    var ind = parts.indexOf('>:')
    var duparr = parts
    parts = parts.slice(0, ind)
    if (parts.length == 0) {
      return null
    }
  }
  parts = `(${parts})`
  parts = parts.replaceAll('[', ';')
  parts = parts.replaceAll(']', '\\')
  parts = parts.replaceAll('(', '[`')
  parts = parts.replaceAll(')', '`]')
  parts = parts.replaceAll(' ', '')
  hold = Object.keys(operators).sort((a, b) => { return a.length < b.length ? 1 : -1 })

  for (var i of hold) {
    parts = parts.replaceAll(i, `\`,\`${i}\`,\``)
  }

  hold2 = Object.keys(operators).sort((a, b) => { return b.length - a.length })[0]
  for (i = 1; i < hold2.length; i++) {
    hold = hold.filter(function(a) { return a.length > i })
    parts = parts.replaceAll(',``,', ',')
    for (var i of hold) {
      constr = ''
      for (var j of i) {
        constr += `\`${j}\`,`
      }
      parts = parts.replaceAll(constr, `\`${i}\`,`)
    }
  }
  for (var i of Object.keys(operators)) {
    parts = parts.replaceAll(`@\`,\`${i}`, `@${i}`)
    parts = parts.replaceAll(`${i}\`,\`#`, `${i}#`)
  }
  parts = parts.replaceAll(']`,', '],')
  parts = parts.replaceAll(',`[', ',[')
  parts = parts.replaceAll('`[`', '[`')
  parts = parts.replaceAll('\`\`,', '')
  var bracketstr = '['
  while (parts.indexOf('`' + bracketstr) > -1) {
    parts = parts.replaceAll(`\`${bracketstr}`, bracketstr)
  }
  var bracketstr = ']'
  while (parts.indexOf(bracketstr + '`') > -1) {
    parts = parts.replaceAll(`${bracketstr}\``, bracketstr)
  }
  parts = parts.replaceAll(']`]', ']]')
  parts = parts.replaceAll(';', '[')
  parts = parts.replaceAll('\\', ']')
  parts = eval(`${parts}`)
  function calc(a) {
    for (var i in Object.keys(variables)) {
      variables[i]
    }
    
    arr = a
    var quoth = false
    var quoteInd;
    removeInd = []
    for(var i in arr){
        if(quoth){
            arr[quoteInd] = arr[quoteInd] + String(arr[i])
            removeInd.push(i)
        }
        if(arr[i].includes('"')){
            if(arr[i].includes('"',1)){
              continue;
            }
            quoth = !quoth
            quoteInd = i
        }
    }
    truarr = []
    for(var i in arr){
        if(!removeInd.includes(i)){
            truarr.push(arr[i])
        }
    }
    a = [...truarr]
    
    a = a.filter((a) => { return a })
    
    if (a[0] in operators) {
      len = operators[a[0]].length
      if (oneLen.includes(a[0])) {
        len = 1
      }
      if (a.length - 1 != len) {
        a[1] = a.splice(1)
      }
    } else {
      if (a.length > 4) {
        a[2] = a.splice(2)
      }
    }
    
    if (a.length == 3) {
      numbers = [0, 2];
      for (i of numbers) {
        if (typeof a[i] == 'object') {
          a[i] = format(calc(a[i]))
        }
      }
      return operators[a[1]](new value(a[0]), new value(a[2]))

    } else if (a.length == 2) {
      if (typeof a[1] == 'object') {
        a[1] = format(calc(a[1]))
      }
      return operators[a[0]](new value(a[1]))

    } else {
      return calc(a[0])
    }
  }
  return calc(parts)
}
commands = code.split('\n')
commands = commands.filter(a => { return a })
count = 0
try {
  while (count < commands.length) {
    operate(commands[count])
    count++
  }
} catch (e) {
  console.error('Error at: ' + commands[count], ',line:' + (count + 1) + '\n')
  console.log(e)
}

process.exit(0)