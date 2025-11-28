<?php
// add_student.php
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'school_attendance';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    
    $matricule = trim($_POST['matricule'] ?? '');
    $fullname = trim($_POST['fullname'] ?? '');
    $group_id = trim($_POST['group_id'] ?? '');
    
    // Validation
    if (!$matricule || !$fullname || !$group_id) {
        echo json_encode(['status' => 'error', 'msg' => 'Tous les champs sont requis']);
        exit;
    }
    
    // Vérifier si le matricule existe déjà
    $checkStmt = $pdo->prepare("SELECT id FROM students WHERE matricule = ?");
    $checkStmt->execute([$matricule]);
    
    if ($checkStmt->fetch()) {
        echo json_encode(['status' => 'error', 'msg' => 'Le matricule existe déjà']);
        exit;
    }
    
    // Insérer le nouvel étudiant
    $stmt = $pdo->prepare("INSERT INTO students (fullname, matricule, group_id) VALUES (?, ?, ?)");
    $stmt->execute([$fullname, $matricule, $group_id]);
    
    echo json_encode(['status' => 'success', 'msg' => 'Étudiant ajouté avec succès']);
    
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'msg' => 'Erreur base de données: ' . $e->getMessage()]);
}
?>