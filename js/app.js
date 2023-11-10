var timerEl = document.getElementById('timer');
var RegLista = document.getElementById('registro-list');

let intervalId = 0;
let timer = 0;
let registros = [];

const formatTime = (time) => {
    let horas = Math.floor(time / 360000);
    let minutos = Math.floor((time % 360000) / 6000);
    let segundos = Math.floor((time % 6000) / 100);
    let milesegundos = time % 100;
    
    return `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}:${milesegundos.toString().padStart(2,'0')}`;
}

const addRegistro = (markIndex, markTime) => {
    RegLista.innerHTML += `<p> Marca ${markIndex}: ${formatTime(markTime)} </p>`
}

const markTime = () => {
    registros.push(timer);
    addRegistro(registros.length, timer);
}

const toggleTimer = () => {
    const button = document.getElementById('iniciar');
    const action = button.getAttribute('action');

    clearInterval(intervalId);

    if(action == 'start' || action == 'continue')  {
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer)
        }, 10 );

        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }

    else if ( action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
}

const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    registros = [];
    setTimer(timer);
    RegLista.innerHTML = '';
    const button = document.getElementById('iniciar');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="bi bi-play-fill"></i>';

}

const setTimer = (time) => {
    timerEl.textContent = formatTime(time);
}

document.getElementById('iniciar').addEventListener('click', toggleTimer);
document.getElementById('registro').addEventListener('click', markTime);
document.getElementById('reiniciar').addEventListener('click', resetTimer);