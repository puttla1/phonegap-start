import java.nio.channels.*;
import java.io.*;
import java.util.*;
import java.net.*;

public class download
{
  public static void main(String[] args)throws Exception
  {
  BufferedReader br = new BufferedReader(new FileReader("output.txt"));

  for(int i = 0; i < 727; i++)
  {
    String code = br.readLine();
    URL website = new URL("http://notamdemo.aim.nas.faa.gov/notamWFSTest/json?Designator=" + code);
    ReadableByteChannel rbc = Channels.newChannel(website.openStream());
    FileOutputStream fos = new FileOutputStream(code + ".json");
    fos.getChannel().transferFrom(rbc, 0, Integer.MAX_VALUE);
    System.out.println("Done with " + (i+1) + "/727 files! " + (double)(i+1)*100/727 + "% completed!");
  }

}
}
