var a = $.getJSON("http://anyorigin.com/get?url=puneeth.org/notamWFS/IAD.json&callback=?", function(data)
    {
      var max = data.contents.NOTAMs.Airports.IAD.length;
      var i;
	$("#headtop").append(" NOTAMS: " + data.contents.NOTAMs.Airports.IAD.length);
	$("#num").append(data.contents.NOTAMs.Airports.IAD.length);
    var code = "IAD";
    eval("$(\"#mapimg\").attr(\"src\",\"http://maps.googleapis.com/maps/api/staticmap?center=\" +  data.contents.NOTAMs.Airports." + code + "[0].Latitude + \",\" + data.contents.NOTAMs.Airports." + code + "[0].Longitude + \"&zoom=11&size=150x150&sensor=false\")");
    

      for(i = 0; i < max; i++)
{
    $("#col1").append('<li><div onclick=\"$(\'#img' + (i+1) + '\').toggle();\" class =\"card\"><p class =\"card-title\">IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p>" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p> <img style=\"display:none; margin-left:auto; margin-right:auto;\" id=\"img" + (i+1) + "\" src=\"http://maps.googleapis.com/maps/api/staticmap?center=" + data.contents.NOTAMs.Airports.IAD[i].Latitude + "," + data.contents.NOTAMs.Airports.IAD[i].Longitude + "&zoom=11&size=200x200&sensor=false\"> </div></li>");
        }

        });

