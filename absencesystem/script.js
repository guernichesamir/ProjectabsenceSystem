document.addEventListener("DOMContentLoaded", function() {
  const table = document.querySelector("#attendanceTable tbody");
  const form = document.getElementById("studentForm");
  const showReportBtn = document.getElementById("showReportBtn");
  const ctx = document.getElementById("reportChart").getContext("2d");
  let reportChart = null;

  
  function updateAttendance() {
    const rows = table.querySelectorAll("tr");
    rows.forEach(row => {
      const sessionCheckboxes = Array.from(row.cells).slice(4, 10).map(cb => cb.querySelector("input[type='checkbox']"));
      const participationCheckboxes = Array.from(row.cells).slice(10, 16).map(cb => cb.querySelector("input[type='checkbox']"));
      const absCell = row.cells[16];
      const partCell = row.cells[17];
      const msgCell = row.cells[18];

      const absences = sessionCheckboxes.filter(cb => !cb.checked).length;
      const participations = participationCheckboxes.filter(cb => cb.checked).length;

      absCell.textContent = absences;
      partCell.textContent = participations;

      if (absences < 3) row.style.backgroundColor = "lightgreen";
      else if (absences >= 3 && absences <= 4) row.style.backgroundColor = "yellow";
      else row.style.backgroundColor = "red";

      if (absences < 3 && participations >= 4) msgCell.textContent = "Good attendance – Excellent participation";
      else if (absences < 5 && participations < 4) msgCell.textContent = "Warning – attendance low – You need to participate more";
      else if (absences >= 5) msgCell.textContent = "Excluded – too many absences – You need to participate more";
      else msgCell.textContent = "";
    });
  }

  table.addEventListener("change", updateAttendance);

  
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const email = document.getElementById("email").value.trim();

    let valid = true;
    form.querySelectorAll(".error").forEach(el => el.remove());

    if (!studentId || !/^\d+$/.test(studentId)) {
      const error = document.createElement("div");
      error.className = "error";
      error.textContent = "Student ID must be numeric";
      document.getElementById("studentId").after(error);
      valid = false;
    }
    if (!lastname || !/^[a-zA-Z]+$/.test(lastname)) {
      const error = document.createElement("div");
      error.className = "error";
      error.textContent = "Last Name must contain only letters";
      document.getElementById("lastname").after(error);
      valid = false;
    }
    if (!firstname || !/^[a-zA-Z]+$/.test(firstname)) {
      const error = document.createElement("div");
      error.className = "error";
      error.textContent = "First Name must contain only letters";
      document.getElementById("firstname").after(error);
      valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const error = document.createElement("div");
      error.className = "error";
      error.textContent = "Invalid email format";
      document.getElementById("email").after(error);
      valid = false;
    }

    if (!valid) return;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${studentId}</td>
      <td>${lastname}</td>
      <td>${firstname}</td>
      <td>${email}</td>
      ${'<td><input type="checkbox"></td>'.repeat(12)}
      <td></td>
      <td></td>
      <td></td>
    `;
    table.appendChild(newRow);
    updateAttendance();

    const confirmMsg = document.createElement("div");
    confirmMsg.style.color = "green";
    confirmMsg.textContent = "Student added successfully!";
    form.appendChild(confirmMsg);
    setTimeout(() => confirmMsg.remove(), 3000);
    form.reset();
  });

  
  function generateReport() {
    const rows = table.querySelectorAll("tr");
    const totalStudents = rows.length;
    let presentCount = 0;
    let participatedCount = 0;

    rows.forEach(row => {
      const sessionCheckboxes = Array.from(row.cells).slice(4, 10).map(cb => cb.querySelector("input[type='checkbox']"));
      const participationCheckboxes = Array.from(row.cells).slice(10, 16).map(cb => cb.querySelector("input[type='checkbox']"));

      if (sessionCheckboxes.some(cb => cb.checked)) presentCount++;
      if (participationCheckboxes.some(cb => cb.checked)) participatedCount++;
    });


    function getColor(rate) {
      if (rate >= 0.7) return 'green';
      else if (rate >= 0.4) return 'yellow';
      else return 'red';
    }

    const colors = [
      'blue', // Total students
      getColor(presentCount / totalStudents), // Present
      getColor(participatedCount / totalStudents) // Participated
    ];

    if (reportChart) reportChart.destroy();

    reportChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Students', 'Present', 'Participated'],
        datasets: [{
          label: 'Attendance Report',
          data: [totalStudents, presentCount, participatedCount],
          backgroundColor: colors
        }]
      },
      options: {
        responsive: false,
        plugins: { legend: { labels: { color: '#000' } } },
        scales: {
          x: { grid: { color: '#ccc' }, ticks: { color: '#000' } },
          y: { beginAtZero: true, ticks: { color: '#000' }, grid: { color: '#ccc' } }
        }
      }
    });
  }

  showReportBtn.addEventListener("click", generateReport);
});

