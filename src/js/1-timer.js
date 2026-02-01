// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Elements
const inputPicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Button Start - disabled
startBtn.disabled = true;

let userSelectedDate = null;
let timerId = null;

// Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        titleColor: '#FFFFFF',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        progressBar:'#B51B1B',
        messageColor: '#FFFFFF',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputPicker, options);

// Button Start
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  inputPicker.disabled = true;

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimer(convertMs(0));
      inputPicker.disabled = false;
      return;
    }

    updateTimer(convertMs(deltaTime));
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
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