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