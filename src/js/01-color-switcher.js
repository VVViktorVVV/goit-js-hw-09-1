const body = document.querySelector('.body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timerId = null;

function changeInterval() {
     
  timerId = setInterval(changeBgColor, 1000);
  btnStart.disabled = true;

}

function stopChange() {
  clearInterval(timerId);
  btnStart.disabled = false;
}

function changeBgColor() {
  let color = getRandomHexColor();
  body.style.backgroundColor = `${color}`;
  
   
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


btnStart.addEventListener('click', changeInterval);
btnStop.addEventListener('click', stopChange);