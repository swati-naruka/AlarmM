let timerRef = document.getElementById("currentTime");
let timeZone = document.getElementById("inputs");
let alarmForm = document.querySelector("form");
const deleteButton = document.querySelector("ul");
const alarmList = document.querySelector(".alarmList");
const setAlarm = document.getElementById("set");
let alarmArr = [];
let alList = document.getElementById("list");
let audio = new Audio("alarm.mp3");

timeZone.innerHTML += `
<select id = "zone" required>
<option value="zone" selected disabled hidden>zone</option>
<option value="AM">AM</option>
<option value="PM">PM</option>
</select>`;

function updateZero(t) {
  if (t < 10) {
    return `0${t}`;
  }
  return t;
}

function currentTime() {
  let date = new Date();
  let hour =
    date.getHours() > 12
      ? date.getHours() - 12
      : date.getHours() === 0
      ? "12"
      : date.getHours();
  let minute = date.getMinutes();

  let sec = date.getSeconds();
  let zone = date.getHours() >= 12 ? "PM" : "AM";
  //console.log(hour);
  return [hour, minute, sec, zone];
}
let intervalId; // Store the interval ID for clearing the interval

function displayTime() {
  let [hours, minutes, seconds, zone] = currentTime();
  hours = updateZero(hours);
  minutes = updateZero(minutes);
  seconds = updateZero(seconds);
  timerRef.innerHTML = `<span>${hours}:${minutes}:${seconds} ${zone}</span>`;
  let time = `${hours}:${minutes}:${seconds}`;
  if (alarmArr.includes(time)) {
    clearInterval(intervalId); // Stop updating the time display
    ringAlarm();
  }
}

// function for input type="number" maxlength work properly
document.querySelectorAll(`input[type="number"]`).forEach((input) => {
  input.oninput = () => {
    if (input.value.length > input.maxLength)
      input.value = input.value.slice(0, input.maxLength);
  };
});

function addDom(time) {
  const id = Date.now().toString();

  alList.innerHTML += `<li >
  <span  id="${id}">${time}</span>
  <span ><i id="${id}" class="fa-solid fa-trash-can delete" ></i></span>
  </li>`;
  console.log("jhdh", deleteButton);
}
//set alarm
alarmForm.addEventListener("submit", (e) => {
  // alarmIndex += 1;
  e.preventDefault();
  //alarmObjects

  let alarmHour = alarmForm.hourInput.value;
  let alarmMinute = alarmForm.minuteInput.value;
  let alarmSecond = alarmForm.secondInput.value;
  let zoneTime = alarmForm.zone.value;
  let newAlarm = `${alarmHour}:${alarmMinute}:${alarmSecond} ${zoneTime}`;
  console.log("alarm", deleteButton);
  alarmArr.push(newAlarm);
  addDom(newAlarm);
});

setInterval(displayTime, 1000);

function updateAlarmList() {
  deleteButton.innerHTML = "";
  for (let i = 0; i < alarmArr.length; i++) {
    addDom(alarmArr[i]);
  }
  alert("Deleted successfully");
}

function handleListner(e) {
  let target = e.target;
  console.log(target);
  if (target.classList.contains("delete")) {
    var id = target.id;
    const value = document.getElementById(`${id}`).innerText;
    console.log(value);
    deleteAlarm(value);
  }
}

function deleteAlarm(value) {
  let newAlarmList = alarmArr.filter((time) => {
    return time !== value;
  });
  console.log(newAlarmList);
  alarmArr = newAlarmList;
  console.log(alarmList);
  updateAlarmList();
}

deleteButton.addEventListener("click", handleListner);
//ring alarm
let stopAlarmButton;
function startClock() {
  intervalId = setInterval(displayTime, 1000); // Start updating the time display
}

function stopClock() {
  clearInterval(intervalId); // Stop updating the time display
}


function ringAlarm() {
  audio.play();
  audio.loop = true;

  // Create the "Stop Alarm" button
  const stopAlarmButton = document.createElement("button");
  stopAlarmButton.textContent = "Stop Alarm";
  stopAlarmButton.addEventListener("click", stopAlarm);
  document.body.appendChild(stopAlarmButton);
}

function stopAlarm() {
  audio.pause();
  audio.currentTime = 0;
  audio.loop = false;

  // Remove the "Stop Alarm" button from the DOM
  const stopAlarmButton = document.querySelector("button");
  if (stopAlarmButton) {
    stopAlarmButton.parentNode.removeChild(stopAlarmButton);
  }

  startClock(); // Restart the clock
}

startClock(); // Start the clock initially
