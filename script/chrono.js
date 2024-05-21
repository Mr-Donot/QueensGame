let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let reset = false;

function startChronometer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        reset = false;
    }
}

function stopChronometer() {
    clearInterval(tInterval);
    running = false;
}

function resetChronometer() {
    clearInterval(tInterval);
    reset = true;
    running = false;
    document.getElementById("chronometer").innerHTML = "00:00:00";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    document.getElementById("chronometer").innerHTML = hours + ":" + minutes + ":" + seconds;
}
