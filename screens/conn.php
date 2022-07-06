<?php

$host = "DESKTOP-GI1JMTA\SQLEXPRESS2012";
$username = "sa";
$password = "toribio12Q";
$database = "Central_transportistas";

$infoCon = array ('UID' => $username,'PWD'=> $password, 'Database' => $database, "CharacterSet" => "UTF-8");
$conn = sqlsrv_connect($host, $infoCon);

if (!$conn)
die ( print_r(sqlsrv_errors(), true));

?>