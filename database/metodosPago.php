<?php
include 'conexion.php';

if (isset($_POST['id_compra'])) {

	$conn = conectar();
	$idcompra = $_POST['id_compra'];
	$sql = "SELECT * FROM compra WHERE id_compra=$idcompra";
	$result = $conn->query($sql);

	$data=[];
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	    array_push($data,$row);
	  }
	}
	echo json_encode($data);
	// print_r($data[0]['preciototal']);die();
	$conn->close();
}

?>