var primes = [];

var number = 2;
var iter = 0;
var push = true;
var fast = true;
if(fast){
    setInterval(() => {
        for(var i of primes){
            if(number % i == 0){
                push = false
            }
        }
        if(push == true){
            primes.push(number)
        }
        push = true;
        number++;
    }, 1);
}else{
    setInterval(() => {
        if(number % primes[iter] == 0){
            push = false;
        }
        iter++
        if(iter >= primes.length){
            if(push == true){
                primes.push(number)
            }
            push = true;
            number++;
            iter = 0;
        }
    }, 1);
}
