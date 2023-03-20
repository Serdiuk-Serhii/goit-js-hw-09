import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDatetimePiker = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const dataDateValue = document.querySelector('[data-days]');
const dataHoursValue = document.querySelector('[data-hours]');
const dataMinutesValue = document.querySelector('[data-minutes]');
const dataSecondsValue = document.querySelector('[data-seconds]');

let pickedTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedTime = selectedDates[0];
    const deltaT = pickedTime - new Date();
    if (deltaT > 0) {
      buttonStart.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(inputDatetimePiker, options);

buttonStart.disabled = true;

buttonStart.addEventListener('click', handleTimerStart);

function handleTimerStart() {
  buttonStart.disabled = true;
  timer();
}

function timer() {
  intervalId = setInterval(() => {
    let result = pickedTime - new Date();
    if (result <= 100) {
      clearInterval(intervalId);
      return Notiflix.Notify.success('Your time has come!!!');
    }
    dataDateValue.textContent = addLeadingZero(convertMs(result).days);
    dataHoursValue.textContent = addLeadingZero(convertMs(result).hours);
    dataMinutesValue.textContent = addLeadingZero(convertMs(result).minutes);
    dataSecondsValue.textContent = addLeadingZero(convertMs(result).seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
