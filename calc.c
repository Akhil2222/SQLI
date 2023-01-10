#include <stdio.h>
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
    char choice;
    printf("Type + for addition,- for subtrcation,* for multiplication,/ for division,and e to exit: ");   
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
int main(){
    char choice;
    printf("Type + for addition,- for subtrcation,* for multiplication,/ for division,and e to exit: ");   
    scanf("%c",&choice);
    if(choice == '+'){
        Addition();
    }else if(choice == '-'){
        Subtraction();
    }else if(choice == '*'){
        Multiply();
    }else if(choice == '/'){
        Division();
    }
}