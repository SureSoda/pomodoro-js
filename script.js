let tiempo = 25 * 60; // 25 minutos
let intervalo = null;

function actualizarTimer() {
    const minutos = Math.floor(tiempo / 60);
    const  segundos = tiempo % 60;
    document.getElementById('timer').textContent =
    `${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
}

function setTimerAdjustEnabled(enabled) {
    document.getElementById('increase').disabled = !enabled;
    document.getElementById('decrease').disabled = !enabled;
}

document.getElementById('start').addEventListener('click', () => {
    if (!intervalo) {
        intervalo = setInterval(() => {
            setTimerAdjustEnabled(false);
            if (tiempo > 0) {
                tiempo--;
                actualizarTimer();
            } else {
                clearInterval(intervalo);
                intervalo = null;
                alert("Pomodoro terminado!");
                document.getElementById('break').style.display = 'inline-block';
                setTimerAdjustEnabled(true);
            }
        }, 1000)
    }
});

document.getElementById('pause').addEventListener('click', () => {
    clearInterval(intervalo);
    intervalo = null;
    setTimerAdjustEnabled(true);
})

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(intervalo);
    intervalo = null;
    tiempo = 25 * 60;
    actualizarTimer();
    setTimerAdjustEnabled(true);

})

actualizarTimer();

document.getElementById('increase').addEventListener('click', () => {
    if (!intervalo) {
        tiempo += 300;
        actualizarTimer();
    }
});

document.getElementById('decrease').addEventListener('click', () => {
    if (!intervalo && tiempo > 60) {
        tiempo -= 300;
        actualizarTimer();
    }
});

document.getElementById('break').addEventListener('click', () => {
    tiempo = 5 * 60;
    actualizarTimer();
    document.getElementById('break').style.display = 'none';
    setTimerAdjustEnabled(false);
    intervalo = setInterval(() => {
        if (tiempo > 0) {
            tiempo--;
            actualizarTimer();
        } else {
            clearInterval(intervalo);
            intervalo = null;
            alert("Descanso terminado!");
            setTimerAdjustEnabled(true);
        }
    }, 1000)
});
