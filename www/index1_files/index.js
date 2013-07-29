var a = $.getJSON("http://puneeth.org/docs/test.json", function(data)
    {
      var max = data.NOTAMs.Airports.IAD.length;
      var i;

      for(i = 0; i < max; i++)
{
    $("#col1").append('<li><div class =\"card\"><p class =\"card-title\">IAD-' + data.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p>" + data.NOTAMs.Airports.IAD[i].Domestic + "</p></div></li>");
        }

        });

