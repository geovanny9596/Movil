<?php

require 'conn.php';

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$Nombre = $DecodedData['Nombre'];
$Apellidos = $DecodedData['Apellidos'];
$Domicilio = $DecodedData['Domicilio'];
$Celular = $DecodedData['Celular'];
$email = $DecodedData['email'];
$usuario = $DecodedData['usuario'];
$password = $DecodedData['password'];
date_default_timezone_set('Mexico/General'); $hoy= date("Y-m-d H:i:s");

$query ="SELECT * FROM Usuarios where  email='{$email}' AND Celular='{$Celular}' AND usuario='{$usuario}'";


$query_output=sqlsrv_query($conn, $query);
$count = sqlsrv_num_rows($query_output);

if($count == 1){
    $arr = array("result"=>"Ya existe. Intenta con otro");
    echo json_encode($arr);
} else if($count == 0){
    $insertMemberData = "INSERT into Usuarios(Nombre, Apellidos,Domicilio,Celular,Id_tipo2, email,usuario,password,Usr_mod,Fecha_alt,Status) values 
    ('$Nombre', '$Apellidos', '$Domicilio', '$Celular', '1', '$email', '$usuario', '$password',  'Cliente', '$hoy', '1')";
    $register = sqlsrv_query($conn, $insertMemberData);
    $arr=array('result'=>'ok');
}else{
    $arr = array("Message" => 'fail');
}


$response[] = array("Message" => $arr);

echo json_encode($response);









?>