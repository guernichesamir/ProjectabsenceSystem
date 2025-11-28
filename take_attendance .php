<?php
header('Content-Type: text/plain'); // on renvoie juste un texte

$studentsFile = 'students.json';
if (!file_exists($studentsFile)) {
    echo "No students found.";
    exit;
}

$students = json_decode(file_get_contents($studentsFile), true);
$todayFile = 'attendance_' . date('Y-m-d') . '.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (file_exists($todayFile)) {
        echo "Attendance for today has already been taken.";
        exit;
    }

    $attendance = [];
    foreach ($students as $stu) {
        $status = $_POST['status'][$stu['student_id']] ?? 'absent';
        $attendance[] = [
            'student_id' => $stu['student_id'],
            'status'     => $status
        ];
    }

    file_put_contents($todayFile, json_encode($attendance, JSON_PRETTY_PRINT));
    echo "Attendance saved successfully for today.";
    exit;
}
?>
