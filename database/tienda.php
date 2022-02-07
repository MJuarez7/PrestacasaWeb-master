<?php
include 'conexion.php';
// print_r($_POST);
// print_r(isset($_POST['precio2']) && !empty($_POST['precio2'])?'SI':'NO');
// die();

if ($_POST['condicion']=='productos') {
$wheremarca ="1=1";
$wherecategoria ="1=1";
$whereprecio1 ="1=1";
$whereprecio2 ="1=1";
// print_r($_POST);die();
	if (isset($_POST['marca'])) {
		$marca = [];
		foreach ($_POST['marca'] as $key => $value) {
			// print_r($key);
			$marca[]="'".$key."'";
		}
		$marcas = implode(",", $marca);
		// print_r($marcas);
// 		$sql = <<<FIN
// 		SELECT id,nombre,categoria,modelo,marca,moneda,precio,descripcion,imagen FROM productos
// 		where marca in ($marcas)
// FIN;
		// print_r($marca);
		$wheremarca = count($marca)>0?"marca in ($marcas)":"1=1";
	}
	if (isset($_POST['categoria'])) {
		$categoria = [];
		foreach ($_POST['categoria'] as $key => $value) {
			// print_r($key);
			$categoria[]="'".$key."'";
		}
		$categorias = implode(",", $categoria);
// 		$sql = <<<FIN
// 		SELECT id,nombre,categoria,modelo,marca,moneda,precio,descripcion,imagen FROM productos
// 		where categoria in ($categorias)
// FIN;
		$wherecategoria = count($categoria)>0?"categoria in ($categorias)":"1=1";
	}
	if (isset($_POST['precio1']) && !empty($_POST['precio1'])) {
		$precio1 = $_POST['precio1'];
		$whereprecio1 = "precio >= ($precio1)";
	}
	if (isset($_POST['precio2']) && !empty($_POST['precio2'])) {
		$precio2 = $_POST['precio2'];
		$whereprecio2 = "precio <= ($precio2)";
	}
	$conn = conectar();
	$sql = <<<FIN
	SELECT id,nombre,categoria,modelo,marca,moneda,precio,descripcion,imagen FROM productos where $wheremarca and $wherecategoria and $whereprecio1 and $whereprecio2
FIN;
	// print_r($sql);
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
			'descripcion'=>htmlentities($row['descripcion']),
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