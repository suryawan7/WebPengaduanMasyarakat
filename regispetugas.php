<?php
session_start();
if ($_SESSION['role'] !== 'admin') {
    echo "<script>alert('Akses ditolak. Hanya admin yang dapat mendaftarkan petugas.'); window.location.href='login.html';</script>";
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "<script>alert('Akses tidak valid.'); window.location.href = 'regispetugas.html';</script>";
    exit;
}

include "db.php";

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$role = "petugas";

// Cek apakah username sudah digunakan
$cek = $conn->prepare("SELECT id FROM users WHERE username = ?");
$cek->bind_param("s", $username);
$cek->execute();
$cek->store_result();

if ($cek->num_rows > 0) {
    echo "<script>alert('Username sudah digunakan!'); window.history.back();</script>";
    exit;
}

// Simpan petugas ke database
$stmt = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $username, $email, $password, $role);

if ($stmt->execute()) {
    echo "<script>alert('Petugas berhasil ditambahkan.'); window.location.href = 'dashboard-admin.html';</script>";
} else {
    echo "<script>alert('Gagal menambahkan petugas.'); window.history.back();</script>";
}
?>
