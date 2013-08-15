import java.io.*;
import java.util.*;

public class makehtml
{
	public static void main(String[] args)throws Exception
	{
		BufferedReader br = new BufferedReader(new FileReader("input.txt"));
    PrintWriter pw = new PrintWriter(new BufferedWriter(new FileWriter("out.txt")));
     
		BufferedReader b = new BufferedReader(new FileReader("designators.txt"));

    ArrayList<String> list = new ArrayList<String>();
    for(int i = 0; i < 812; i++)
      list.add(b.readLine());
    b.close();
    int count = 0;
		for(int i = 0; i < 797; i++)
		{
      String s = br.readLine();
      if(s.length() == 0 || s.length() == 1 || s.indexOf("All airports") > 0 || s.indexOf("return to top") > 0) continue;
      StringTokenizer st = new StringTokenizer(s, "(");
      String temp = st.nextToken();
      String id = st.nextToken();
      id = id.substring(0, id.length() - 1);
      if(list.contains(id))
      {
        count ++;
       System.out.println("<li><a id=\"" + id + "\" onclick=\"storeID(this)\" rel=\"external\" href=\"index.html\">" + s + "</a></li>");
      }
		}
	}
}
