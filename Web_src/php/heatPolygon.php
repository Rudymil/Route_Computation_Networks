<?php
  function fileReader($path){
    if(file_exists($path) && is_readable($path)){
      //print("The file exists.\n");
      $file = fopen($path, 'r');
      $filesize = filesize($path);
      //print("<p>Taille du fichier : " . $filesize . " octets</p>");

      $content = fread($file, $filesize);

      $result = fclose($file);
      //print("<p>Resultat : ");

      if ($result) {
        /*print("Succès !</p>");
        print("<p>Le contenu du fichier est :<br>");
        print($content . "</p>");*/
        return $content;
      }
    }
    else{
      //print("The file $path not exists !");
      return("The file $path not exists !");
    }
  }

  print(fileReader("../data/querylatlon.json"));
?>
