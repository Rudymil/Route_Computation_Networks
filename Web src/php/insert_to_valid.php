<?php


	$return = array();
	if ($_SERVER['REQUEST_METHOD'] == 'POST'){

		$_POST = '{"circles":[[[2,43],20],[[2.69,48],48]],"boxes":[[[3,44],[4,45]],[[21,54],[63,54]]],"polygons":[[[2,56],[3,57],[3,56],[2,56]],[[1,2],[3,8],[21,4],[1,2]]]}';
    $request = json_decode($_POST, true);
		//var_dump(json_decode($_POST, true));
    $request_circle = $request['circles'];
    $request_box = $request['boxes'];
    $request_polygon = $request['polygons'];

    // Connexion
		$conn_string = "host=localhost port=5432 dbname=projcomm user=julie password=julie";
		$dbconn = pg_connect($conn_string) or die("Connexion impossible");

		// Circles
		for ($i = 0; $i < sizeOf($request_circle); $i++) {
			$lat = (double)$request_circle[$i][0][0];
			$lng = (double)$request_circle[$i][0][1];
			$radius = (double)$request_circle[$i][1];

			$sql_circle = "INSERT INTO hot_area (type, geom) VALUES ('CIRCLE', ST_Buffer(ST_SetSRID(ST_MakePoint(".$lat.",".$lng."),4326),".$radius."));";

			$circle = pg_query($dbconn, $sql_circle);
		}

		// Boxes
		for ($i = 0; $i < sizeOf($request_box); $i++) {
			$x1 = (double)$request_box[$i][0][0];
			$y1 = (double)$request_box[$i][0][1];
			$x2 = (double)$request_box[$i][1][0];
			$y2 = (double)$request_box[$i][1][1];

			$sql_box = "INSERT INTO hot_area (type, geom) VALUES ('BOX', ST_SetSRID(ST_MakeBox2D(ST_Point(".$x1.", ".$y1."), ST_Point(".$x2.",".$y2.")),4326));";

			$box = pg_query($dbconn, $sql_box);
		}


		// Polygons
		for ($i = 0; $i < sizeOf($request_polygon); $i++) {
			$linestring = "";
			for ($j = 0; $j < sizeOf($request_polygon[$i]); $j++) {
				$lat = (double)$request_polygon[$i][$j][0];
				$lng = (double)$request_polygon[$i][$j][1];

				$linestring .= $lat." ".$lng.",";

			}
			//echo substr($linestring, 0, -1) ."\n";
			$sql_poly = "INSERT INTO hot_area (type, geom) VALUES ('POLYGON', ST_Polygon(ST_GeomFromText('LINESTRING(".substr($linestring, 0, -1).")'), 4326));";
			$poly = pg_query($dbconn, $sql_poly);
		}

		pg_close($dbconn);
	}

	echo json_encode($return);

?>
