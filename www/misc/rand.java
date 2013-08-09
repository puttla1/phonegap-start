import java.io.*;
import java.util.*;

public class rand
{
  public static void main(String[] args)throws Exception
  {
    String s = "import java.io.*;\nimport java.util.*;\n\npublic class rand\n{\n\tpublic static void main(String[] args)throws Exception\n{\n\t\tSystem.out.println(\"Hello World!\");\n\t}\n}";

    for(int i =  0;i < s.length(); i++)
    {
      System.out.print(s.charAt(i));
      Thread.sleep(50);
    }

  }
  
}
