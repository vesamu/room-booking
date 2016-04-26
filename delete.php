<?php
  $id = $_POST["id"];
  $find = "\"id\": \"".$id."\"";
  $file = "reservations.json";
  $fileContents = file_get_contents($file);
  $newContents = preg_replace("/.*$find.*\n/","",$fileContents);
  file_put_contents($file,$newContents);
?>