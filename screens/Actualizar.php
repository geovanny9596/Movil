<?php

include 'conn.php';


 $data = json_decode(file_get_contents("php://input"), true);

 $S_ID = $data['Id_user'];
 
 $S_Nombre = $data['Nombre'];
 
 $S_Apellidos = $data['Apellidos'];
 
 $S_Domicilio = $data['Domicilio'];
 
 $S_Celular = $data['Celular'];

 $S_email = $data['email'];

 $S_usuario = $data['usuario'];

 $S_password = $data['password'];

 
 $Sql_Query = "UPDATE Usuarios SET Nombre= '$S_Nombre', Apellidos = '$S_Apellidos', Domicilio = '$S_Domicilio', Celular = '$S_Celular', email = '$S_email', usuario = '$S_usuario', password = '$S_password' WHERE Id_user = $S_ID";
 
 if(sqlsrv_query($conn,$Sql_Query)){
 
$MSG = 'Listo' ;
 
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }

?>
