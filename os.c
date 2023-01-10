#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <time.h>
int num1;
int num2;
void Addition(){
    printf("Enter first number: ");
    scanf("%i",&num1);
    printf("Enter second number: ");
    scanf("%i",&num2);
    printf("The answer of %i + %i is %i.",num1,num2,(num1 + num2));
}
void Subtraction(){
    printf("Enter first number: ");
    scanf("%i",&num1);
    printf("Enter second number: ");
    scanf("%i",&num2);
    printf("The answer of %i - %i is %i.",num1,num2,(num1 - num2));
}
void Multiply(){
    printf("Enter first number: ");
    scanf("%i",&num1);
    printf("Enter second number: ");
    scanf("%i",&num2);
    printf("The answer of %i*%i is %i.",num1,num2,(num1 * num2));
}
void Division(){
    printf("Enter first number: ");
    scanf("%i",&num1); 
    printf("Enter second number: ");
    scanf("%i",&num2);
    printf("The answer of %i/%i is %i.",num1,num2,(num1 / num2));
}
void nG(){
    printf("You wil start first.You will give a number from 5 through 10,and then the AI will give a number 5 through 10.The number is 0 now.\nWhoever goes over 100 first loses.DO NOT TYPE IN ANYTHING BUT A NUMBER!\n");
    int i = 0;
    int player;
    bool lose = true;
    while(lose){
        printf("Your number:");
        scanf("%i",&player);
        if(player < 5 || player > 10){
            continue;
        }
        i += player;
        if(i >= 100){
            printf("You lose!\n");
            break;
        }
        i += (5 + rand() % 5);
        if(i >= 100){
            printf("You win!\n");
            break;
        }
        printf("The number:%i\n",i);
    }
}
void guess(){
    printf("Guess the number,and you win!Try to get as few tries as possible.You can choose your range of choice,but the range must be 10 or more.\n");
    int range;
    int tries = 0;
    int number;
    int guess;
    while(true){
        printf("Your range:");
        scanf("%i",&range);
        if(range > 10){
            break;
        }
    }
    number = (1 + (rand() % range));
    while(true){
        tries++;
        printf("Your guess:");
        scanf("%i",&guess);
        if(guess == number){
            printf("You got the number in %i tries",tries);
            break;
        }else if(guess < number && guess > 1){
            printf("Your guess was too low.\n");
        }else if(guess > number && guess < range){
            printf("Your guess was too high.\n");
        }else if(guess > range || guess < 1){
            printf("You guessed out of the range.The range is 1 to %i.\n",range);
        }
    }
}
int main(){
    char choose;
    time_t t;
    time(&t);
    srand(time(0));
    printf("Hello.The time is %s.Type n for a number game,g for a guessing game,+ to add,- to subtract,* to multipy,/ to divide,s to shutdown,r to reboot,and a to learn more:",ctime(&t));
    scanf("%c",&choose);
    if(choose == 'n'){
        nG();
    }else if(choose == 'g'){
        guess();
    }else if(choose == '+'){
        Addition();
    }else if(choose == '-'){
        Subtraction();
    }else if(choose == '*'){
        Multiply();
    }else if(choose == '/'){
        Division();
    }else if(choose == 'a'){
        printf("SimpleOS version 1");
    }
    
}
