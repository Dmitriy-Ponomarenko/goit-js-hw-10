import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const selectedDay = document.querySelector('.value[data-days]');
const selectedHour = document.querySelector('.value[data-hours]');
const selectedMinute = document.querySelector('.value[data-minutes]');
const selectedSecond = document.querySelector('.value[data-seconds]');

let userSelectedDate = null;
let intervalId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1,
  },
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      return iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        timeout: 1500,
      });
    }
  },
  onChange(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      startBtn.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

function start() {
  if (userSelectedDate === null) {
    return;
  }
  startBtn.disabled = true;
  input.disabled = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    let elapsedTime = userSelectedDate - currentTime;
    elapsedTime = Math.max(elapsedTime, 0);
    updateClockface(convertMs(elapsedTime));
    if (elapsedTime <= 0) {
      clearInterval(intervalId);
      input.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor((ms % hour) / minute));
  const seconds = addLeadingZero(Math.floor((ms % minute) / second));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  selectedDay.innerHTML = `${days}`;
  selectedHour.innerHTML = `${hours}`;
  selectedMinute.innerHTML = `${minutes}`;
  selectedSecond.innerHTML = `${seconds}`;
}

startBtn.addEventListener('click', start);