<?php
require_once "db_connect.php";

$id = $_GET["session_id"] ?? null;

if (!$id) {
    die("❌ ID de session invalide");
}

$conn = getConnection();

$sql = "UPDATE attendance_sessions SET status = 'closed' WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);

echo "✔ Session fermée avec succès !<br>";
echo '<a href="create_session.php">Créer une autre session</a>';
?>
