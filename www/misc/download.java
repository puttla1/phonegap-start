import java.nio.channels.*;
import java.io.*;
import java.util.*;
import java.net.*;

public class download
{
  public static String format(long min, long sec)
  {
    String minstr, secstr;
    if(min < 10) minstr = "0" + min;
    else minstr = min + "";

    if(sec < 10) secstr = "0" + sec;
    else secstr = sec + "";

    return minstr + ":" + secstr;
  } 
  public static void main(String[] args)throws Exception
  {
  BufferedReader br = new BufferedReader(new FileReader("output.txt"));

  long startotal = System.nanoTime();

  for(int i = 0; i < 4433; i++)
  {
    long startTime = System.nanoTime();
    String code = br.readLine();
    URL website = new URL("http://notamdemo.aim.nas.faa.gov/notamWFSTest/json?Designator=" + code);
    ReadableByteChannel rbc = Channels.newChannel(website.openStream());
    FileOutputStream fos = new FileOutputStream(code + ".json");
    fos.getChannel().transferFrom(rbc, 0, Integer.MAX_VALUE);
    long timeTaken = System.nanoTime() - startotal;
    long seconds = timeTaken/1000000000;
    long minutes = seconds/60;
    long secondsr = seconds % 60;
    System.out.println("Done with " + (i+1) + "/4433 files! " + (double)(i+1)*100/4433 + "% completed! Time taken: " + format(minutes, secondsr));
  }

  long totaltime = System.nanoTime() - startotal;
  long seconds = totaltime/1000000000;
  long minutes = seconds/60;
  long secondsr = seconds % 60;
  System.out.println("Finished! Total time taken: " + format(minutes, secondsr));

}
}
