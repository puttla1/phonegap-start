import java.io.*;
import java.util.*;

public class makehtml
{
	public static void main(String[] args)throws Exception
	{
		BufferedReader br = new BufferedReader(new FileReader("input.txt"));
    PrintWriter pw = new PrintWriter(new BufferedWriter(new FileWriter("output.txt")));

		for(int i = 0; i < 797; i++)
		{
      String s = br.readLine();
      if(s.length() == 0 || s.length() == 1 || s.indexOf("All airports") > 0 || s.indexOf("return to top") > 0) continue;
      StringTokenizer st = new StringTokenizer(s ,  "(");
      String full = st.nextToken();
      String code = st.nextToken();

      System.out.println(code.substring(0,3));

		}
	}
}
