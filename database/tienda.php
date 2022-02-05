<?php
include 'conexion.php';
// print_r($_POST['condicion']);
$_POST['condicion'] ="productos";
if ($_POST['condicion']=='productos') {
	$conn = conectar();
	$sql = "SELECT id,nombre,categoria,modelo,marca,moneda,precio,descripcion,imagen FROM productos";
	$result = $conn->query($sql);

	$data=[];
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	// print_r($row['id']);
	  	$data[]=[
	  		'id'=>$row['id'],
	  		'nombre'=>htmlentities($row['nombre']),
			'categoria'=>$row['categoria'],
			'modelo'=>$row['modelo'],
			'marca'=>$row['marca'],
			'moneda'=>$row['moneda'],
			'precio'=>$row['precio'],
			'descripcion'=>$row['descripcion'],
			'imagen'=>$row['imagen'],
	  	];
	    // array_push($data,json_encode($row));
	    // print_r($data);
	  }
	}
	// print_r($data);
	echo (json_encode($data));
	$conn->close();

}

?>