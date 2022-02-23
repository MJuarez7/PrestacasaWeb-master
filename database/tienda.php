<?php
include 'conexion.php';
// print_r($_POST);
// print_r(isset($_POST['precio2']) && !empty($_POST['precio2'])?'SI':'NO');
// die();

if ($_POST['condicion']=='productos') {
	$whereid ="1=1";
	$wherecategoria ="1=1";
	$whereprecio1 ="1=1";
	$whereprecio2 ="1=1";
	$whereidproducto = "1=1";
	$orderby ="";
	$prodcantidad=[];
	if (isset($_POST['idproducto'])) {
		$whereidproducto = "id = '".$_POST['idproducto']."'";
	}
	$valor = false;
	if (isset($_POST['idproducto']) && isset($_POST['productos'])) {
		// print_r($_POST['idproducto']);echo "\n";
		// print_r($_POST['productos']);echo "\n";
		$prods = [];
		foreach (json_decode($_POST['productos']) as $key => $value) {
			array_push($prods, $value[0]);
		}
		if (!in_array($_POST['idproducto'], $prods)) {
			unset($_POST['productos']);
			$valor = true;
		}
	}
	// die();
	if (isset($_POST['productos'])) {
		$id=[];
		// print_r(json_decode($_POST['productos']));die();
		foreach (json_decode($_POST['productos']) as $key => $value) {
			// print_r($value);
			$id[]="'".$value[0]."'";
			$prodcantidad[$value[0]]=$value[1];
		}
		$ids = implode(",", $id);
		$whereid = "id in ($ids)";
	}
	// print_r($whereid);
	// print_r($prodcantidad);
	// die();
	if (isset($_POST['categoria'])) {
		$categoria = [];
		foreach ($_POST['categoria'] as $key => $value) {
			$categoria[]="'".$key."'";
		}
		$categorias = implode(",", $categoria);
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

	if (isset($_POST['ordenamiento']) && !empty($_POST['ordenamiento'])) {
		if ($_POST['ordenamiento']==1) {
			$orderby = "order by precio asc";
		}elseif ($_POST['ordenamiento']==2) {
			$orderby = "order by precio desc";
		}else{
			$orderby = "order by prioridad asc";
		}
	}

	$conn = conectar();
	$sql = <<<FIN
	SELECT id,nombre,categoria,moneda,precio,descripcion,oferta FROM productos where $wherecategoria and $whereprecio1 and $whereprecio2 and $whereid and $whereidproducto
FIN;
	if ($orderby<>"") {
		$sql = $sql." ".$orderby;
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
			'moneda'=>$row['moneda'],
			'precio'=>$row['precio'],
			'oferta'=>$row['oferta'],
			'descripcion'=>htmlentities($row['descripcion']),
	  	];
	    // array_push($data,json_encode($row));
	    // print_r($data);
	  }
	}
	if (count($prodcantidad)>0) {
		foreach ($data as $key => $value) {
			$data[$key]['cantidad']=$prodcantidad[$value['id']];
		}
	}
	if ($valor) {
		foreach ($data as $key => $value) {
			$data[$key]['cantidad']=0;
		}
	}
	// print_r($data);die();
	// print_r($prodcantidad);
	// die();
	echo (json_encode($data));
	$conn->close();

}

if ($_POST['condicion']=='productostop') {
	$categoria = "1=1";
	if ($_POST['categoria']) {
		$categoria = $_POST['categoria'];
	}
	$conn = conectar();
	$sql = <<<FIN
	SELECT id,nombre,categoria,moneda,precio,descripcion,oferta,prioridad FROM productos
	where categoria='$categoria'
	order by prioridad asc limit 4
FIN;
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