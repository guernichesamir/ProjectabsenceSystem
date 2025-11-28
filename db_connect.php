<?php
// db_connect.php
$config_path = __DIR__ . '/config.php';
if (!file_exists($config_path)) {
    die("❌ config.php not found at: " . $config_path);
}

require_once $config_path;

function getDBConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch(PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}
?>