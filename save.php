<?php
  //Save reservation to file
  $myfile = fopen("reservations.json", "a") or die("Unable to open file!");
  $txt = "{\"room\": \"" . $_POST["room"] . "\",";
  fwrite($myfile, $txt);
  $txt = " \"date\": \"" . $_POST["date"] . "\"},\n";
  fwrite($myfile, $txt);
  fclose($myfile);
?> 