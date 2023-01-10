var alpha = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 ,<.>/?;:\'"[{]}|-_=+!@#$%^&*()`~')
function encrypt(str){
    var strarr = Array.from(str);
    var intarr = []
    for(i of strarr){
        intarr.push(alpha.indexOf(i))
    }
    var encarr = []
    for(i in intarr){
        encarr.push((10**8)+Math.round(Math.random()*(10**8)))
    }    
    var returnarr = [];
    for(i in intarr){
        returnarr.push((intarr[i]+encarr[i])%alpha.length)
    }
    var encstr = ''
    for(i of returnarr){
        encstr += alpha[i]
    }
    return [encstr,encarr]
}
function decrypt(encstr,keyarr){
    encarr = Array.from(encstr)
    encint = [];
    for(i of encarr){
        encint.push(alpha.indexOf(i))
    }
    var decint = []
    for(i in encint){
        decint.push(alpha.length-(Math.abs(encint[i]-keyarr[i])%alpha.length)%alpha.length)
    }
    var decstr = '';
    for(i of decint){
        decstr += alpha[i]
    }
    return decstr
}