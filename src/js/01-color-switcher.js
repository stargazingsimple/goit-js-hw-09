const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

const INTERVAL_TIME = 1000;
let intervalId = null;

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

refs.stopButton.disabled = true;

function onStartButtonClick(e) {
  e.target.disabled = true;
  refs.stopButton.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_TIME);
}

function onStopButtonClick(e) {
  e.target.disabled = true;
  refs.startButton.disabled = false;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
