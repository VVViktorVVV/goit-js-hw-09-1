import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const btn = document.querySelector('button');
let firstDelayEl = document.querySelector('[name="delay"]')
let stepDelayEl = document.querySelector('[name="step"]')
let amounEL = document.querySelector('[name="amount"]')

form.addEventListener('submit', e => { e.preventDefault(); });

let delayCount = 0;
let step = 0;
let amount = 0;
let countResult = 0


btn.addEventListener('click', onSubmit);


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }) ;
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit() {
  countResult = setInterval(() => {
    
    amount += 1;
    delayCount += +stepDelayEl.value;
    
    if (amount === 1) {
      delayCount += +firstDelayEl.value;
    }

     if (amount === +amounEL.value) {
      clearInterval(countResult);
    }

    createPromise(amount, delayCount)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
   })
    .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
      
  }, stepDelayEl.value)
  
  delayCount = 0;
  amount = 0;

}





