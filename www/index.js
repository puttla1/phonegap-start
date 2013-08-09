function getPolygonUrl(geo)
{
  return "";
}
function getPointUrl(geo)
{
  var coords = geo.split(" ");
  return "http://maps.googleapis.com/maps/api/staticmap?center=" + coords[1] + "," + coords[0] +"&zoom=12&size=400x400&sensor=false";

}
function findUrl(code, geometry)
{
  if(geometry == "null") return "";

  var arr = geometry.split("(");

  if(arr[0] == "POINT")
  {
    return getPointUrl(arr[1].substring(0,arr[1].length-1));
  }

  else if(arr[0] == "POLYGON")
  {
     return getPolygonUrl(arr[2].substring(0,arr[2].length-2));
  }

  else return "";

}
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
  var imgurl = findUrl("IAD", data.contents.NOTAMs.Airports.IAD[i].Geometry);
    $("#col1").append('<li><div onclick=\"$(\'#img' + (i+1) + '\').toggle();\" class =\"card\"><p class =\"card-title\">IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p>" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p> <img style=\"display:none; margin-left:auto; margin-right:auto;\" id=\"img" + (i+1) + "\" src=\""+imgurl+ "\"> </div></li>");
        }

        });

