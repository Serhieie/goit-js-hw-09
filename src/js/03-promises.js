// import Notiflix from 'notiflix';
// Notiflix.Notify.init({
//   width: '300px',
//   position: 'right-top',
//   closeButton: false,
// });

// let count = 0;

// const refs = {
//   form: document.querySelector('.form'),
//   delay: document.querySelector('input[name="delay"]'),
//   step: document.querySelector('input[name="step"]'),
//   amount: document.querySelector('input[name="amount"]'),
// };

// refs.form.addEventListener('submit', evt => {
//   evt.preventDefault();
//   createPromise(refs.step.value, refs.delay.value);
// });

// function createPromise(position, delay) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       let result = parseFloat(delay);
//       let positionNum = parseFloat(position);
//       const intervalId = setInterval(() => {
//         count += 1;
//         const shouldResolve = Math.random() > 0.3;
//         if (shouldResolve) {
//           res(
//             Notiflix.Notify.success(
//               `✅ Fulfilled promise ${count} in ${result}ms`
//             )
//           );
//         } else {
//           rej(
//             Notiflix.Notify.failure(
//               `❌ Rejected promise ${count} in ${result}ms`
//             )
//           );
//         }
//         result += positionNum;
//         if (count === Number(refs.amount.value)) {
//           refs.step.value = '';
//           refs.delay.value = '';
//           refs.amount.value = '';
//           clearInterval(intervalId);
//           count = 0;
//         }
//       }, position);
//     }, delay);
//   });
// }

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  closeButton: false,
});

let count = 0;
let totalDelay = 0;
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', evt => {
  count = 0;
  evt.preventDefault();
  setTimeout(() => {
    count = 1;
    createPromise(Number(refs.step.value), Number(refs.delay.value));
    totalDelay = Number(refs.delay.value);
    const intervalId = setInterval(() => {
      totalDelay += Number(refs.step.value);
      count += 1;
      createPromise(Number(refs.step.value), Number(refs.delay.value));
      if (count >= Number(refs.amount.value)) {
        refs.step.value = '';
        refs.delay.value = '';
        refs.amount.value = '';
        clearInterval(intervalId);
      }
    }, Number(refs.step.value));
  }, Number(refs.delay.value));
});

function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      res({ position, delay });
    } else {
      rej({ position, delay });
    }
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(
        `✅ Fulfilled promise ${count} in ${totalDelay}ms`
      );
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(
        `❌ Rejected promise ${count} in ${totalDelay}ms`
      );
    });
}
