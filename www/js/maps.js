function getPolygonUrl(geo)
{
  return "";
}
function getPointUrl(geo)
{
  var coords = geo.split(" ");
  return "http://maps.googleapis.com/maps/api/staticmap?center=" + coords[0] + "," + coords[1] +"&zoom=12&size=400x400&sensor=false";

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
