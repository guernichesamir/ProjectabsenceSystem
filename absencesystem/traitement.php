<?php

// Connexion à la base de données
$host = "localhost";
$user = "root"; 
$pass = ""; 
$db   = "attendance_system";

$conn = new mysqli($host, $user, $pass, $db);

// Vérifier connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Vérifier si la requête est POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Récupérer les valeurs envoyées
    $studentId = $_POST['studentId'];
    $lastname  = $_POST['lastname'];
    $firstname = $_POST['firstname'];
    $email     = $_POST['email'];

    // Préparer la requête SQL
    $stmt = $conn->prepare("
        INSERT INTO students (student_id, lastname, firstname, email)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->bind_param("isss", $studentId, $lastname, $firstname, $email);

    if ($stmt->execute()) {
        echo "SUCCESS";
    } else {
        echo "ERROR: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>
