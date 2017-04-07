<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>warning_zone</h1>
    <form class="" action="../api/server.php" method="post">
      <input type="hidden" name="DEBUG">
      <textarea rows="8" cols="125" name="warning_zone">{"type":"FeatureCollection","zone_type":"warning_zone","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0496536916202,4.851353550492],[7.0510942257049,4.8472069037448],[7.0582968961281,4.8489612573988],[7.0587770741564,4.8540648057486],[7.0496536916202,4.851353550492]]]},"properties":{"risk_type":1,"description":"testtdmkeivfjzpormg", "expiration_date":"2017-06-01"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0424510211969,4.8657071308718],[7.0432513179106,4.8620390227449],[7.0390897749994,4.860922638045],[7.0378093002575,4.8637933378205],[7.0424510211969,4.8657071308718]]]},"properties":{"risk_type":3,"description":"bla bla bla", "expiration_date":"2017-06-01"}}]}</textarea>
      <input type="submit" name="name" value="INSERT">
    </form>
    <form class="" action="../api/server.php" method="post">
      <input type="hidden" name="DEBUG">
      <input type="hidden" name="action" value="update">
      <textarea rows="8" cols="125" name="warning_zone">{"type":"FeatureCollection","zone_type":"warning_zone","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[13.227944321366,-8.834868131113],[13.226583816953,-8.8358170914163],[13.229144766437,-8.8381104020621],[13.230585300522,-8.8372405272902],[13.227944321366,-8.834868131113]]]},"properties":{"id":5,"risk_type":1,"description":"test","intensity":60,"expiration_date":"2017-06-01"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[13.24451046334,-8.8180236794444],[13.243069929255,-8.8204752671619],[13.252833549162,-8.8241130770021],[13.253393756862,-8.8222941765631],[13.24451046334,-8.8180236794444]]]},"properties":{"id":7,"risk_type":2,"description":"test descr de mise à jour. léglise de la ville","intensity":90,"expiration_date":"2017-06-01"}}]}</textarea>
      <input type="submit" name="name" value="UPDATE">
    </form>

    <h1>anomaly_zone</h1>
    <form class="" action="../api/server.php" method="post">
      <input type="hidden" name="DEBUG">
      <textarea rows="8" cols="125" name="anomaly_zone">{"type":"FeatureCollection","zone_type":"anomaly_zone","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0496536916202,4.851353550492],[7.0510942257049,4.8472069037448],[7.0582968961281,4.8489612573988],[7.0587770741564,4.8540648057486],[7.0496536916202,4.851353550492]]]},"properties":{"anomaly_type":1,"description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "expiration_date":"2017-06-01"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0424510211969,4.8657071308718],[7.0432513179106,4.8620390227449],[7.0390897749994,4.860922638045],[7.0378093002575,4.8637933378205],[7.0424510211969,4.8657071308718]]]},"properties":{"anomaly_type":3,"description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "expiration_date":"2017-06-01"}}]}</textarea>
      <input type="submit" name="name" value="INSERT">
    </form>
    <form class="" action="../api/server.php" method="post">
      <input type="hidden" name="DEBUG">
      <input type="hidden" name="action" value="update">
      <textarea rows="8" cols="125" name="anomaly_zone">{"type":"FeatureCollection","zone_type":"anomaly_zone","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0496536916202,4.851353550492],[7.0510942257049,4.8472069037448],[7.0582968961281,4.8489612573988],[7.0587770741564,4.8540648057486],[7.0496536916202,4.851353550492]]]},"properties":{"id":1,"anomaly_type":1,"description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","expiration_date":"2017-06-01"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[7.0424510211969,4.8657071308718],[7.0432513179106,4.8620390227449],[7.0390897749994,4.860922638045],[7.0378093002575,4.8637933378205],[7.0424510211969,4.8657071308718]]]},"properties":{"id":2,"anomaly_type":3,"description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","expiration_date":"2017-06-01"}}]}</textarea>
      <input type="submit" name="name" value="UPDATE">
    </form>

    <h1>waypoint</h1>
    <form class="" action="../api/server.php" method="post">
      <input type="hidden" name="DEBUG">
      <textarea rows="4" cols="125" name="waypoint">{"type":"Point", "waypoint":"start", "coordinates":[8.097,9.592]}</textarea>
      <input type="submit" name="name" value="INSERT">
    </form>

    <h1>Delete</h1>
    <form class="" action="../api/server.php" method="get">
      <input type="hidden" name="DEBUG">
      <input type="hidden" name="action" value="delete">
      <input type="text" name="type" value="warning_zone">
      <input type="text" name="id" value="1">
      <input type="submit" name="name" value="Submit">
    </form>
  </body>
</html>
