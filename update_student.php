<?php
require_once "db_connect.php";
$conn = getConnection();

$id = $_GET["id"];

// Load existing
$stmt = $conn->prepare("SELECT * FROM students WHERE id=?");
$stmt->execute([$id]);
$student = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$student) die("Student not found");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST["fullname"];
    $matricule = $_POST["matricule"];
    $group_id = $_POST["group_id"];

    $sql = "UPDATE students
            SET fullname=?, matricule=?, group_id=?
            WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$fullname, $matricule, $group_id, $id]);

    echo "✔ Updated successfully";
    exit;
}
?>
<form method="post">
Fullname: <input type="text" name="fullname" value="<?= $student['fullname'] ?>"><br>
Matricule: <input type="text" name="matricule" value="<?= $student['matricule'] ?>"><br>
Group: <input type="text" name="group_id" value="<?= $student['group_id'] ?>"><br>
<button type="submit">Save</button>
</form>
