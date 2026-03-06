<?php
include "db.php";

$username = "admin";
$email = "admin@gmail.com";
$password = password_hash("admin123", PASSWORD_DEFAULT);
$role = "admin";

// Cek dulu apakah admin sudah ada
$cek = $conn->prepare("SELECT id FROM users WHERE username = ?");
$cek->bind_param("s", $username);
$cek->execute();
$cek->store_result();

if ($cek->num_rows > 0) {
  echo "Akun admin sudah ada.";
  exit;
}

// Tambahkan admin
$stmt = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $username, $email, $password, $role);

if ($stmt->execute()) {
  echo "Akun admin berhasil dibuat.";
} else {
  echo "Gagal membuat akun admin.";
}
?>
