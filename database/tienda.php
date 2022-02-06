<?php
include 'conexion.php';
// print_r($_POST['condicion']);

if ($_POST['condicion']=='productos') {
	$conn = conectar();
	$sql = <<<FIN
	SELECT id,nombre,categoria,modelo,marca,moneda,precio,descripcion,imagen FROM productos
FIN;

if (isset($_POST['marca']) && !empty($_POST['marca'])) {
	$marca = "'".$_POST['marca']."'";
	$sql = <<<FIN
	SELECT id,nombre,categoria,modelo,marca,moneda,precio,descripcion,imagen FROM productos
	where marca in ($marca)
FIN;
	// print_r($sql);die();
}

if (isset($_POST['categoria']) && !empty($_POST['categoria'])) {
	$categoria = "'".$_POST['categoria']."'";
	$sql = <<<FIN
	SELECT id,nombre,categoria,modelo,marca,moneda,precio,descripcion,imagen FROM productos
	where categoria in ($categoria)
FIN;
	// print_r($sql);die();
}

if (
	(isset($_POST['precio1']) && !empty($_POST['precio1'])) &&
	(isset($_POST['precio2']) && !empty($_POST['precio2']))
) {
	$precio1 = "'".$_POST['precio1']."'";
	$precio2 = "'".$_POST['precio2']."'";
	$sql = <<<FIN
	SELECT id,nombre,categoria,modelo,marca,moneda,precio,descripcion,imagen FROM productos
	where precio >=$precio1 and precio <=$precio2
FIN;
	// print_r($sql);die();
}

	$result = $conn->query($sql);
	// print_r($result);
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