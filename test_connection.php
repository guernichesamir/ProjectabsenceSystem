<?php
// test_connection.php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'school_attendance');

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    echo "✅ Connexion à school_attendance réussie !<br>";
    
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "✅ Tables créées : " . implode(', ', $tables);
    
} catch(PDOException $e) {
    echo "❌ Erreur : " . $e->getMessage();
}
?>