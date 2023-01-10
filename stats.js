class vector extends Array{
    
    static dist(a,b){
        var newarr = []
        if (a.length == b.length){
            for(var i = 0;i < a.length;i++){
                newarr.push(a[i]-b[i])
            }
        }else{
            for(var i = 0;i < Math.max(a.length,b.length);i++){
                newarr.push(NaN)
            }
        }
        return Math.hypot(...newarr)
    }
    static motion(a,b){
        var returnobj = {};
        var slope = (a[1]-b[1])/(a[0]-b[0])
        returnobj.angle = Math.atan(slope)
        if(b[0] < a[0]){
            returnobj.angle = Math.PI + returnobj.angle
        }
        returnobj.angle = [returnobj.angle,returnobj.angle*180/Math.PI]
        returnobj.slope = slope
        return returnobj;
    }
    static add(a,b){
        var retarr = []
        for(var i in a){
            retarr.push(a[i]+b[i])
        }
        return new vector(...retarr)
    }
    scale(dilation){
        var newarr = []
        for (let i = 0; i < this.length; i++) {
            newarr.push(this[i]*dilation)
        }
        return new vector(...newarr)
    }
    static covar(x,y){
        if(x.length == y.length){
            var sumx = 0;
            var sumy = 0;
            for(var i in x){
                sumx += x[i]
                sumy += y[i]
            }
            console.log(sumx,sumy)
            sumx = sumx/x.length
            sumy = sumy/y.length
            console.log(sumx,sumy)
            var sum = 0;
            for(var i in x){
                sum += (x[i]-sumx)*(y[i]-sumy)
            }
            return sum/x.length
        }else{
            return NaN;
        }
    }
    static zero(length){
        var newarr = [];
        for(var i = 0;i < length;i++){
            newarr.push(0)
        }
        return new vector(...newarr)
    }
    static dot(a,b){
        var sum = 0;
        for(var i in a){
            sum += a[i]*b[1]
        }
        return sum
    }
}
function stats(arr){
    var statobj = {

    }
    arr.sort((a,b)=>{return a-b})
    if(arr.length % 2){
        statobj.median = arr[Math.floor(arr.length/2)]
    }else{
        statobj.median = [arr[arr.length/2],arr[(arr.length-2)/2]]
    }
    statobj.range = arr[arr.length-1] - arr[0]
    var sum = 0;
    for(var i of arr){
        sum += i;
    }
    statobj.mean = sum/arr.length;
    var storearr = []
    for(var i of arr){
        var counter = 0;
        var ind = arr.indexOf(i)
        while(ind != -1){
            counter++;
            ind = arr.indexOf(i,ind + 1)
        }
        storearr.push(counter)
    }
    var holdarr = [...storearr].sort((a,b)=>{return b-a})

    statobj.mode = arr[storearr.indexOf(holdarr[0])]
    statobj.variance = vector.covar(new vector(...arr),new vector(...arr))
    statobj.stdev = Math.sqrt(statobj.variance)
    return statobj
}
function sim(arr,comp){
    entries = []
    thisvec = new vector(...comp)
    for(var i of arr){
        var vecthold = new vector(...i)
        entries.push([i,vector.dist(thisvec,vecthold),arr.indexOf(i)])
    }
    entries.sort((a,b)=>{return a[1]-b[1]})
    var obj = {
        arr:entries[0][0],
        comparr:comp,
        dist:entries[0][1],
        index:entries[0][2]
    }
    return obj
}
function int(func,start,end,inc){
    var sum = 0
    for(var i = start;i < end;i += inc){
        sum += inc*func(i)
    }
    return sum
}
function diff(func,ptvect,inc){
    var holdarr = []
    for(var i in ptvect){
        var argdupe = [...ptvect]
        argdupe[i] = ptvect[i] + inc
        var vala = func(...argdupe)
        argdupe[i] = ptvect[i] - inc
        var valb = func(...argdupe)
        holdarr.push((vala - valb)/(2*inc))
    }
    return holdarr
}
function euclid(a,b){
    var number = Math.max(a,b);
    var sub = Math.min(a,b)
    while(number != 0){
        number -= Math.floor(number/sub)*sub
        if(number == 0){
            break;
        }
        var hold = number;
        number = sub;
        sub = hold
    }
    return sub;
}
function factor(num){
    var pos = [];
    for(var i = 1;i < Math.ceil(Math.sqrt(num) + 0.1);i++){
        if(num % i == 0){
            pos.push(i,num/i)
        }
    }
    pos = new Set(pos)
    return Array.from(pos)
}