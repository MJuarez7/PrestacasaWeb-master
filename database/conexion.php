<?php 
function conectar()
{
	//24HozjbTBB-4
	$servername = "38.242.199.255";
	$username = "gianfcl_gianfcl";
	$password = "python2014";
	$dbname = "gianfcl_practicasa";

	// $servername = "localhost";
	// $username = "gianfcl_gianfcl";
	// $password = "python2014";
	// $dbname = "gianfcl_practicasa";

	$conn= mysqli_connect($servername,$username,$password,$dbname); //web, acceso1
	mysqli_set_charset($conn, "utf8");
    if(mysqli_connect_error()) {
        $mensaje = 'Error: '. mysqli_connect_error();
        echo $mensaje;
        return false;
    }
    return $conn;
}
?>