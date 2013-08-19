function filter()
{
    
    var code  = window.localStorage.getItem('tempair');
     var a = $.getJSON("http://anyorigin.com/get?url=http://puneeth.org/notamWFS/" + code + ".json&callback=?", function(data)
    {
     eval("var max = data.contents.NOTAMs.Airports." + code + ".length;");
     if(max == 0) alert("No NOTAMs found for " + code);
     var i;
      eval("$(\"#num\").empty().append(\"Number of NOTAMs: \" + data.contents.NOTAMs.Airports." + code + ".length);");
      eval("$(\"#mapimg\").attr(\"src\",\"http://maps.googleapis.com/maps/api/staticmap?center=\" +  data.contents.NOTAMs.Airports." + code + "[0].Latitude + \",\" + data.contents.NOTAMs.Airports." + code + "[0].Longitude + \"&zoom=13&size=150x150&sensor=false\")");          
      eval("var lat  = data.contents.NOTAMs.Airports." + code + "[0].Latitude");
      eval("var longi = data.contents.NOTAMs.Airports." + code + "[0].Longitude");
      var name = document.getElementById("notname").value;
      var cond = document.getElementById("cond").value;
      var cl = document.getElementById("cl").value;

      $("#col1").empty();
      for(i = 0; i < max; i++)
      {
        eval("var notnam = data.contents.NOTAMs.Airports." + code + "[i].NOTAMNumber");
        var notnam = notnam.substring(0, 3) + notnam.substring(3);
        var altname = code + "-" + notnam;
        if(name != null && name != "" && (notnam == name || altname == name))
        {
          eval("var imgurl = findUrl(\"" + code + "\"," + "data.contents.NOTAMs.Airports." + code + "[i].Geometry, lat, longi)");
          eval('$(\"#col1\").append(\'<li><div onclick=\\\"$(\\\'#img' + (i+1) + '\\\').toggle();$(\\\'#title' + (i+1) + '\\\').toggle();$(\\\'#content' + (i+1) + '\\\').toggle()\" class =\\\"card\\\" id = \\\"card' + (i+1) + '\\\"><p id=\\\"title' + (i+1) + '\\\" class =\\\"card-title\\\">' + code + "-\' + data.contents.NOTAMs.Airports." + code + "[i].NOTAMNumber + \"</p><p id=\\\"content" + (i+1) + "\\\">\" + data.contents.NOTAMs.Airports." + code + "[i].Domestic + \"</p> <img style=\\\" margin-left:auto; margin-right: auto;display:block;\\\" id=\\\"img" + (i+1) + "\\\" src=\\\"" + imgurl + "\\\"> </div></li>\");");
          eval("hidePoint(data.contents.NOTAMs.Airports."+ code + "[i].Geometry, \"img\" + (i+1));");
          eval("$(\"#headtop\").empty().append(\"" + code + " NOTAMS: 1");
          return false;
        }
      }

    });
}
