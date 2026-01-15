let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

let schedule = JSON.parse(localStorage.getItem("schedule") || '{"Måndag":[],"Tisdag":[],"Onsdag":[],"Torsdag":[],"Fredag":[],"Lördag":[],"Söndag":[]}');

let editMode = false;
let currentWeekOffset = 0;

function render() {
  const div = document.getElementById("tasks");
  if (!div) return;
  div.innerHTML = "";
  tasks.forEach((t, i) => {
    div.innerHTML += `
      <div class="todo-item">
        <input type="checkbox">
        ${t}
        <button onclick="removeTask(${i})">X</button>
      </div>`;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value) {
    tasks.push(input.value);
    input.value = "";
    render();
  }
}

function removeTask(i) {
  tasks.splice(i, 1);
  render();
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}

function getWeekDates() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + (currentWeekOffset * 7));
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }
  return dates;
}

function renderSchedule() {
  // Clear all events
  document.querySelectorAll('.event').forEach(e => e.remove());

  // Update month header
  const dates = getWeekDates();
  const monthName = dates[0].toLocaleString('sv-SE', { month: 'long' });
  const year = dates[0].getFullYear();
  document.getElementById('monthText').textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1) + ' ' + year;

  // Update time header with week number
  const weekNum = getWeekNumber(dates[0]);
  document.getElementById('timeHeader').textContent = `Tid\nV. ${weekNum}`;

  // Update headers with dates (day name and date only, no month)
  const dayNames = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
  dates.forEach((date, i) => {
    const header = document.querySelector(`.day-column[data-day="${dayNames[i]}"] .day-header`);
    if (header) {
      const day = date.getDate();
      header.innerHTML = `${dayNames[i]} ${day}`;
    }
  });

  // Highlight today
  const todayName = new Date().toLocaleString('sv-SE', { weekday: 'long' });
  document.querySelectorAll('.day-column').forEach(col => col.classList.remove('today'));
  const todayCol = document.querySelector(`.day-column[data-day="${todayName}"]`);
  if (todayCol) todayCol.classList.add('today');

  const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
  days.forEach(day => {
    // Sort events by start time
    schedule[day].sort((a, b) => {
      const timeA = a.start || a.time || '00:00';
      const timeB = b.start || b.time || '00:00';
      return timeA.localeCompare(timeB);
    });
    schedule[day].forEach((e, i) => {
      const startTime = e.start || e.time || '00:00';
      const endTime = e.end || (e.time ? '01:00' : '01:00'); // default 1 hour
      const [startH, startM] = startTime.split(':').map(Number);
      const [endH, endM] = endTime.split(':').map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;
      const duration = endMinutes - startMinutes;
      const top = startMinutes * 0.23;
      const height = duration * 0.23;

      const eventDiv = document.createElement('div');
      eventDiv.className = 'event';
      eventDiv.style.top = top + 'px';
      eventDiv.style.height = height + 'px';
      eventDiv.innerHTML = e.event;
      if (editMode) {
        eventDiv.innerHTML += `<button class="delete-btn" onclick="removeEvent('${day}', ${i})">X</button>`;
      }

      const daySlots = document.querySelector(`.day-column[data-day="${day}"] .day-slots`);
      if (daySlots) {
        daySlots.appendChild(eventDiv);
      }
    });
  });

  localStorage.setItem("schedule", JSON.stringify(schedule));
}

function previousWeek() {
  currentWeekOffset--;
  renderSchedule();
}

function nextWeek() {
  currentWeekOffset++;
  renderSchedule();
}

function removeEvent(day, i) {
  schedule[day].splice(i, 1);
  renderSchedule();
}

function toggleEdit() {
  editMode = !editMode;
  document.getElementById('editBtn').textContent = editMode ? 'Sluta redigera' : 'Redigera schema';
  renderSchedule();
}

function addSchedule() {
  const day = document.getElementById("daySelect").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;
  const event = document.getElementById("eventInput").value;
  if (start < end && event) {
    schedule[day].push({start, end, event});
    document.getElementById("eventInput").value = "";
    renderSchedule();
  } else {
    alert("End time must be after start time and event name required");
  }
}

function hideWizard() {
  document.querySelector('.wizard-area').style.display = 'none';
}

function toggleWizard() {
  const wizard = document.querySelector('.wizard-area');
  const btn = document.querySelector('.go-btn');
  if (wizard.style.display === 'none') {
    wizard.style.display = 'block';
    btn.innerText = 'Göm';
  } else {
    wizard.style.display = 'none';
    btn.innerText = 'Visa';
  }
}

render();
renderSchedule();

// Validate end time is after start time
document.getElementById('startTime').addEventListener('change', function() {
  const start = this.value;
  const end = document.getElementById('endTime').value;
  if (end && start >= end) {
    // Auto-adjust end time to 1 hour after start
    const [h, m] = start.split(':');
    const newEnd = (parseInt(h) + 1).toString().padStart(2, '0') + ':' + m;
    document.getElementById('endTime').value = newEnd;
  }
});

document.getElementById('endTime').addEventListener('change', function() {
  const start = document.getElementById('startTime').value;
  const end = this.value;
  if (start && end <= start) {
    alert('End time must be after start time');
    this.value = start;
  }
});

/* LOGIN (simulerad) */
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;
  document.getElementById("loginMsg").innerText =
    u && p ? "Inloggad (simulerad)" : "Fyll i alla fält";
}