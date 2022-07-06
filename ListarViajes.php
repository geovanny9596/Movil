<?php

include 'conn.php';
$id = $_GET['idc'];

$query = "Select  * from History_travel where Estado = 'Finalizado' AND Id_user=$id";
$params = array();
$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
$result = sqlsrv_query($conn, $query, $params, $options);

$data = null;

for ($i=0; $i < sqlsrv_num_rows($result); $i++) {
	$res = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);
	$data [$i]= $res ;
}

header("Content-type: application/json; charset=utf-8"); //inform the browser we're sending JSON data
echo json_encode($data,  JSON_UNESCAPED_UNICODE);
?>
