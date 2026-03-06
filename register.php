<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "<script>alert('Akses tidak valid.'); window.location.href = 'register.html';</script>";
    exit;
}


include "db.php";

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$role = "masyarakat"; // default saat daftar

// Cek apakah username sudah ada
$cek = $conn->prepare("SELECT id FROM users WHERE username = ?");
$cek->bind_param("s", $username);
$cek->execute();
$cek->store_result();

if ($cek->num_rows > 0) {
    echo "<script>alert('Username sudah digunakan.'); window.history.back();</script>";
    exit;
}

// Simpan user baru
$stmt = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $username, $email, $password, $role);

if ($stmt->execute()) {
    echo "<script>alert('Registrasi berhasil! Silakan login.'); window.location.href = 'login.html';</script>";
} else {
    echo "<script>alert('Registrasi gagal.'); window.history.back();</script>";
}
?>
