// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
startBtn.disabled = true;

let selectedDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] <= new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
                timeout: 3000,
                close: true,
                color: '#EF4040',
                border: '2px solid #FFBEBE',
                animateInside: true,
                progressBar: true,
                layout: 'topRight',
                zindex: 9999,
            })
            startBtn.setAttribute('disabled', true);
        } else {
            selectedDate = selectedDates[0];
            startBtn.removeAttribute('disabled');
        }
    },
};

flatpickr(input, options);

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

const addLeadingZero = (value) => {
    return String(value).padStart(2, '0');
}

const updateTimerDisplay = ({ days, hours, minutes, seconds }) => {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

const countdown = () => {
    const now = new Date();
    const timeRemaining = selectedDate - now;
    if (timeRemaining <= 0) {
        clearInterval(timerId);
        input.removeAttribute('disabled');
        return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    updateTimerDisplay({ days, hours, minutes, seconds });
}

startBtn.addEventListener('click', () => {
    countdown();
    timerId = setInterval(countdown, 1000);
    startBtn.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
});