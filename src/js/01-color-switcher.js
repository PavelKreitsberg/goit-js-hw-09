const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

let isActive = false;

let timerId = null;

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const startChanging = (event) => {
    if (isActive) {
        return;
    }

    isActive = true;

    refs.body.style = `background-color: ${getRandomHexColor()}`

    timerId = setInterval(() => { refs.body.style = `background-color: ${getRandomHexColor()}` }, 1000)
}

const stopChanging = (event) => {
    isActive = false;
    clearInterval(timerId);
}


refs.startBtn.addEventListener('click', startChanging);

refs.stopBtn.addEventListener('click', stopChanging)