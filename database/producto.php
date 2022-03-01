<?php
include 'conexion.php';
// print_r($_POST);die();


$idproducto = false;
$data=[];
if ($_POST['idproducto']) {
	$idproducto = $_POST['idproducto'];
}
if ($idproducto) {
	$conn = conectar();
	$sql = <<<FIN
	SELECT distinct * FROM productos_info where ID_PRODUCTO='$idproducto'
FIN;
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
	array_push($data,$row);
	}
	}
	echo json_encode($data);
	$conn->close();
}else{
	echo json_encode($data);
}
?>