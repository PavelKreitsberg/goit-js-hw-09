import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  submitBtn: document.querySelector('button'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
}

const formData = {
  delay: 0,
  step: 0,
  amount: 0,
}

const takingInputInfo = (e) => { formData[e.target.name] = Number(e.target.value); }

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notify.success(`Fulfilled promise ${position} in ${delay}ms`)) 
      } else {
        reject(Notify.failure(`Fulfilled promise ${position} in ${delay}ms`)) 
      }
    }, delay )
  })
}

refs.delayInput.addEventListener('input', takingInputInfo);

refs.stepInput.addEventListener('input', takingInputInfo);

refs.amountInput.addEventListener('input', takingInputInfo);

refs.submitBtn.addEventListener('click', (e) => {
  e.preventDefault()

  for (let i = 1; i <= formData.amount; i += 1) {
    createPromise(i, formData.delay)
    .then(value => {})
    .catch(error => {}); 
  
    formData.delay += formData.step;
  }  
})