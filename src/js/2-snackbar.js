import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[type="number"]');
const state = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', handleClick);

function handleClick(event) {
  event.preventDefault();
  let delay = parseInt(input.value);
  let stateValue;
  state.forEach(radio => {
    if (radio.checked) {
      stateValue = radio.value;
    }
  });

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        timeout: 3000,
        icon: false,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        timeout: 3000,
        icon: false,
      });
    });
}