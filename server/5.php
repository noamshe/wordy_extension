<?php
  $con=mysqli_connect("localhost","root","","wordydb");
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $result = mysqli_query($con, "SELECT id, word FROM archive");
  header('Content-Type: text/html; charset=UTF-8'); 
  echo "<table border='1'>
  <tr>
  <th>Word</th>
  </tr>";

  $array = array();
  while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['word'] . "</td>";
    echo "</tr>";
  }
  echo "</table>";
  mysqli_close($con);
?>
<script language="javascript">
  console.log("hello");
</script>
