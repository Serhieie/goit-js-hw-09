import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  closeButton: false,
});

const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');
const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    btn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);
class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }
    Notiflix.Notify.success('Горячий час розпочато!', {
      timeout: 6000,
    });
    this.isActive = true;
    const intervalId = setInterval(() => {
      btn.disabled = true;
      const currentTime = Date.now();
      const settedDate = new Date(input.value).getTime() - currentTime;
      const convertedTime = this.convertMs(settedDate);
      this.onTick(convertedTime);

      if (settedDate <= 0) {
        clearInterval(intervalId);
        this.isActive = false;
        day.textContent = '00';
        hour.textContent = '00';
        second.textContent = '00';
        minute.textContent = '00';
        Notiflix.Notify.success(
          'На сьогодні знижки скінчились, побачимось через тиждень!',
          {
            timeout: 6000,
          }
        );
      }
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.toPad(Math.floor(ms / day));
    const hours = this.toPad(Math.floor((ms % day) / hour));
    const minutes = this.toPad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.toPad(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  toPad(value) {
    return String(value).padStart(2, 0);
  }
}

const timer = new Timer({
  onTick: updClock,
});

btn.addEventListener('click', timer.startTimer.bind(timer));

function updClock(time) {
  const { days, hours, seconds, minutes } = time;
  day.textContent = `${days}`;
  hour.textContent = `${hours}`;
  second.textContent = `${seconds}`;
  minute.textContent = `${minutes}`;
}
