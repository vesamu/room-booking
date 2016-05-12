<?php
  //Save reservation to file
  $file = fopen("reservations.json", "r+") or die("Unable to open file!");
  fseek($file, -1, SEEK_END);
  $txt = ",{\"id\": \"" . $_POST["id"] . "\",";
  fwrite($file, $txt);
  $txt = "\"room\": \"" . $_POST["room"] . "\",";
  fwrite($file, $txt);
  $txt = "\"color\": \"" . $_POST["color"] . "\",";
  fwrite($file, $txt);
  $txt = " \"date\": \"" . $_POST["date"] . "\",";
  fwrite($file, $txt);
  $txt = " \"start\": \"" . $_POST["start"] . "\",";
  fwrite($file, $txt);
   $txt = " \"end\": \"" . $_POST["end"] . "\"}\n]";
  fwrite($file, $txt);
  fclose($file);
?> 