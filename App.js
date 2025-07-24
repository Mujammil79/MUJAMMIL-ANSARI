const calendar = document.getElementById("calendar");
const totalBox = document.getElementById("total");
let total = 0;

for (let i = 1; i <= 31; i++) {
  const data = JSON.parse(localStorage.getItem("day-" + i)) || { count: "", notes: "" };
  const div = document.createElement("div");
  div.className = "day";
  div.innerHTML = `
    <h3>Day ${i}</h3>
    <label>Cigarettes: <input type="number" id="count-${i}" value="${data.count}" /></label><br/>
    <label>Note: <input type="text" id="note-${i}" value="${data.notes}" /></label>
  `;
  calendar.appendChild(div);

  total += parseInt(data.count) || 0;

  document.addEventListener("input", () => {
    const count = document.getElementById("count-" + i).value;
    const notes = document.getElementById("note-" + i).value;
    localStorage.setItem("day-" + i, JSON.stringify({ count, notes }));
    updateTotal();
  });
}

function updateTotal() {
  let sum = 0;
  for (let i = 1; i <= 31; i++) {
    const data = JSON.parse(localStorage.getItem("day-" + i)) || { count: 0 };
    sum += parseInt(data.count) || 0;
  }
  totalBox.innerHTML = `<h2>Total Cigarettes: ${sum}</h2>`;
}

updateTotal();