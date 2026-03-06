document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("user");
  const time = params.get("time");

  const reportContent = document.getElementById("reportContent");
  const formTanggapan = document.getElementById("formTanggapan");
  const inputTanggapan = document.getElementById("inputTanggapan");
  const modal = document.getElementById("modalSuccess");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const img = document.getElementById("reportImage");

  // Modal preview gambar
  const imagePreviewModal = document.getElementById("imagePreviewModal");
  const previewImg = document.getElementById("previewImg");

  const userDataKey = `pengaduan_${username}`;
  const tanggapanKey = `tanggapan_${username}`;

  const reports = JSON.parse(localStorage.getItem(userDataKey)) || [];
  const report = reports.find(r => r.time === time);

  if (!report) {
    reportContent.innerHTML = `<p class="text-red-500">Laporan tidak ditemukan.</p>`;
    formTanggapan.style.display = "none";
    return;
  }

  // Tampilkan isi laporan
  document.getElementById("username").textContent = username;
  document.getElementById("title").textContent = report.title || "(judul tidak ditemukan)";
  document.getElementById("description").textContent = report.description;
  document.getElementById("time").textContent = report.time;
  document.getElementById("status").textContent = report.status;

  // Tampilkan gambar jika ada
  if (report.image) {
    img.src = report.image;
    img.classList.remove("hidden");

    // Event klik gambar untuk preview
    img.addEventListener("click", () => {
      previewImg.src = report.image;
      imagePreviewModal.classList.remove("hidden");
    });
  } else {
    img.alt = "Tidak ada gambar tersedia";
  }

  // Tutup modal preview kalau klik di luar gambar
  imagePreviewModal.addEventListener("click", (e) => {
    if (e.target === imagePreviewModal) {
      imagePreviewModal.classList.add("hidden");
    }
  });

  // Submit tanggapan
  formTanggapan.addEventListener("submit", (e) => {
    e.preventDefault();
    const isiTanggapan = inputTanggapan.value.trim();
    if (!isiTanggapan) {
      alert("Tanggapan tidak boleh kosong.");
      return;
    }

    const tanggapanList = JSON.parse(localStorage.getItem(tanggapanKey)) || [];
    tanggapanList.push({
      time: report.time,
      title: report.title || "(Judul tidak tersedia)",
      pesan: isiTanggapan
    });
    localStorage.setItem(tanggapanKey, JSON.stringify(tanggapanList));

    report.status = "Sudah Ditanggapi";
    localStorage.setItem(userDataKey, JSON.stringify(reports));

    modal.classList.remove("hidden");
  });

  // Tombol OK pada modal sukses
  modalCloseBtn.addEventListener("click", () => {
    window.location.href = "sudah-ditanggapi.html";
  });
});
