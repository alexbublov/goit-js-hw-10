// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

const createPromise = (delay, state) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                res();
            } else {
                rej();
            }
        }, delay);
    });
}

iziToast.settings({
    position: "topRight",
    timeout: 3000,
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;
    createPromise(delay, state).then(() => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`
        })
    }).catch(() => {
        iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`
        });
    });

});