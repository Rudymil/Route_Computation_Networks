<?php

  try {
    $content = file_get_contents("border_polygons.json");

      if ($content === false) {
          // Handle the error
          // echo "failed";
      }

      echo json_encode($content, true);

  } catch (Exception $e) {
      // Handle exception
      // echo "failed";
  }
?>
