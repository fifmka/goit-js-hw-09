import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const btnStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

let timerId = null;
let chosenDate = null;

btnStart.addEventListener('click', onClickBtnStart);
btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date();
    if (selectedDates[0] < currentTime) {
      Notify.info('Please choose a date in the future');
      // window.alert();
    } else {
      chosenDate = selectedDates[0];
      btnStart.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function dateEntry({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}
function startTimer() {
  let timer = chosenDate - Date.now();
  if (timer > 0) {
    let timerObj = convertMs(timer);
    dateEntry(timerObj);
  } else {
    clearInterval(timerId);
  }
}

function onClickBtnStart(event) {
  btnStart.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
  startTimer();
  timerId = setInterval(startTimer, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
