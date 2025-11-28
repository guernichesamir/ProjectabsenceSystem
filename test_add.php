<?php
require_once 'db_connect.php';

$pdo = getDBConnection();
if (!$pdo) {
    die("Database connection failed");
}

// Test d'insertion directe
try {
    $stmt = $pdo->prepare("INSERT INTO students (fullname, matricule, group_id) VALUES (?, ?, ?)");
    $stmt->execute(['Test Student', '999', 'GTest']);
    echo "✅ Insertion test réussie !";
} catch (PDOException $e) {
    echo "❌ Erreur: " . $e->getMessage();
}
?>