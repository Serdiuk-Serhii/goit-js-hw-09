const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId = null;

buttonStart.addEventListener('click', handleRandomizerStart);
buttonStop.addEventListener('click', handleRandomizerStop);

buttonStop.disabled = true;
bodyEl.style.backgroundColor = getRandomHexColor();

function handleRandomizerStart() {
    // console.log('we begin');
    disableButtonStart();
    intervalId = setInterval(changeBodyColor, 1000 );
};

function handleRandomizerStop() {
    // console.log('we stop');
    enableButtonStart();
    clearInterval(intervalId);
}

function changeBodyColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}

function disableButtonStart() {
    buttonStart.disabled = true;
    buttonStop.disabled = false;
};

function enableButtonStart() {
    buttonStart.disabled = false;
    buttonStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}