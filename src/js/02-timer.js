import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');

const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;

const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

let endTime = 0;
let inequalityTime = 0;
let timerId = null;




const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      return Notiflix.Notify.warning('Please choose a date in the future');  
    } else {
       btnStart.disabled = false;
    }

    endTime = selectedDates[0].getTime();
     
   
    },
};


flatpickr("#datetime-picker", options);

btnStart.addEventListener('click', timerToStart);

function timerToStart() {
  btnStart.disabled = true;
  input.disabled = true;

    

  timerId = setInterval(() => {
    const inMomentTime = new Date().getTime();
    inequalityTime = endTime - inMomentTime;

    if (inequalityTime < 0) {
      input.disabled = false;
      btnStart.disabled = false;
      clearInterval(timerId);
      return;
    }
    
    const { days, hours, minutes, seconds } = convertMs(inequalityTime);
   
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    
  }, 1000)


};


function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


function pad (value) {
  return String(value).padStart(2, '0');
}

