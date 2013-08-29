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
      var onlycond = 0;
      var onlycl = 0;
      var condcl = 0; 
      for(i = 0; i < max; i++)
      {
        eval("var notnam = data.contents.NOTAMs.Airports." + code + "[i].NOTAMNumber");
        eval("var notcond = data.contents.NOTAMs.Airports." + code + "[i].Condition");
        eval("var notcl = data.contents.NOTAMs.Airports." + code + "[i].keyword");
        var notnam = notnam.substring(0, 3) + notnam.substring(3);
        var altname = code + "-" + notnam;
        if(name != null && name != "")
        {
          if(notnam == name || altname == name)
          {
            eval("var imgurl = findUrl(\"" + code + "\"," + "data.contents.NOTAMs.Airports." + code + "[i].Geometry, lat, longi)");
            eval('$(\"#col1\").append(\'<li><div onclick=\\\"$(\\\'#img' + (i+1) + '\\\').toggle();$(\\\'#title' + (i+1) + '\\\').toggle();$(\\\'.content' + (i+1) + '\\\').toggle()\" class =\\\"card\\\" id = \\\"card' + (i+1) + '\\\"><p id=\\\"title' + (i+1) + '\\\" class =\\\"card-title\\\">' +  "\' + parseTitle(data.contents.NOTAMs.Airports." + code + "[i].Condition) + \"</p><p class=\\\"content" + (i+1) + "\\\">\" + startDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p><p class=\\\"content" + (i+1) + "\\\">\" + endDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p> <img style=\\\" margin-left:auto; margin-right: auto;display:block;\\\" id=\\\"img" + (i+1) + "\\\" src=\\\"" + imgurl + "\\\"> </div></li>\");");
            eval("hidePoint(data.contents.NOTAMs.Airports."+ code + "[i].Geometry, \"img\" + (i+1));");
            eval("$(\"#headtop\").empty().append(\"Filtered NOTAMs: 1\")");
            document.getElementById("notname").value = '';
            document.getElementById("cond").value = '';
            document.getElementById("cl").value = '';
            return;
          }
          else if(i == max - 1)
          {
            alert("No NOTAMs with that NOTAM Number exist!");
            eval("$(\"#headtop\").empty().append(\"Filtered NOTAMs: 0\")");
            document.getElementById("notname").value = '';
            document.getElementById("cond").value = '';
            document.getElementById("cl").value = '';
            return;
          }
          else continue;
        }

        else if((cond != null && cond != "") && (cl == null || cl == ""))
        {
          cond = cond.toUpperCase();
           if(notcond.indexOf(cond) >= 0)  
           {
            eval("var imgurl = findUrl(\"" + code + "\"," + "data.contents.NOTAMs.Airports." + code + "[i].Geometry, lat, longi)");
            eval('$(\"#col1\").append(\'<li><div onclick=\\\"$(\\\'#img' + (onlycond+1) + '\\\').toggle();$(\\\'#title' + (onlycond+1) + '\\\').toggle();$(\\\'.content' + (onlycond+1) + '\\\').toggle()\" class =\\\"card\\\" id = \\\"card' + (onlycond+1) + '\\\"><p id=\\\"title' + (onlycond+1) + '\\\" class =\\\"card-title\\\">' +  "\' + parseTitle(data.contents.NOTAMs.Airports." + code + "[i].Condition) + \"</p><p class=\\\"content" + (onlycond+1) + "\\\">\" + startDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p><p class=\\\"content" + (onlycond+1) + "\\\">\" + endDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p> <img style=\\\" margin-left:auto; margin-right: auto;display:block;\\\" id=\\\"img" + (onlycond+1) + "\\\" src=\\\"" + imgurl + "\\\"> </div></li>\");");
            eval("hidePoint(data.contents.NOTAMs.Airports."+ code + "[i].Geometry, \"img\" + (onlycond+1));");
            onlycond++;
           }


           if(i == max - 1 && onlycond == 0)
          {
             alert("No NOTAMs with that condition exist!"); 
            eval("$(\"#headtop\").empty().append(\"Filtered NOTAMs: 0\")");
            document.getElementById("notname").value = '';
            document.getElementById("cond").value = '';
            document.getElementById("cl").value = '';
            return;
          }
          

          if(i == max - 1 && onlycond > 0)
          {
            eval("$(\"#headtop\").empty().append(\"Filtered NOTAMs: "+ onlycond + "\")"); 
            document.getElementById("notname").value = '';
            document.getElementById("cond").value = '';
            document.getElementById("cl").value = '';
            return;
          }

        }

        else if((cond == null || cond == "") && (cl != null && cl != ""))
        {
           if(notcl.toUpperCase() == cl.toUpperCase())  
           {
            eval("var imgurl = findUrl(\"" + code + "\"," + "data.contents.NOTAMs.Airports." + code + "[i].Geometry, lat, longi)");
            eval('$(\"#col1\").append(\'<li><div onclick=\\\"$(\\\'#img' + (onlycl+1) + '\\\').toggle();$(\\\'#title' + (onlycl+1) + '\\\').toggle();$(\\\'.content' + (onlycl+1) + '\\\').toggle()\" class =\\\"card\\\" id = \\\"card' + (onlycl+1) + '\\\"><p id=\\\"title' + (onlycl+1) + '\\\" class =\\\"card-title\\\">' +  "\' + parseTitle(data.contents.NOTAMs.Airports." + code + "[i].Condition) + \"</p><p class=\\\"content" + (onlycl+1) + "\\\">\" + startDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p><p class=\\\"content" + (onlycl+1) + "\\\">\" + endDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p> <img style=\\\" margin-left:auto; margin-right: auto;display:block;\\\" id=\\\"img" + (onlycl+1) + "\\\" src=\\\"" + imgurl + "\\\"> </div></li>\");");
            eval("hidePoint(data.contents.NOTAMs.Airports."+ code + "[i].Geometry, \"img\" + (onlycl+1));");
            onlycl++;
           }


           if(i == max - 1 && onlycl == 0)
          {
             alert("No NOTAMs with that class exist!"); 
            eval("$(\"#headtop\").empty().append(\"Filtered NOTAMs: 0\")");
            document.getElementById("notname").value = '';
            document.getElementById("cond").value = '';
            document.getElementById("cl").value = '';
            return;
          }
          

          if(i == max - 1 && onlycl > 0)
          {
            eval("$(\"#headtop\").empty().append(\"Filtered NOTAMs: "+ onlycl + "\")"); 
            document.getElementById("notname").value = '';
            document.getElementById("cond").value = '';
            document.getElementById("cl").value = '';
            return;
          }

        }

        else if((cond != null && cond != "") && (cl != null && cl != ""))
        {
          cond.toUpperCase();
           if(notcond.indexOf(cond) >= 0 && notcl.toUpperCase() == cl.toUpperCase())  
           {
            eval("var imgurl = findUrl(\"" + code + "\"," + "data.contents.NOTAMs.Airports." + code + "[i].Geometry, lat, longi)");
            eval('$(\"#col1\").append(\'<li><div onclick=\\\"$(\\\'#img' + (condcl+1) + '\\\').toggle();$(\\\'#title' + (condcl+1) + '\\\').toggle();$(\\\'.content' + (condcl+1) + '\\\').toggle()\" class =\\\"card\\\" id = \\\"card' + (condcl+1) + '\\\"><p id=\\\"title' + (condcl+1) + '\\\" class =\\\"card-title\\\">' +  "\' + parseTitle(data.contents.NOTAMs.Airports." + code + "[i].Condition) + \"</p><p class=\\\"content" + (condcl+1) + "\\\">\" + startDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p><p class=\\\"content" + (condcl+1) + "\\\">\" + endDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p> <img style=\\\" margin-left:auto; margin-right: auto;display:block;\\\" id=\\\"img" + (condcl+1) + "\\\" src=\\\"" + imgurl + "\\\"> </div></li>\");");
            eval("hidePoint(data.contents.NOTAMs.Airports."+ code + "[i].Geometry, \"img\" + (condcl+1));");
            condcl++;
           }


           if(i == max - 1 && condcl == 0)
          {
             alert("No NOTAMs with that condition exist!"); 
            eval("$(\"#headtop\").empty().append(\"Filtered NOTAMs: 0\")");
            document.getElementById("notname").value = '';
            document.getElementById("cond").value = '';
            document.getElementById("cl").value = '';
            return;
          }
          

          if(i == max - 1 && condcl > 0)
          {
            eval("$(\"#headtop\").empty().append(\"Filtered NOTAMs: "+ condcl + "\")"); 
            document.getElementById("notname").value = '';
            document.getElementById("cond").value = '';
            document.getElementById("cl").value = '';
            return;
          }

        }

      }

    });
}
function unfilter()
{
    var code  = window.localStorage.getItem('tempair');
     var a = $.getJSON("http://anyorigin.com/get?url=http://puneeth.org/notamWFS/" + code + ".json&callback=?", function(data)
    {
     eval("var max = data.contents.NOTAMs.Airports." + code + ".length;");
     if(max == 0) alert("No NOTAMs found for " + code);
     var i;
       eval("$(\"#headtop\").empty().append(\"" + code + " NOTAMS: \" + data.contents.NOTAMs.Airports." + code + ".length);");
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
        eval("var imgurl = findUrl(\"" + code + "\"," + "data.contents.NOTAMs.Airports." + code + "[i].Geometry, lat, longi)");
        eval('$(\"#col1\").append(\'<li><div onclick=\\\"$(\\\'#img' + (i+1) + '\\\').toggle();$(\\\'#title' + (i+1) + '\\\').toggle();$(\\\'.content' + (i+1) + '\\\').toggle()\" class =\\\"card\\\" id = \\\"card' + (i+1) + '\\\"><p id=\\\"title' + (i+1) + '\\\" class =\\\"card-title\\\">' +  "\' + parseTitle(data.contents.NOTAMs.Airports." + code + "[i].Condition) + \"</p><p class=\\\"content" + (i+1) + "\\\">\" + startDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p><p class=\\\"content" + (i+1) + "\\\">\" + endDate(data.contents.NOTAMs.Airports." + code + "[i].Domestic) + \"</p> <img style=\\\" margin-left:auto; margin-right: auto;display:block;\\\" id=\\\"img" + (i+1) + "\\\" src=\\\"" + imgurl + "\\\"> </div></li>\");");
        eval("hidePoint(data.contents.NOTAMs.Airports."+ code + "[i].Geometry, \"img\" + (i+1));");
        }

        document.getElementById("notname").value = '';
        document.getElementById("cond").value = '';
        document.getElementById("cl").value = '';
        return;
        });
}
