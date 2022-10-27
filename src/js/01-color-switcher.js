const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onBtnStartChangeBodyColor);
btnStop.addEventListener('click', onbtnStopChangeBodyColor);
let idInterval = null;

function changeBodyColor() {
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
}

function onBtnStartChangeBodyColor(event) {
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
  changeBodyColor();
  idInterval = setInterval(changeBodyColor, 1000);
}

function onbtnStopChangeBodyColor(event) {
  clearInterval(idInterval);
  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
