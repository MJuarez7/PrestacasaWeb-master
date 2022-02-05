<?php
include 'conexion.php';

if ($_POST['condicion']=='modelo') {
	$conn = conectar();
	$sql = "SELECT distinct modelo FROM productos";
	$result = $conn->query($sql);

	$data=[];
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	    array_push($data,$row);
	  }
	}
	echo json_encode($data);
	$conn->close();

}

?>