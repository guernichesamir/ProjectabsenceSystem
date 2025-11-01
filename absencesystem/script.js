document.addEventListener("DOMContentLoaded", () => {
 
  const rows = document.querySelectorAll("#attendanceTable tbody tr");

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input[type='checkbox']");
    const absCell = row.children[row.children.length - 3];
    const partCell = row.children[row.children.length - 2];
    const msgCell = row.children[row.children.length - 1];

    function update() {
      let presents = 0;
      let participations = 0;
      const totalSessions = 6;

      inputs.forEach((box, index) => {
        if (index % 2 === 0 && box.checked) presents++;
        if (index % 2 === 1 && box.checked) participations++;
      });

      const absences = totalSessions - presents;

      absCell.textContent = absences + " Abs";
      partCell.textContent = participations + " Par";

      if (absences < 3) {
        row.style.backgroundColor = "lightgreen";
        msgCell.textContent = "Good attendance – Excellent participation";
      } else if (absences <= 4) {
        row.style.backgroundColor = "khaki";
        msgCell.textContent = "Warning – attendance low – You need to participate more";
      } else {
        row.style.backgroundColor = "tomato";
        msgCell.textContent = "Excluded – too many absences";
      }
    }

    inputs.forEach(box => box.addEventListener("change", update));
  });


  const form = document.getElementById("studentForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.getElementById("studentId");
    const lastname = document.getElementById("lastname");
    const firstname = document.getElementById("firstname");
    const email = document.getElementById("email");

    document.querySelectorAll(".error").forEach(e => e.remove());
    let valid = true;

    const showError = (input, message) => {
      const span = document.createElement("span");
      span.className = "error";
      span.textContent = message;
      input.insertAdjacentElement("afterend", span);
      valid = false;
    };

    if (id.value.trim() === "") showError(id, "Student ID is required");
    else if (!/^[0-9]+$/.test(id.value)) showError(id, "Only numbers allowed");

    if (lastname.value.trim() === "") showError(lastname, "Last name is required");
    else if (!/^[A-Za-z]+$/.test(lastname.value)) showError(lastname, "Only letters allowed");

    if (firstname.value.trim() === "") showError(firstname, "First name is required");
    else if (!/^[A-Za-z]+$/.test(firstname.value)) showError(firstname, "Only letters allowed");

    if (email.value.trim() === "") showError(email, "Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) showError(email, "Invalid email");

    if (valid) {
      alert("Form submitted successfully 🎉");
      form.reset();
    }
  });
});
