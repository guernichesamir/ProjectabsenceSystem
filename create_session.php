<?php
require_once "db_connect.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $course = trim($_POST["course"] ?? "");
    $group  = trim($_POST["group"] ?? "");
    $prof   = trim($_POST["prof"] ?? "");

    if ($course === "" || $group === "" || $prof === "") {
        die("❌ Tous les champs sont obligatoires");
    }

    $conn = getConnection();

    $sql = "INSERT INTO attendance_sessions (course_id, group_id, date, opened_by, status)
            VALUES (?, ?, CURDATE(), ?, 'open')";

    $stmt = $conn->prepare($sql);
    $stmt->execute([$course, $group, $prof]);

    $session_id = $conn->lastInsertId();

    echo "✔ Session créée avec succès !<br>";
    echo "ID de la session : <strong>$session_id</strong><br>";
    echo '<a href="list_students.php">Voir les étudiants</a>';
    exit;
}
?>

<h2>Créer une nouvelle session</h2>

<form method="POST">
    <label>Matière :</label><br>
    <input type="text" name="course"><br><br>

    <label>Groupe :</label><br>
    <input type="text" name="group"><br><br>

    <label>Professeur / ID :</label><br>
    <input type="text" name="prof"><br><br>

    <button type="submit">Créer session</button>
</form>
