using System.Text;
using System.Security.AccessControl;
using System;
class Hello
{
  static void Main(string[] args)
  {
      string[] a = {"Hello world","Hi","bye"};
      for(int i = 0; i < a.Length; i++){
        System.Console.WriteLine(a[i]);
      }
      System.Console.WriteLine(Convert.ToInt32(1.334));
  }
}
