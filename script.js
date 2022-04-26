const DEG__ON__SEC__MIN = 6
const DEG__HOUR = 360 / 12

const clockTime = document.getElementById('time')
const clockBut = document.getElementById('clock__but')

const style = document.createElement('style')
document.getElementsByTagName('head')[0].appendChild(style);

const inputHour = document.getElementsByClassName('hour__input')[0]
const inputMin = document.getElementsByClassName('min__input')[0]
const inputSec = document.getElementsByClassName('sec__input')[0]

const blockBut = document.getElementsByClassName('buttons__timer')[0]
const startBut = document.getElementsByClassName('start')[0]
const clearBut = document.getElementsByClassName('clear')[0]
const stopBut = document.getElementsByClassName('stop')[0]

blockBut.style = "display: none;"
clockBut.addEventListener("click", timer)

let hour
let min
let sec

let startTime = setInterval(() => {rotateArrow()}, 1000)

const rotateArrow = () => {
    const date = new Date()

    hour = date.getHours()
    min = date.getMinutes()
    sec = date.getSeconds()
    const zero = "0"

    inputHour.value = hour<10?zero+hour:hour
    inputMin.value = min<10?zero+min:min
    inputSec.value = sec<10?zero+sec:sec

    style.innerHTML = `
    .circle.hour{transform: rotate(${DEG__HOUR*hour-90}deg);}
    .circle.min{transform: rotate(${DEG__ON__SEC__MIN*min-90}deg);}
    .circle.sec{transform: rotate(${DEG__ON__SEC__MIN*sec-90}deg);}
    `
}

function timer(){
   clockBut.classList.toggle('_active')

    if(clockBut.classList.contains('_active'))
    {
        clearInterval(startTime)

        inputHour.value = 0
        inputMin.value = 0
        inputSec.value = 0

        blockBut.style = 'display: flex;'
    }
    else{
        blockBut.style = 'display: none;'
        startTime = setInterval(() => {rotateArrow()},1000)
    }
}

function counterTime() {
    
}