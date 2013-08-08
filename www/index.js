var a = $.getJSON("http://anyorigin.com/get?url=puneeth.org/notamWFS/IAD.json&callback=?", function(data)
    {
      var max = data.contents.NOTAMs.Airports.IAD.length;
      var i;
	$("#headtop").append(" NOTAMS: " + data.contents.NOTAMs.Airports.IAD.length);
	$("#num").append(data.contents.NOTAMs.Airports.IAD.length);

      for(i = 0; i < max; i++)
{
    $("#col1").append('<li><div class =\"card\"><p class =\"card-title\">IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p>" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p></div></li>");
        }

        });

