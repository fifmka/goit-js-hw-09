import Notiflix from 'notiflix';

const form = document.querySelector('.form');
console.log(form);
form.addEventListener('submit', callCreatePromise);

function callCreatePromise(event) {
  event.preventDefault();
  const inputAmount = Number(form.elements.amount.value);
  const delayFirst = Number(form.elements.delay.value);
  const delayStep = Number(form.elements.step.value);
  for (let i = 0; i < inputAmount; i += 1) {
    let delay = delayFirst + i * delayStep;
    createPromise(i + 1, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
