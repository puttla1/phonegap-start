function getPolygonUrl(geo)
{
  return "";
}
function getPointUrl(geo)
{
  alert("used this");
  var coords = geo.split(" ");
  return "http://maps.googleapis.com/maps/api/staticmap?center=" + coords[1] + "," + coords[0] +"&zoom=12&size=200x200&sensor=false";

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
function makePoly(geo, id)
{
  return;
}
function initPoint(coor, id)
{
  var map;
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(coor[1], coor[0]),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById(id), mapOptions);
  
  google.maps.event.addListenerOnce(map, 'idle', function() {
  var div = document.getElementById(id); 
  div.style.display = "none"; 
  div.style.position = "relative"; 
  div.style.left = "0px"; 
});  
}
function makePoint(geo, id)
{
    var coords = geo.split(" ");
    initPoint(coords, id);

}
function makeShape(geometry, id)
{
  if(geometry == "null") return;

  var arr = geometry.split("(");

  if(arr[0] == "POINT")
  {
    makePoint(arr[1].substring(0,arr[1].length-1), id);
  }
  if(arr[0] == "POLYGON")
  {
    makePoly(arr[2].substring(0,arr[2].length-2), id);
  }
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
        //$("#col1").append('<li><div onclick=\"$(\'#img' + (i+1) + '\').toggle();$(\'#title'+ (i+1) + '\').toggle();$(\'#content'+(i+1)  + '\').toggle();\" class =\"card\"><p class =\"card-title\" id=\"title' + (i+1) + '\" >IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p id=\"content" + (i+1) + "\">" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p> <img style=\"display:none; margin-left:auto; margin-right:auto;\" id=\"img" + (i+1) + "\" src=\""+imgurl+ "\"> </div></li>");
        $("#col1").append('<li><div onclick=\"$(\'#img' + (i+1) + '\').toggle();$(\'#title'+ (i+1) + '\').toggle();$(\'#content'+(i+1)  + '\').toggle();\" class =\"card\"><p class =\"card-title\" id=\"title' + (i+1) + '\" >IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p id=\"content" + (i+1) + "\">" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p> <div id=\"img" + (i+1) + "\" style=\"display:block;position:absolute;left:-1000px;width:400px; height:400px;\"> </div></li>");
        makeShape(data.contents.NOTAMs.Airports.IAD[i].Geometry, "img" + (i+1));
      }

    });

