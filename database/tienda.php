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
// print_r($_POST['condicion']);
if ($_POST['condicion']=='catalogo') {

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

}

if ($_POST['condicion']=='categoria') {

	$sql = "SELECT distinct categoria FROM productos";
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

}


if ($_POST['condicion']=='modelo') {

	$sql = "SELECT distinct modelo FROM productos";
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

}


if ($_POST['condicion']=='marca') {

	$sql = "SELECT distinct marca FROM productos";
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

}

?>