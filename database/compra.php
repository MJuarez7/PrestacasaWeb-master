<?php
include 'conexion.php';
// Cargamos Requests y Culqi PHP
// print_r(dirname(__FILE__));
include_once dirname(__FILE__).'/Requests/library/Requests.php';
Requests::register_autoloader();
include_once dirname(__FILE__).'/culqi-php/lib/culqi.php';


// Configurar tu API Key y autenticación
$SECRET_KEY = "sk_test_4610c3692687a261";
$culqi = new Culqi\Culqi(array('api_key' => $SECRET_KEY));

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
// echo json_encode($data);
$conn->close();



$charge = $culqi->Charges->create(
 array(
     "amount" => $data[0]['preciototal']*100,
     "currency_code" => "PEN",
     "email" => $data[0]['correo'],
     "source_id" => $_POST['token']
   )
);
// print_r($charge);die();
$conn = conectar();
$update = "UPDATE compra SET estado='2',fecha_pago=now() WHERE id_compra=$idcompra";
mysqli_query($conn, $update);
$conn->close();
echo json_encode("exito");

?>