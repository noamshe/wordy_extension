<?php

  
  #file_put_contents('stderr', print_r($_SERVER['HTTP_USER_AGENT'] . "\r\n", TRUE), FILE_APPEND);
  #file_put_contents('stderr', print_r($_SERVER['HTTP_REFERER'] . "\r\n", TRUE), FILE_APPEND);

  $con=mysqli_connect("localhost","root","","wordydb");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  //insert into archive (word,def1,def2,def3, created_at) values ("word2","def1","def2","def3", now());
  mysqli_query($con, 'insert into archive (word,def1,def2,def3, created_at) values ("'.$_POST["word"].'","'.$_POST["def1"].'","def2","def3", now())');

  mysqli_close($con);

?>
