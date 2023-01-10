    #include <stdio.h>
    #include <stdlib.h>
    #include <time.h>
    int main(){
    srand(time(0));
    printf("You probably have heard of Hangman.The AI will create a random string of letters,and you will have to guess it.\nDon't enter a string or you will break the system\n");
    char alphabet[] = "abcdefghijklmnopqrstuvwxyz";
    char numofLet = rand() % 16;
    char word[numofLet];
    char show[numofLet];
    char guess;
    int tries = 10;
    for(int c = 0;c < numofLet;c++){
        word[c] = alphabet[rand() % 27];
        show[c] = '-';
    }
    while(tries < 0){
        printf("Guess a letter:");
        scanf("%c",guess);
        tries--;
    }
    }