var a = $.getJSON("http://anyorigin.com/get?url=puneeth.org/docs/test.json&callback=?", function(data)
    {
      var max = data.contents.NOTAMs.Airports.IAD.length;
      var i;

      for(i = 0; i < max; i++)
{
    $("#col1").append('<li><div class =\"card\"><p class =\"card-title\">IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p>" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p></div></li>");
        }

        });

