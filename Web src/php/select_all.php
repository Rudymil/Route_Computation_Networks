<?php

	$return = array();
	$return['circles'] = array();
	$return['boxes'] = array();
	$return['polygons'] = array();
	if ($_SERVER['REQUEST_METHOD'] == 'POST'){

		$request = $_POST;
		$conn_string = "host=localhost port=5432 dbname=projcomm user=postgres";
		$dbconn = pg_connect($conn_string) or die("Connexion impossible");

		// Circles
		$sql_circle = "SELECT ST_X(ST_centroid(geom)), ST_Y(ST_centroid(geom)), ST_MaxDistance(ST_centroid(geom), geom) FROM hot_area WHERE type = 'CIRCLE';";
		$circle = pg_query($dbconn, $sql_circle);

		while ($row = pg_fetch_assoc($circle)) {
			$return_circle = array();
			$return_circle = [[(double)$row['st_x'],(double)$row['st_y']],(double)$row['st_maxdistance']];

			$return['circles'][] = $return_circle;
		}

		// Boxes
		$sql_box = "SELECT substring(left(ST_AsText(geom),-2),10) FROM hot_area WHERE type = 'BOX';";
		$box = pg_query($dbconn, $sql_box);

		while ($row = pg_fetch_assoc($box)) {
			$return_box = array();
			$list = split(',', $row['substring']);
      for ($i = 0; $i < sizeOf($list); $i++) {
				$point = split(' ', $list[$i]);
        $return_box[] = [(double)$point[0],(double)$point[1]];
      }
			$return['boxes'][] = $return_box;
		}

		// Polygons
		$sql_poly = "SELECT substring(left(ST_AsText(geom),-2),10) FROM hot_area WHERE type = 'POLYGON';";
		$poly = pg_query($dbconn, $sql_poly);

		while ($row = pg_fetch_assoc($poly)) {
			$return_poly = array();
			$list = split(',', $row['substring']);
      for ($i = 0; $i < sizeOf($list); $i++) {
				$point = split(' ', $list[$i]);
        $return_poly[] = [(double)$point[0],(double)$point[1]];
      }
			$return['polygons'][] = $return_poly;
		}

		pg_close($dbconn);
	}

	echo json_encode($return);

?>
