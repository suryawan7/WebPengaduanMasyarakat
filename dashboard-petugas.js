document.addEventListener("DOMContentLoaded", function () {
  const petugasComplaintList = document.getElementById("petugasComplaintList");

  // Ambil semua pengaduan dari localStorage
  function getAllComplaints() {
    const complaintsData = [];
    for (let key in localStorage) {
      if (key.startsWith("pengaduan_")) {
        const username = key.replace("pengaduan_", "");
        const userComplaints = JSON.parse(localStorage.getItem(key)) || [];
        userComplaints.forEach(c => {
          complaintsData.push({ username, ...c });
        });
      }
    }
    return complaintsData;
  }

  // Tampilkan semua pengaduan dalam tabel
  function displayAllComplaints() {
    const complaints = getAllComplaints();
    petugasComplaintList.innerHTML = "";

    if (complaints.length === 0) {
      petugasComplaintList.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-gray-500 dark:text-white/70">
            Tidak ada data pengaduan
          </td>
        </tr>`;
      return;
    }

    complaints.forEach(c => {
      const tr = document.createElement("tr");
      tr.classList.add("text-gray-800", "dark:text-white", "border-b", "border-black", "dark:border-white/10");
      tr.innerHTML = `
        <td class="px-4 py-2 align-top">${c.username}</td>
        <td class="px-4 py-2 align-top">${c.title}</td>
        <td class="px-4 py-2 align-top">${c.description}</td>
        <td class="px-4 py-2 align-top">${c.status}</td>
        <td class="px-4 py-2 align-top">${c.time}</td>
        <td class="px-4 py-2 align-top">
          ${c.image
            ? `<img src="${c.image}" alt="Bukti" class="w-16 h-16 object-cover rounded border dark:border-white/10" />`
            : "—"}
        </td>
      `;
      petugasComplaintList.appendChild(tr);
    });
  }

  // Update kartu statistik
  function updateStatCards() {
    const all = getAllComplaints();
    const belum = all.filter(c => c.status === "Menunggu Tanggapan");
    const sudah = all.filter(c => c.status === "Sudah Ditanggapi");

    document.getElementById("totalLaporan").textContent = `${all.length} Laporan Masuk`;
    document.getElementById("belumTanggapi").textContent = `${belum.length} Belum Ditanggapi`;
    document.getElementById("sudahTanggapi").textContent = `${sudah.length} Sudah Ditanggapi`;
  }

  // Jalankan fungsi saat halaman siap
  displayAllComplaints();
  updateStatCards();
});
