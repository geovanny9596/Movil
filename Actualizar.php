<?php

include 'conn.php';

$json = file_get_contents('php://input');
 
 $obj = json_decode($json,true);
 
 $S_ID = $obj['Id_user'];
 
 $S_Nombre = $obj['Nombre'];
 
 $S_Apellidos = $obj['Apellidos'];
 
 $S_Domicilio = $obj['Domicilio'];
 
 $S_Celular = $obj['Celular'];

 $S_email = $obj['email'];

 $S_usuario = $obj['usuario'];

 $S_password = $obj['password'];

 
 $Sql_Query = "UPDATE Usuarios SET Nombre= '$S_Nombre', Apellidos = '$S_Apellidos', Domicilio = '$S_Domicilio', Celular = '$S_Celular', email = '$S_email', usuario = '$S_usuario', password = '$S_password' WHERE Id_user = $S_ID";
 
 if(sqlsrv_query($conn,$Sql_Query)){
 
$MSG = 'Record Successfully Inserted Into MySQL Database.' ;
 
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }

?>