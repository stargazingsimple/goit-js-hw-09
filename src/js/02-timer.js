import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};

const INTERVAL_DELAY = 1000;

refs.startButton.disabled = true;

const dateFlatPicker = flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateCurrent = new Date().getTime();
    const dateSelect = selectedDates[0].getTime();
    if (dateCurrent > dateSelect) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
    }
  },
});

refs.startButton.addEventListener('click', onStartTimer);

function onStartTimer() {
  refs.input.disabled = true;
  refs.startButton.disabled = true;
  setInterval(() => {
    const dateCurrent = Date.now();
    const dateSelect = dateFlatPicker.selectedDates[0];
    if (dateCurrent > dateSelect) {
      refs.input.disabled = false;
      refs.startButton.disabled = false;
      return;
    }
    const deltaTime = dateSelect - dateCurrent;
    const deltaTimeComponents = convertMs(deltaTime);
    updateClock(deltaTimeComponents);
  }, INTERVAL_DELAY);
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
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second),
  );

  return { days, hours, minutes, seconds };
}

function updateClock({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = days;
  refs.hoursValue.textContent = hours;
  refs.minutesValue.textContent = minutes;
  refs.secondsValue.textContent = seconds;
}
