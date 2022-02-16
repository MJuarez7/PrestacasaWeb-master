<?php
include 'conexion.php';
// print_r($_POST);die();


$correo = !empty($_POST['correoc']) ? $_POST['correoc'] : null;
$nombre = !empty($_POST['nombrec']) ? $_POST['nombrec'] : null;
$telefono = !empty($_POST['telefonoc']) ? $_POST['telefonoc'] : null;
$comentario = !empty($_POST['comentarioc']) ? $_POST['comentarioc'] : null;
$preciototal = !empty($_POST['preciototalc']) ? $_POST['preciototalc'] : null;
// print_r($correo && $nombre && $telefono);
// die();
	if($correo && $nombre && $telefono){
	    $consulta = <<<FIN
	    insert into compra (correo,nombre,telefono,comentario,fecha_despacho,estado,preciototal)
	    values ('$correo','$nombre','$telefono','$comentario',now(),1,$preciototal)
FIN;
	    // print_r($consulta);die();
		$conn = conectar();
		mysqli_query($conn, $consulta);
		$idproducto = mysqli_insert_id($conn);
		if ($idproducto) {
			foreach (json_decode($_POST['productos']) as $key => $value) {
				$id = $value->id;
				$cantidad = $value->cantidad;
				if ($cantidad>0) {
					$productosinsert = "insert into productos_comprados (id_compra,id_producto,cantidad) values ('$idproducto',$id,'$cantidad')";
					mysqli_query($conn, $productosinsert);
				}
			}
		}
		
		echo $idproducto;
	}
?>