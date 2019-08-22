let slides = document.querySelectorAll('.slide');
let indContainer = document.querySelector('.indicators');
let indItems = document.querySelectorAll('.indicator');
let pauseBtn = document.querySelector('#pause');
let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');

let currentSlide = 0;
let playing = true;
let timerInterval = 2000;
let timerID;
let length = slides.length;

const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
const FA_PLAY = '<i class="far fa-play-circle"></i>';
const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';
const KEY_SPACE = ' ';

function goToSlide(n) {
    slides[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (length + n) % length;
    slides[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
}

let pause = () => {
    playing = false;
    clearInterval(timerID);
    pauseBtn.innerHTML = FA_PLAY;
};

let prev = () => {
    goToSlide(currentSlide - 1);
}

let next = () => {
    goToSlide(currentSlide + 1);
}

function startTimer() {
    timerID = setInterval(next, timerInterval);
}

let play = () => {
    playing = true;
    startTimer();
    pauseBtn.innerHTML = FA_PAUSE;
}

let clickPause = () => {
    if (playing) {
        pause ();
    } else {
        play();
    }
}

let clickPrev = () => {
    pause();
    prev();
}

let clickNext = () => {
    pause();
    next();
}

let clickIndicator = function (e) {
    let target = e.target;

    if (target.classList.contains('indicator')) {
        pause();
        goToSlide(+target.getAttribute('data-slide-to'));
    }
};


let controlKeys = (e) => {
    if (e.key === KEY_SPACE) clickPause();
    if (e.key === KEY_LEFT) clickPrev();
    if (e.key === KEY_RIGHT) clickNext();
}

pauseBtn.addEventListener('click', clickPause);
prevBtn.addEventListener('click', clickPrev);
nextBtn.addEventListener('click', clickNext);

indContainer.addEventListener('click', clickIndicator);
document.addEventListener('keydown', controlKeys);

startTimer();