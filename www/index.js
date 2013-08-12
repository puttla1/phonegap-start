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

google.maps.Polygon.prototype.getBounds = function() {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;        
    for (var i = 0; i < paths.getLength(); i++) {
        path = paths.getAt(i);
        for (var ii = 0; ii < path.getLength(); ii++) {
            bounds.extend(path.getAt(ii));
        }
    }
    return bounds;
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
function initPoly(arr, id, lat, longi)
{
    var myLatLng = new google.maps.LatLng(lat, longi);
    var mapOptions = 
    {
      zoom: 12,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  var airmap;

  var map = new google.maps.Map(document.getElementById(id), mapOptions);

  var len = arr.length;

 var polyCoords = new Array(); 

  var i;
  
  for(i = 0; i < len; i++)
  {
    var temparr = arr[i].split(" ");
    console.log(temparr[i] + " " + temparr[0]);
    polyCoords[i] = new google.maps.LatLng(temparr[1], temparr[0]);
  }

  // Construct the polygon
  airmap = new google.maps.Polygon({
    paths: polyCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });

  map.fitBounds(airmap.getBounds());

  airmap.setMap(map);

  google.maps.event.addListenerOnce(map, 'idle', function() 
  {
    var div = document.getElementById(id); 
    div.style.display = "none"; 
    div.style.position = "relative"; 
    div.style.left = "0px"; 
  });  
}
function makePoly(geo, id, lat, longi)
{
  var arr = geo.split(",");


  initPoly(arr, id, lat, longi);
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
function makeShape(geometry, id, lat, longi)
{
  if(geometry == "null") return;

  var arr = geometry.split("(");

  if(arr[0] == "POINT")
  {
    makePoint(arr[1].substring(0,arr[1].length-1), id);
  }
  else if(arr[0] == "POLYGON")
  {
    makePoly(arr[2].substring(0,arr[2].length-2), id, lat, longi);
  }
  else if(arr[0] == "MULTIPOLYGON")
  {
    return; 
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
    eval("var lat  = data.contents.NOTAMs.Airports." + code + "[0].Latitude");
    eval("var longi = data.contents.NOTAMs.Airports." + code + "[0].Longitude");

      for(i = 0; i < max; i++)
      {
        //$("#col1").append('<li><div onclick=\"$(\'#img' + (i+1) + '\').toggle();$(\'#title'+ (i+1) + '\').toggle();$(\'#content'+(i+1)  + '\').toggle();\" class =\"card\"><p class =\"card-title\" id=\"title' + (i+1) + '\" >IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p id=\"content" + (i+1) + "\">" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p> <img style=\"display:none; margin-left:auto; margin-right:auto;\" id=\"img" + (i+1) + "\" src=\""+imgurl+ "\"> </div></li>");
        $("#col1").append('<li><div onclick=\"$(\'#img' + (i+1) + '\').toggle();$(\'#title'+ (i+1) + '\').toggle();$(\'#content'+(i+1)  + '\').toggle();\" class =\"card\"><p class =\"card-title\" id=\"title' + (i+1) + '\" >IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p id=\"content" + (i+1) + "\">" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p> <div id=\"img" + (i+1) + "\" style=\"display:block;position:absolute;left:-1000px;width:99%; height:400px;\"> </div></li>");
        makeShape(data.contents.NOTAMs.Airports.IAD[i].Geometry, "img" + (i+1), lat, longi);
      }

    });

