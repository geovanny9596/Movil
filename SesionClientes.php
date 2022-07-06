<?php
header('Access-Control-Allow-Origin: *');

header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$stat = $_GET['stat'];

date_default_timezone_set('Mexico/General'); $hoy= date("Y-m-d H:i:s");

include 'conn.php';

if ($stat == 'login') {
$usr = $_GET['usr'];
$pwd = $_GET['pwd'];
$query = "SELECT Id_user,+ Nombre, Apellidos, usuario, password FROM Usuarios where usuario='$usr' AND password='$pwd'";
$params = array();
$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
$result = sqlsrv_query($conn, $query, $params, $options);
$res = sqlsrv_fetch_array($result);
if (sqlsrv_num_rows($result)>0)	{
	$query = "UPDATE Usuarios set ult_sesion = '$hoy' where Id_user=".$res['Id_user'];
	$upStat = sqlsrv_query($conn,  $params, $options);
	$data = array('id'=>$res['Id_user'], 'Nombre' => $res['Nombre'].' '.$res['Apellidos'] ); }
else
	$data = "0";

	echo json_encode($data, JSON_UNESCAPED_UNICODE);
}
else if ($stat == 'logout'){
	$id = $_GET['idc'];
	$query = "UPDATE Usuarios set Usr_mod = 'Cliente' where Id_user=$id";
	sqlsrv_query($conn, $query);
}
//header("Content-type: application/json; charset=utf-8"); //inform the browser we're sending JSON data
//echo json_encode($data);
//echo $data[0]['Nombre'];

?>