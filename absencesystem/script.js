$(document).ready(function () {

  const table = $("#attendanceTable tbody");

  /* ---------------- HOVER EFFECT ---------------- */
  $("#attendanceTable tbody").on("mouseenter", "tr", function () {
    $(this).addClass("hover-highlight");
  });
  $("#attendanceTable tbody").on("mouseleave", "tr", function () {
    $(this).removeClass("hover-highlight");
  });

  /* ---------------- UPDATE ATTENDANCE ---------------- */
  function updateAttendance() {
    table.find("tr").each(function () {
      const row = $(this);

      const sessionChecks = row.find("td").slice(4, 10).find("input[type='checkbox']");
      const partChecks = row.find("td").slice(10, 16).find("input[type='checkbox']");

      const absCell = row.find("td:eq(16)");
      const partCell = row.find("td:eq(17)");
      const msgCell = row.find("td:eq(18)");

      const absences = sessionChecks.filter(":not(:checked)").length;
      const participation = partChecks.filter(":checked").length;

      absCell.text(absences);
      partCell.text(participation);

      // Color rules
      if (absences < 3) row.css("background", "rgba(164, 252, 164, 1)");
      else if (absences <= 4) row.css("background", "rgba(246, 252, 164, 1)");
      else row.css("background", "rgba(252, 164, 164, 1)");

      // Messages
      if (absences < 3 && participation >= 4)
        msgCell.text("Good attendance – Excellent participation");
      else if (absences < 5 && participation < 4)
        msgCell.text("  attendance low – You need to participate more");
      else if (absences >= 5)
        msgCell.text("Excluded");
      else msgCell.text("");
    });
  }

  table.on("change", "input[type='checkbox']", updateAttendance);
  updateAttendance();

  /* ---------------- ADD STUDENT ---------------- */
  $("#studentForm").submit(function (e) {
    e.preventDefault();

    const id = $("#studentId").val().trim();
    const last = $("#lastname").val().trim();
    const first = $("#firstname").val().trim();
    const email = $("#email").val().trim();

    let valid = true;
    $(".error").remove();

    if (!/^\d+$/.test(id)) {
      $("#studentId").after('<div class="error">ID must be numeric</div>');
      valid = false;
    }
    if (!/^[a-zA-Z]+$/.test(last)) {
      $("#lastname").after('<div class="error">Letters only</div>');
      valid = false;
    }
    if (!/^[a-zA-Z]+$/.test(first)) {
      $("#firstname").after('<div class="error">Letters only</div>');
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $("#email").after('<div class="error">Invalid email</div>');
      valid = false;
    }

    if (!valid) return;

    let row = `
      <tr>
        <td>${id}</td>
        <td>${last}</td>
        <td>${first}</td>
        <td>${email}</td>
        ${'<td><input type="checkbox"></td>'.repeat(12)}
        <td></td><td></td><td></td>
      </tr>
    `;

    table.append(row);
    updateAttendance();
    this.reset();
  });

  /* ---------------- SEARCH ---------------- */
  $("#searchName").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    table.find("tr").each(function () {
      const last = $(this).find("td:eq(1)").text().toLowerCase();
      const first = $(this).find("td:eq(2)").text().toLowerCase();
      $(this).toggle(last.includes(value) || first.includes(value));
    });
  });

  /* ---------------- SORT ---------------- */
  $("#sortAbsences").click(function () {
    const rows = table.find("tr").get();
    rows.sort((a, b) => {
      return (
        (parseInt($(a).find("td:eq(16)").text()) || 0) -
        (parseInt($(b).find("td:eq(16)").text()) || 0)
      );
    });
    $.each(rows, (i, row) => table.append(row));
  });

  $("#sortParticipation").click(function () {
    const rows = table.find("tr").get();
    rows.sort((a, b) => {
      return (
        (parseInt($(b).find("td:eq(17)").text()) || 0) -
        (parseInt($(a).find("td:eq(17)").text()) || 0)
      );
    });
    $.each(rows, (i, row) => table.append(row));
  });

  /* ---------------- HIGHLIGHT / RESET ---------------- */
  $("#highlightExcellent").click(function () {
    table.find("tr").each(function () {
      const abs = parseInt($(this).find("td:eq(16)").text()) || 0;
      if (abs < 3) $(this).css("background", "#dfc3f0e3");
    });
  });

  $("#resetColors").click(function () {
    table.find("tr").css("background", "");
    updateAttendance();
  });

  /* ---------------- REPORT ---------------- */
  let reportChart = null;
  $("#showReportBtn").click(function () {
    const rows = table.find("tr");

    let total = rows.length;
    let present = 0;
    let participated = 0;

    rows.each(function () {
      const sess = $(this).find("td").slice(4, 10).find("input[type='checkbox']");
      const part = $(this).find("td").slice(10, 16).find("input[type='checkbox']");

      if (sess.filter(":checked").length > 0) present++;
      if (part.filter(":checked").length > 0) participated++;
    });

    function pickColor(rate) {
      if (rate >= 0.7) return "green";
      else if (rate >= 0.4) return "yellow";
      return "red";
    }

    if (reportChart) reportChart.destroy();

    reportChart = new Chart($("#reportChart"), {
      type: "bar",
      data: {
        labels: ["Total Students", "Present", "Participated"],
        datasets: [
          {
            label: "Attendance",
            data: [total, present, participated],
            backgroundColor: [
              "blue",
              pickColor(present / total),
              pickColor(participated / total),
            ],
          },
        ],
      },
      options: {
        responsive: false,
      },
    });
  });
});
