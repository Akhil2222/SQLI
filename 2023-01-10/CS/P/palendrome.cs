using System;
public class Palendrome{
    public static void Main(string[] args){
        int start = 10;
        Console.WriteLine("Enter the ending digit: ");
        int read = Convert.ToInt32(Console.ReadLine());
        Console.WriteLine("Palendromes: ");
        for(int i = start;i < read;i++){
            Console.WriteLine(Palendrome.calcPalen(i));
        }
    }
    static string calcPalen(int number){
        string str = Convert.ToString(number);
        string revstr = "";
        for(int i = 0;i < str.Length;i++){
            revstr += str[str.Length - i - 1];
        }
        string rstr = new string(revstr);
        return rstr+str;
    }
}