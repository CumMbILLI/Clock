const DEG__ON__SEC__MIN = 6
const DEG__HOUR = 360 / 12
const ZERO__STRING = "0"

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

let clockInterval 

const getLocalTime = () => {
    const date = new Date()
    const  hourLocal =  date.getHours() 
    const  minLocal = date.getMinutes()
    const  secLocal = date.getSeconds()

    return {secLocal,minLocal,hourLocal}
}

const insertInputValue = (seconds,minuts, hours) =>{
    inputSec.value = seconds<10?ZERO__STRING+seconds:seconds
    inputMin.value = minuts<10?ZERO__STRING+minuts:minuts
    inputHour.value = hours<10?ZERO__STRING+hours:hours
}

const rotateArrow = (second,minut,houru) => {
    style.innerHTML = `
    .circle.hour{transform: rotate(${DEG__HOUR*houru-90}deg);}
    .circle.min{transform: rotate(${DEG__ON__SEC__MIN*minut-90}deg);}
    .circle.sec{transform: rotate(${DEG__ON__SEC__MIN*second-90}deg);}
    `
}

const startClock = (second,minut,hour) => {
    clockInterval = setInterval(() => {
        second += 1
        if(second == 60){
            second = 0
            minut += 1
        }
        if(minut == 60){
            minut = 0
            hour += 1
        }
        if(hour == 24){
            hour = 0
        }

        insertInputValue(second,minut,hour)
        rotateArrow(second, minut, hour)
    },1000) 
}

const {secLocal,minLocal,hourLocal} = getLocalTime()
startClock(secLocal,minLocal,hourLocal)

const timer = () =>{
    clockBut.classList.toggle('_active')
    clearInterval(clockInterval)

     if(clockBut.classList.contains('_active'))
     {
        rotateArrow(0,0,0)
        insertInputValue(0,0,0)

        blockBut.style = 'display: flex;'
     }
     else{
        blockBut.style = 'display: none;'
        let {secLocal,minLocal,hourLocal} = getLocalTime()

        startClock(secLocal,minLocal,hourLocal)
    }
 }
 
const startTimer = () => {
    const second = +inputSec.value
    const minut = +inputMin.value
    const hour = +inputHour.value
    clockBut.disabled = true

    startClock(second, minut, hour)
}

const clearTimer = () => {
    clearInterval(clockInterval)
    rotateArrow(0, 0, 0)
    insertInputValue(0,0,0)

    clockBut.disabled = false
}

const stopTimer = () => {
    clockBut.disabled = false
    clearInterval(clockInterval)
}

const changeInput = () => {
    hour = +inputHour.value
    min = +inputMin.value
    sec = +inputSec.value

    rotateArrow(sec, min, hour)
}

const focusInput = () => {
    clearInterval(clockInterval)
}

const blurInput = () => {
    const second = +inputSec.value
    const minut = +inputMin.value
    const hour = +inputHour.value
    
    startClock(second, minut, hour)
}

clockBut.addEventListener("click", timer)
startBut.addEventListener("click", startTimer)
clearBut.addEventListener("click", clearTimer)
stopBut.addEventListener("click", stopTimer)

Array.from([inputSec,inputMin,inputHour]).forEach(elem => {
    elem.addEventListener("change",changeInput)
    elem.addEventListener("focus",focusInput)
    elem.addEventListener("blur",blurInput)
});