<?php
// test_simple_db.php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'school_attendance';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    echo "✅ Database connected successfully!<br>";
    
    // Test insertion
    $stmt = $pdo->prepare("INSERT INTO students (fullname, matricule, group_id) VALUES (?, ?, ?)");
    $stmt->execute(['Test Student', '999', 'GTest']);
    echo "✅ Student inserted successfully!";
    
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>