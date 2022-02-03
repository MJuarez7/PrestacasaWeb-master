<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "practicasa";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id,nombre,precio,moneda,categoria,stock,descripcion,imagen FROM productos";
$result = $conn->query($sql);

$data=[];
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    array_push($data,$row);
  }
} else {
  echo json_encode(false);
}
echo json_encode($data);
$conn->close();
?>