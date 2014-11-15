<?php
  $con=mysqli_connect("localhost","root","","wordydb");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $result = mysqli_query($con, "SELECT * FROM themes");

  $arr = array();
  while($row = mysqli_fetch_array($result)) {
    array_push($arr, $row['name']);
  }

  $jsonArray = json_encode($arr);
  echo $jsonArray;

  mysqli_close($con);
?>
