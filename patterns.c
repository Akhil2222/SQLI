#include <stdio.h>
unsigned int till;
int i;
void fibinacci(){
    printf("Stop at step(Max is 44): ");
    scanf("%u",&till);
    int prev = 1;
    int x = 1;
    for(i = 0;i < till;++i){
        x += prev;
        printf("%i,",x);
        prev = x - prev;
    }   
}
int main(){
    char choice;
    printf("Click p for  and f for fibinacci: ");
    scanf("%c",&choice);
    if(choice == 'p'){
        palendrome();
    }else if(choice == 'f'){
        fibinacci();
    }else{
        printf("It's not a p or a f");
    }
    return 0;
}
