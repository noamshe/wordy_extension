/**
 * Created by IntelliJ IDEA.
 * User: noam
 * Date: 21/11/14
 * Time: 00:38
 */
<?php
$con=mysqli_connect("localhost","root","","wordydb");
// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$result = mysqli_query($con, "SELECT * FROM archive where theme_id = ".$_POST["theme_id"]);

$arr = array();
while($row = mysqli_fetch_array($result)) {
    $arr[$row['id']] = $row['word'];
}

$jsonArray = json_encode($arr);
echo $jsonArray;

mysqli_close($con);
?>
