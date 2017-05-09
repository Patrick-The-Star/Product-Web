<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "hello", "agita");
mysqli_set_charset($conn,'utf8');
$result = $conn->query("SELECT name, customers.id, address, orders.product_name FROM customers,orders
	WHERE orders.customers_id=customers.id");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Name":"'  . $rs["name"] . '",';
    $outp .= '"Id":"'   . $rs["id"]        . '",';
    $outp .= '"Address":"'. $rs["address"]     . '",';
    $outp .= '"Product":"'. $rs["product_name"] .  '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>