function getPolygonUrl(geo, lat, longi)
{
  var coords = geo.split(",");
  var width = document.getElementById("card1").clientWidth * .7;
  width = Math.round(width);
  var height = document.getElementById("card1").clientHeight * 2;
  height = Math.round(height);
  
  var s = "http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "" + longi + "&zoom=12&size=" + width + "x" + height + "&maptype=roadmap&sensor=false&path=color:red|weight:5|fillcolor:white";
  var i;
  for(i =0; i < coords.length; i++)
  {
    var fur = coords[i].split(" ");
    s += ("|" + fur[1] + "," + fur[0]);
  }
  return s;
}
function getPointUrl(geo)
{
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
function hidePoint(geometry, id)
{
  var arr = geometry.split("(");
  if(geometry == "null" || arr[0] == "POINT" || arr[0] == "MULTIPOLYGON")
  {
    var elem = document.getElementById(id);
    elem.style.display = "none";
  }
}

function findUrl(code, geometry, lat, longi)
{
  if(geometry == "null") return "";

  var arr = geometry.split("(");

  if(arr[0] == "POINT")
  {
     return getPointUrl(arr[1].substring(0,arr[1].length-1));
  }

  else if(arr[0] == "POLYGON")
  {
     return getPolygonUrl(arr[2].substring(0,arr[2].length-2), lat, longi);
  }

  else if(arr[0] == "MULTIPOLYGON")
  {
    return "";
  }

  else return "";

}
function initPoly(arr, id, lat, longi)
{
    var myLatLng = new google.maps.LatLng(lat, longi);
    var mapOptions = 
    {
      zoom: 12,
      center: myLatLng, mapTypeId: google.maps.MapTypeId.ROADMAP }; var airmap;

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

var code;
if (typeof window.localStorage.getItem('airportcode')!== 'undefined' &&  window.localStorage.getItem('airportcode')!=null) {
    code =  window.localStorage.getItem('airportcode');
     }
else code = "IAD";

var a = $.getJSON("http://anyorigin.com/get?url=puneeth.org/notamWFS/" + code + ".json&callback=?", function(data)
    {
      eval("var max = data.contents.NOTAMs.Airports." + code + ".length;");
      var i;
	  //$("#num").append(data.contents.NOTAMs.Airports.IAD.length);
    eval("$(\"#headtop\").empty().append(\"" + code + " NOTAMS: \" + data.contents.NOTAMs.Airports." + code + ".length);");
    eval("$(\"#num\").empty().append(\"Number of NOTAMs: \" + data.contents.NOTAMs.Airports." + code + ".length);");
    eval("$(\"#mapimg\").attr(\"src\",\"http://maps.googleapis.com/maps/api/staticmap?center=\" +  data.contents.NOTAMs.Airports." + code + "[0].Latitude + \",\" + data.contents.NOTAMs.Airports." + code + "[0].Longitude + \"&zoom=11&size=150x150&sensor=false\")");
    eval("var lat  = data.contents.NOTAMs.Airports." + code + "[0].Latitude");
    eval("var longi = data.contents.NOTAMs.Airports." + code + "[0].Longitude");

      for(i = 0; i < max; i++)
      {
        //var imgurl = findUrl(code, data.contents.NOTAMs.Airports.IAD[i].Geometry, lat, longi);
        //$("#col1").append('<li><div onclick=\"$(\'#img' + (i+1) + '\').toggle();$(\'#title'+ (i+1) + '\').toggle();$(\'#content'+(i+1)  + '\').toggle();\" class =\"card\" id=\"card'+ (i+1) + '\"><p class =\"card-title\" id=\"title' + (i+1) + '\" >IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p id=\"content" + (i+1) + "\">" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p> <img style=\"margin-left:auto;margin-right:auto;\" id=\"img" + (i+1) + "\"  src=\""+imgurl+ "\"> </div></li>");
        //hidePoint(data.contents.NOTAMs.Airports.IAD[i].Geometry, "img" + (i+1));
        //$("#col1").append('<li><div onclick=\"$(\'#img' + (i+1) + '\').toggle();$(\'#title'+ (i+1) + '\').toggle();$(\'#content'+(i+1)  + '\').toggle();\" class =\"card\"><p class =\"card-title\" id=\"title' + (i+1) + '\" >IAD-' + data.contents.NOTAMs.Airports.IAD[i].NOTAMNumber + "</p><p id=\"content" + (i+1) + "\">" + data.contents.NOTAMs.Airports.IAD[i].Domestic + "</p> <div id=\"img" + (i+1) + "\" style=\"display:block;position:absolute;left:-1000px;width:25%; height:7em;\"> </div></li>");
        //makeShape(data.contents.NOTAMs.Airports.IAD[i].Geometry, "img" + (i+1), lat, longi);
        eval("var imgurl = findUrl(\"" + code + "\"," + "data.contents.NOTAMs.Airports." + code + "[i].Geometry, lat, longi)");
        eval('$(\"#col1\").append(\'<li><div onclick=\\\"$(\\\'#img' + (i+1) + '\\\').toggle();$(\\\'#title' + (i+1) + '\\\').toggle();$(\\\'#content' + (i+1) + '\\\').toggle()\" class =\\\"card\\\" id = \\\"card' + (i+1) + '\\\"><p id=\\\"title' + (i+1) + '\\\" class =\\\"card-title\\\">' + code + "-\' + data.contents.NOTAMs.Airports." + code + "[i].NOTAMNumber + \"</p><p id=\\\"content" + (i+1) + "\\\">\" + data.contents.NOTAMs.Airports." + code + "[i].Domestic + \"</p> <img style=\\\" margin-left:auto; margin-right: auto;\\\" id=\\\"img" + (i+1) + "\\\" src=\\\"" + imgurl + "\\\"> </div></li>\");");
        eval("hidePoint(data.contents.NOTAMs.Airports."+ code + "[i].Geometry, \"img\" + (i+1));");
      }

    });

