document.addEventListener("DOMContentLoaded", () => {
  const complaintForm = document.getElementById("complaintForm");
  const complaintList = document.getElementById("complaintList");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const storageKey = `pengaduan_${loggedInUser}`;

  const complaints = JSON.parse(localStorage.getItem(storageKey)) || [];

  displayComplaints();

  complaintForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const imageInput = document.getElementById("complaintImage");
    const file = imageInput.files[0];

    if (!title || !description) {
      alert("Harap isi semua kolom.");
      return;
    }

    const saveComplaint = (imageData) => {
      const newComplaint = {
        title,
        description,
        image: imageData || null,
        status: "Menunggu Tanggapan",
        time: new Date().toLocaleString(),
      };

      complaints.push(newComplaint);
      localStorage.setItem(storageKey, JSON.stringify(complaints));
      complaintForm.reset();
      displayComplaints();
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => saveComplaint(event.target.result);
      reader.readAsDataURL(file);
    } else {
      saveComplaint(null);
    }
  });

  function displayComplaints() {
    complaintList.innerHTML = "";

    if (complaints.length === 0) {
      complaintList.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-gray-500 dark:text-white/70">
            Belum ada pengaduan.
          </td>
        </tr>`;
      return;
    }

    complaints.forEach((c) => {
      const tr = document.createElement("tr");
      tr.classList.add("border-b", "border-black", "dark:border-white/10");

      // Ambil tanggapan berdasarkan waktu
      const tanggapanKey = `tanggapan_${loggedInUser}`;
      const tanggapanList = JSON.parse(localStorage.getItem(tanggapanKey)) || [];
      const tanggapan = tanggapanList.find(t => t.time === c.time);

      tr.innerHTML = `
        <td class="px-4 py-2 align-top">${c.title}</td>
        <td class="px-4 py-2 align-top">${c.description}</td>
        <td class="px-4 py-2 align-top">${c.status}</td>
        <td class="px-4 py-2 align-top">${c.time}</td>
        <td class="px-4 py-2 align-top">
          ${c.image
            ? `<img src="${c.image}" alt="Bukti" class="w-16 h-16 object-cover rounded-lg border dark:border-white/10" />`
            : "—"}
        </td>
        <td class="px-4 py-2 align-top">
          ${tanggapan
            ? tanggapan.pesan
            : "<span class='italic text-gray-500 dark:text-white/50'>(Belum ada tanggapan)</span>"}
        </td>
      `;

      complaintList.appendChild(tr);
    });
  }
});
