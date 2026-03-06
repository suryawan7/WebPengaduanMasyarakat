document.addEventListener("DOMContentLoaded", () => {
  const adminComplaintList = document.getElementById("adminComplaintList");

  let total = 0;
  let belum = 0;
  let sudah = 0;

  adminComplaintList.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("pengaduan_")) {
      const username = key.replace("pengaduan_", "");
      const userComplaints = JSON.parse(localStorage.getItem(key)) || [];

      userComplaints.forEach((c) => {
        total++;
        if (c.status === "Menunggu Tanggapan") {
          belum++;
        } else if (c.status === "Sudah Ditanggapi") {
          sudah++;
        }

        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-black", "dark:border-white/10", "text-gray-800", "dark:text-white");

        tr.innerHTML = `
          <td class="px-4 py-2 align-top">${username}</td>
          <td class="px-4 py-2 align-top">${c.title}</td>
          <td class="px-4 py-2 align-top">${c.description}</td>
          <td class="px-4 py-2 align-top">${c.status}</td>
          <td class="px-4 py-2 align-top">${c.time}</td>
          <td class="px-4 py-2 align-top">
            ${
              c.image
                ? `<img src="${c.image}" alt="Bukti" class="w-16 h-16 object-cover rounded border dark:border-white/20 cursor-pointer hover:scale-105 transition duration-200" onclick="previewImage('${c.image}')" />`
                : "—"
            }
          </td>
        `;

        adminComplaintList.appendChild(tr);
      });
    }
  }

  // Update kartu statistik
  document.getElementById("totalLaporan").textContent = `${total} Laporan Masuk`;
  document.getElementById("belumTanggapi").textContent = `${belum} Belum Ditanggapi`;
  document.getElementById("sudahTanggapi").textContent = `${sudah} Sudah Ditanggapi`;
});

// Optional: Preview gambar besar saat diklik
function previewImage(src) {
  const imgWindow = window.open("", "_blank");
  imgWindow.document.write(`
    <title>Preview Gambar Bukti</title>
    <style>
      body { margin: 0; background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; }
      img { max-width: 100%; max-height: 100%; }
    </style>
    <img src="${src}" alt="Preview Gambar" />
  `);
}
