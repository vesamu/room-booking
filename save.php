<?php
  //Save reservation to file
  $file = fopen("reservations.json", "r+") or die("Unable to open file!");
  fseek($file, -1, SEEK_END);
  $txt = ",{\"room\": \"" . $_POST["room"] . "\",";
  fwrite($file, $txt);
  $txt = " \"date\": \"" . $_POST["date"] . "\"}\n]";
  fwrite($file, $txt);
  fclose($file);
?> 