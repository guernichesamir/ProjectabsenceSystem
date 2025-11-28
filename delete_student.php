<?php
require_once "db_connect.php";
$conn = getConnection();

$id = $_GET["id"];
$stmt = $conn->prepare("DELETE FROM students WHERE id=?");
$stmt->execute([$id]);

echo "✔ Student deleted";
?>
