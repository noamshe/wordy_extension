<?php
  $con=mysqli_connect("localhost","root","","wordydb");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $result = mysqli_query($con, "SELECT * FROM archive");

  $jsonArray = "[";
  while($row = mysqli_fetch_array($result)) {
    $jsonObject = array();
    $jsonObject[$row['word']] = $row['def1'];
    $jsonArray .= json_encode($jsonObject);
    $jsonArray .= ",";
  }

  $jsonArray = rtrim($jsonArray, ",");
  $jsonArray .= "]";

  echo $jsonArray;//echo '[{"a":"1"},{"2":"5"}]';

  mysqli_close($con);
?>
