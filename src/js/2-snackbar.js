// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        icon: 'false',
        position: 'topRight',
        backgroundColor: '#59A10D',
        progressBar:'#326101',
        messageColor: '#FFFFFF',
        closeColor: '#FFFFFF',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        icon: 'false',
        position: 'topRight',
        backgroundColor: '#EF4040',
        progressBar:'#B51B1B',
        messageColor: '#FFFFFF',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });

  form.reset();
});