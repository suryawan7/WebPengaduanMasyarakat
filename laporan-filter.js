document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("filteredComplaintList");
  const statusToShow = document.body.dataset.status || null;
  const complaints = [];

  for (let key in localStorage) {
    if (key.startsWith("pengaduan_")) {
      const username = key.replace("pengaduan_", "");
      const data = JSON.parse(localStorage.getItem(key)) || [];

      data.forEach(item => {
        if (!statusToShow || item.status === statusToShow) {
          complaints.push({ username, ...item });
        }
      });
    }
  }

  if (complaints.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-4 text-gray-500 dark:text-white/70">
          ${statusToShow ? `Tidak ada pengaduan dengan status "${statusToShow}".` : "Belum ada data pengaduan."}
        </td>
      </tr>`;
    return;
  }

  complaints.forEach(c => {
    const tr = document.createElement("tr");
    tr.classList.add("border-b", "border-black", "dark:border-white/10");

    // Tentukan tombol aksi berdasarkan status
    let aksiHtml = "";
    if (c.status === "Menunggu Tanggapan") {
      aksiHtml = `
        <a href="menanggapi.html?user=${encodeURIComponent(c.username)}&time=${encodeURIComponent(c.time)}" 
           class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition">Tanggapi</a>`;
    } else {
      aksiHtml = `
        <button class="hapus-btn px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition" 
                data-user="${c.username}" data-time="${c.time}">Hapus</button>`;
    }

    tr.innerHTML = `
      <td class="px-4 py-2 align-top">${c.username}</td>
      <td class="px-4 py-2 align-top">${c.title}</td>
      <td class="px-4 py-2 align-top">${c.description}</td>
      <td class="px-4 py-2 align-top">${c.status}</td>
      <td class="px-4 py-2 align-top">${c.time}</td>
      <td class="px-4 py-2 align-top">
        ${c.image
          ? `<img src="${c.image}" alt="Bukti" class="w-16 h-16 object-cover rounded border dark:border-white/10 cursor-pointer preview-thumb" />`
          : "—"}
      </td>
      <td class="px-4 py-2 align-top">
        ${aksiHtml}
      </td>
    `;

    tableBody.appendChild(tr);
  });

  // Preview gambar
  document.addEventListener("click", e => {
    if (e.target.classList.contains("preview-thumb")) {
      const src = e.target.getAttribute("src");
      document.getElementById("previewImage").src = src;
      document.getElementById("imagePreviewModal").classList.remove("hidden");
    }

    if (e.target.id === "closePreview" || e.target.id === "imagePreviewModal") {
      document.getElementById("imagePreviewModal").classList.add("hidden");
    }
  });

  // Kembali ke dashboard otomatis
  const backBtn = document.getElementById("backButton");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const params = new URLSearchParams(window.location.search);
      const from = params.get("from");

      if (from === "petugas") {
        window.location.href = "dashboard-petugas.html";
      } else if (from === "admin") {
        window.location.href = "dashboard-admin.html";
      } else {
        window.history.back();
      }
    });
  }

  // Fungsi hapus hanya jika bukan "Menunggu Tanggapan"
  if (statusToShow !== "Menunggu Tanggapan") {
    document.addEventListener("click", e => {
      if (e.target.classList.contains("hapus-btn")) {
        const username = e.target.getAttribute("data-user");
        const time = e.target.getAttribute("data-time");
        const key = `pengaduan_${username}`;
        const allData = JSON.parse(localStorage.getItem(key)) || [];

        const filtered = allData.filter(p => p.time !== time);
        localStorage.setItem(key, JSON.stringify(filtered));
        location.reload();
      }
    });
  }
});
