<?php 
include 'conexion.php';

if ($_POST['condicion']=='departamento') {
	$conn = conectar();
	$sql = "SELECT idDepa,departamento FROM ubdepartamento";
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

if ($_POST['condicion']=='provincia') {
	$wheredep = "1=1";
	if ($_POST['idDepa']) {
		$depa = $_POST['idDepa'];
		$wheredep = "idDepa = $depa";
	}
	$conn = conectar();
	$sql = "SELECT idProv,provincia,idDepa FROM ubprovincia where $wheredep";
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

if ($_POST['condicion']=='distrito') {
	$whereprov = "1=1";
	if ($_POST['idProv']) {
		$prov = $_POST['idProv'];
		$whereprov = "idProv = $prov";
	}
	$conn = conectar();
	$sql = "SELECT idDist,distrito,idProv FROM ubdistrito where $whereprov";
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