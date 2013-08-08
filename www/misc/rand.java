import java.io.*;
import java.util.*;

public class rand
{
  public static void main(String[] args)throws Exception
  {
    String s = "234567890-=!@#$%^&*()_+qwertyuiop[]\\|}{asdfghjkl;':\"\',./<>?zxcvbnm%&)#";

    while(true)
    {
      System.out.print(s.charAt((int)(Math.random()*s.length())));
//      Thread.sleep(3);
    }
  }
  
}
