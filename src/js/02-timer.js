import "flatpickr/dist/themes/dark.css";
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true)

let targetTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();

    const timeToEnd = selectedDates[0].getTime() - currentTime;

    if (timeToEnd < 0) {
      refs.startBtn.setAttribute('disabled', true)
      Notify.failure("Please choose a date in the future");    
    } else {

      targetTime = selectedDates[0].getTime();
      refs.startBtn.removeAttribute('disabled', true)
    }
  },
};



flatpickr(refs.input, options);

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

function addLeadingZero(value) {
  // return result = value.toString().length === 1 ? `0${value}` : `${value}`
  return value.toString().padStart(2, '0')
}

function updateTimerValues({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours)
  refs.dataMinutes.textContent = addLeadingZero(minutes)
  refs.dataSeconds.textContent = addLeadingZero(seconds)

}

refs.startBtn.addEventListener('click', () => {
  const timerId = setInterval(() => {  
    updateTimerValues(convertMs(targetTime - Date.now()));

  }, 1000)

  setTimeout(() => {
    clearInterval(timerId)
  } , targetTime - Date.now())
})




