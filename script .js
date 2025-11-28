$(document).ready(function () {

  const table = $("#attendanceTable tbody");

  /* ---------------- LOAD STUDENTS ---------------- */
  function loadStudents() {
    console.log("🔍 Loading students...");
    
    $.getJSON("list_students.php", function (response) {
      console.log("📊 Response:", response);
      
      if (response.status === "success") {
        table.empty();
        
        if (response.data.length === 0) {
          table.append('<tr><td colspan="19">No students found</td></tr>');
          return;
        }
        
        response.data.forEach(student => {
          let nameParts = student.fullname.split(' ');
          let firstName = nameParts[0] || '';
          let lastName = nameParts.slice(1).join(' ') || student.fullname;
          
          let row = `<tr>
            <td>${student.matricule}</td>
            <td>${lastName}</td>
            <td>${firstName}</td>
            <td>${student.email || 'N/A'}</td>
            ${'<td><input type="checkbox"></td>'.repeat(12)}
            <td>0</td><td>0</td><td></td>
          </tr>`;
          table.append(row);
        });
        
        console.log("✅ Students loaded:", response.data.length);
        
      } else {
        alert("❌ Error: " + response.msg);
      }
    }).fail(function(error) {
      console.error("❌ Load error:", error);
      alert("❌ Cannot load students");
    });
  }

  // Premier chargement
  loadStudents();

  /* ---------------- ADD STUDENT ---------------- */
  $("#studentForm").submit(function (e) {
    e.preventDefault();
    console.log("🔄 Form submitted");

    // Récupérer les valeurs
    const matricule = $("#matricule").val().trim();
    const last = $("#lastname").val().trim();
    const first = $("#firstname").val().trim();
    const email = $("#email").val().trim();
    const group_id = $("#group_id").val().trim();

    console.log("📨 Data:", { matricule, last, first, email, group_id });

    // Validation simple
    if (!matricule || !last || !first || !group_id) {
      alert("❌ Please fill all required fields");
      return;
    }

    // Préparer les données pour PHP
    const formData = {
      matricule: matricule,
      fullname: first + " " + last,
      group_id: group_id
    };

    console.log("🚀 Sending to server:", formData);

    // Envoyer vers PHP
    $.post("add_student.php", formData, function (response) {
      console.log("📩 Server response:", response);
      
      if (response.status === "success") {
        alert("✅ " + response.msg);
        $("#studentForm")[0].reset(); // Vider le formulaire
        loadStudents(); // Recharger le tableau
      } else {
        alert("❌ " + response.msg);
      }
    }, "json").fail(function() {
      alert("❌ Server error");
    });
  });

  /* ---------------- AUTRES FONCTIONS (simplifiées) ---------------- */
  
  function updateAttendance() {
    table.find("tr").each(function () {
      const row = $(this);
      const sessionChecks = row.find("td").slice(4, 10).find("input[type='checkbox']");
      const partChecks = row.find("td").slice(10, 16).find("input[type='checkbox']");
      const absCell = row.find("td:eq(16)");
      const partCell = row.find("td:eq(17)");

      const absences = sessionChecks.filter(":not(:checked)").length;
      const participation = partChecks.filter(":checked").length;

      absCell.text(absences);
      partCell.text(participation);

      if (absences < 3) row.css("background", "rgba(164, 252, 164, 1)");
      else if (absences <= 4) row.css("background", "rgba(246, 252, 164, 1)");
      else row.css("background", "rgba(252, 164, 164, 1)");
    });
  }

  table.on("change", "input[type='checkbox']", updateAttendance);

  $("#searchName").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    table.find("tr").each(function () {
      const last = $(this).find("td:eq(1)").text().toLowerCase();
      const first = $(this).find("td:eq(2)").text().toLowerCase();
      $(this).toggle(last.includes(value) || first.includes(value));
    });
  });

  // Les autres fonctions (sort, report, etc.) restent similaires

});