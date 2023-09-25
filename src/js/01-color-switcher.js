const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId;
stopBtn.disabled = true;

document.body.addEventListener('click', evt => {
  if (evt.target.hasAttribute('data-start')) {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    getBodyRandomHexColor();
    intervalId = setInterval(() => {
      getBodyRandomHexColor();
    }, 1000);
  }
  if (evt.target.hasAttribute('data-stop')) {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    clearInterval(intervalId);
  }
});

function getBodyRandomHexColor() {
  return (document.body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  )
    .toString(16)
    .padStart(6, 0)}`);
}
