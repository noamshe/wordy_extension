<?php
  $con=mysqli_connect("localhost","root","","wordydb");

  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  mysqli_query($con, 'DELETE FROM archive WHERE id = '.$_POST["id"]);

  mysqli_close($con);
?>
