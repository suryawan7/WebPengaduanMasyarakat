<?php
include "db.php";
session_start();

$username = $_POST['username'];
$password = $_POST['password'];
$role = $_POST['role'];

$stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ? AND role = ?");
$stmt->bind_param("ss", $username, $role);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($password, $user['password'])) {
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $role;

        // Redirect berdasarkan role
        switch ($role) {
            case "admin":
                header("Location: dashboard-admin.html");
                break;
            case "petugas":
                header("Location: dashboard-petugas.html");
                break;
            case "masyarakat":
                header("Location: dashboard-masyarakat.html");
                break;
        }
        exit;
    } else {
        echo "<script>alert('Password salah.'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('Akun tidak ditemukan.'); window.history.back();</script>";
}
?>
