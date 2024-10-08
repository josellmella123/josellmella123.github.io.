let currentStep = 1;

window.onload = function() {
  const introOverlay = document.getElementById('introOverlay');
  const toggleButton = document.getElementById('toggleIntroButton');

  if (localStorage.getItem('introShown') === 'true') {
    introOverlay.style.display = 'none';
    toggleButton.innerText = 'Mostrar Introducción';
  } else {
    setTimeout(() => {
      introOverlay.style.opacity = '1';
      document.getElementById('step1').classList.add('active');
    }, 500);
  }

  toggleButton.addEventListener('click', () => {
    if (introOverlay.style.display === 'none' || introOverlay.style.display === '') {
      introOverlay.style.display = 'flex';
      setTimeout(() => {
        introOverlay.style.opacity = '1';
      }, 50);
      toggleButton.innerText = 'Ocultar Introducción';
    } else {
      introOverlay.style.opacity = '0';
      setTimeout(() => {
        introOverlay.style.display = 'none';
        toggleButton.innerText = 'Mostrar Introducción';
      }, 500);
    }
  });
}

function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName('tab-content');
  const tabButtons = document.getElementsByClassName('tab-button');

  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = 'none';
  }

  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replace(' active', '');
  }

  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}


function nextStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    currentStep = step;
    setTimeout(() => {
        document.getElementById(`step${step}`).classList.add('active');
    }, 50);
}

function startGame() {
  localStorage.setItem('introShown', 'true');
  document.getElementById('introOverlay').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('introOverlay').style.display = 'none';
  }, 500);
}

function showGameOptions() {
  document.getElementById('gameOptions').style.display = 'block';
}

function showDescription(option) {
  let descriptionText = '';
  switch (option) {
    case 'Jugadores':
      descriptionText = 'Los mejores jugadores actualmente son clasificados en bombos donde dependiendo el bombo en el que estén, mayor será la “habilidad” de estos. Bombo 1 toman o reparten o evitan 1, Bombo 2 toman o reparten o evitan 2 y Bombo 3 toman o reparten o evitan 3. Se dividen en 3 secciones: atacantes (toman), mediocampistas (reparten), defensas o arqueros (evitan). Los que evitan, lo hacen cuando les toca tomar.';
      break;
    case 'Trivia':
      descriptionText = 'Piense en una pregunta y los que se la respondan mal toman 1 trago pero si la responden bien toma 1 trago el que hizo la pregunta las veces que le respondieron bien.';
      break;
    case 'Que Prefieres':
      descriptionText = 'Los jugadores deben elegir entre dos opciones y el que menos elijan los demás debe tomar 1 trago, están las opciones de la izquierda y de la derecha y en caso de empate todos toman 1 trago.';
      break;
    case 'Caracteristicas':
      descriptionText = 'Según la característica seleccionada, se realizará una acción específica. Por ejemplo, si se selecciona "Vinicius", el jugador más rápido toma 1 trago.';
      break;
    case 'Retos y Juegos':
      descriptionText = 'Si la opcion seleccionada es reto o juego se debe realizar la accion que se indique en la carta, si no se cumple la accion se toma 1 trago.';
      break;
    case 'Goats':
      descriptionText = 'Jugador decide una regla y se cambia cada vez que alguien le salga otro goat y asi sucecivamente, el que no cumpla la regla toma 1 trago.';
      break;
  }
  document.getElementById('description').innerText = descriptionText;
}


function openGameOverlay() {
  const gameOverlay = document.getElementById('gameOverlay');
  gameOverlay.style.display = 'flex';
  setTimeout(() => {
    gameOverlay.style.opacity = '1';
  }, 50);
}

function closeGameOverlay() {
  const gameOverlay = document.getElementById('gameOverlay');
  gameOverlay.style.opacity = '0';
  setTimeout(() => {
    gameOverlay.style.display = 'none';
  }, 500);
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(registration => {
    console.log('Service Worker registrado con éxito:', registration);
  }).catch(error => {
    console.log('Error al registrar el Service Worker:', error);
  });
}

const ruleta = document.querySelector('#ruleta');
const sonido = new Audio('sonido/ruleta.mp3'); // Carga el sonido

ruleta.addEventListener('click', girar);
giros = 0;

const opcionesCaracteristicas = [
  "Kane: nunca gana nada, todos levantan sus copas y toman 1 trago, menos tú.", "Yamal: toma el jugador más joven.", "Miura: toma el jugador más viejo.", "Insigne: toma el jugador más bajo.", "Crouch: toma el jugador más alto.", "Icardi: toma el peor amigo o el más roba pololas.", "Maxi lopez: toma el más cuernudo.", "Gallager: toma el amigo más moreno.", "Son: toma el amigo con los ojos más rasgados.", "Vini: toma el amigo más rápido",
  "Adama Traoré: toma el amigo más fuerte.", "Zamorano: toma el mejor “bailarín” (cabeceador).", "Trent: pie de ángel, toma el jugador que mejor hace los tragos.", "Neymar: “piscinero”, toma el jugador mas mentiroso.", "Zlatan: toma el jugador mas egocéntrico.", "Kante: toma el jugador mas humilde.", "Beckam: toma el jugador mas bonito.", "Terry: toma el jugador mas infiel.", "Figo: toma el jugador mas traicionero", "Laudrup: Madrid y barca, toman los jugadores que hayan estado o besado con enemigas(amigas que se odien).",
  "Pirlo: los tres grandes italianos, toman los jugadores que hayan estado o besado amigas.", "Grealish: toma el jugador mas borracho.", "Jordi tomphson: toma el jugador mas conflictivo.", "Pepe: toma el jugador mas hachero.", "Darwin: toma el jugador que no la mete nunca (interpretable)", "Mbappe: toma el jugador mas “open mind”", "Haaland: toma el jugador que la mete siempre.", "Pepe rojas: toma el jugador mas lento.", "Gordo Ronaldo: toma el jugador mas “gordo”.", "Los hermanos hernandez: toma el jugador con mas hermanos.",
  "Arturo Vidal: toma el jugador que maneje mas rápido (o que haya chocado).", "Ingeniero Pellegrini: toman los jugadores con titulo profesional.", "ronaldinho: toma el jugador mas fiestero.", "Vardy: el que debuto mas tarde toma", "Khvicha Kvaratskhelia: toma el jugador con el nombre mas extraño", "Hazard: toman 1 trago y reparten 1 trago los que no hacen ejercicio", "Pogba: toma el que no paso el dopping"
];

const opcionesRetosYJuegos = [
  "Vidal Arturo: cuando habla la mufa, mundo al revés el que se equivoca toma",
  "Morata: rey del offside, se elige un jugador al azar y cada que toma tu tmb tomas",
  "Bruno Gimarães: 10 celebraciones en 1 gol, como chancho inflado, pero con celebraciones.",
  "Anthony: spiner!, da 3 giros en el lugar y luego toma.",
  "Mariano closs: el que peor imita a mariano toma.",
  "Bambino pons: digan apodos del bambino.",
  "Arturo Vidal: imita el video del estoy bien mi familia está bien o toma.",
  "Tonalli: ludópata, apuesta tragos a un jugador al cara o sello.",
  "Isla: mandale un audio a tu ap o ultimo chat.",
  "Paqueta: baila como brasileño",
  "pedri: tiki taka, reparte a 1 jugador 1 trago, a otro 2 y por último 3 a otro",
  "xavi: tiki taka, reparte a 1 jugador 1 trago, a otro 2, 3 a otro y 4 a otro",
  "pep: tiki taka prime, lo mismo, pero hasta 5 jugadores y 5 tragos.",
  "Mou: jugar a la contra, devuelve los siguientes tragos que te repartan.",
  "Maldini: jefe de la defensa, puedes evitar tragos que le repartan a tus compañeros.",
  "Sa-za: nombra cual sería tu mejor dupla",
  "Zidane: elegante, nada de garabatos por 2 turnos (todos los jugadores hayan jugado)",
  "Endrik: nombra jugadores de los 60",
  "Papu gomez: baila como el papu",
  "Joaquín Sanchéz: el que se rie primero pierde"
];


const opcionesGoats = [
  "Messi", "Cristiano", "Pelé", "Maradona", "Cruyff", "Zidane", "Platini", "Di Stéfano"
];


const opcionesQuePrefieres = [
  "Real - Barsa", "City – United", "United – Liverpool", "City – Liverpool", "Milan – Inter", "Inter - Juve", "Anthony – Mudrik", "Icardi – Maxi Lopez", "Vidal – Care Pato", "Libertadores club – Mundial país", "Endrik – Bobby Charlton"
];



function girar() {
  if ('vibrate' in navigator) {
    navigator.vibrate(200); // Vibración táctil en dispositivos compatibles
  }
  if (giros < 3) {
    let vueltas = 10; // Número fijo de vueltas
    let rand = Math.random() * 360; // Ángulo aleatorio entre 0 y 360
    console.log(rand);
    let totalGiros = (vueltas * 360) + rand; // Suma de vueltas fijas y ángulo aleatorio
    calcular(totalGiros);
    giros++;
    sonido.play().catch(error => {
      console.error('Error al reproducir el sonido:', error);
    });
    document.querySelector('.contador').innerHTML = 'TURNOS: ' + giros; 
  } else {
    Swal.fire({
      icon: 'success',
      title: 'VUELVA PRONTO EL JUEGO TERMINO!!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value == true) {
        giros = 0;
        document.querySelector('.categoria').innerHTML = 'CATEGORIA ES: ';
        document.querySelector('.contador').innerHTML = 'TURNOS: ' + giros;        
      }
    })
  }
}

document.addEventListener('touchmove', function(event) {
  if (!event.target.closest('.scrollable')) {
      event.preventDefault();
  }
}, { passive: false });


function initAudio() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audio = document.querySelector('#audio');
  const source = audioContext.createMediaElementSource(audio);
  source.connect(audioContext.destination);
  
  document.addEventListener('touchstart', function() {
      audioContext.resume().then(() => {
          console.log('Playback resumed successfully');
      });
  }, { once: true });
}




let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);


window.addEventListener('load', function() {
  const ruleta = document.querySelector('#ruleta');
  if (ruleta) {
      ruleta.draggable = false; // Prevenir arrastre accidental en iOS
  }
});


let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Aquí puedes mostrar tu propio botón de instalación si lo deseas
});




function premio(premios) {
  document.querySelector('.categoria').innerHTML = 'CATEGORIA ES: ' + premios;
  switch (premios) {
    case "Jugadores":
      window.location.href = 'jugadores.html';
      break;
    case "Trivia":
      window.location.href = 'trivia.html';
      break;
      case "Que Prefieres":
        const opcionAleatoriaQuePrefieres = opcionesQuePrefieres[Math.floor(Math.random() * opcionesQuePrefieres.length)];
        window.location.href = 'queprefieres.html?opcion=' + encodeURIComponent(opcionAleatoriaQuePrefieres);
        break;
    case "Caracteristicas":
      const opcionAleatoria = opcionesCaracteristicas[Math.floor(Math.random() * opcionesCaracteristicas.length)];
      window.location.href = 'caracteristicas.html?opcion=' + encodeURIComponent(opcionAleatoria);
      break;
    case "Retos y Juegos":
      const opcionAleatoriaRetosYJuegos = opcionesRetosYJuegos[Math.floor(Math.random() * opcionesRetosYJuegos.length)];
      window.location.href = 'retosyjuegos.html?opcion=' + encodeURIComponent(opcionAleatoriaRetosYJuegos);
      break;
    case "Goats":
      const opcionAleatoriaGoats = opcionesGoats[Math.floor(Math.random() * opcionesGoats.length)];
      window.location.href = 'goats.html?opcion=' + encodeURIComponent(opcionAleatoriaGoats);
      break;
  }
}







function calcular(rand) {
  valor = rand % 360; // Ajusta el valor para que esté en el rango de 0 a 360
  ruleta.style.transform = "rotate(" + rand + "deg)";

  setTimeout(() => {
    switch (true) {
      case valor >= 0 && valor < 30:
        premio("Jugadores");
        break;
      case valor >= 30 && valor < 90:
        premio("Trivia");
        break;
      case valor >= 90 && valor < 150:
        premio("Que Prefieres");
        break;
      case valor >= 150 && valor < 210:
        premio("Caracteristicas");
        break;
      case valor >= 210 && valor < 270:
        premio("Retos y Juegos");
        break;
      case valor >= 270 && valor < 330:
        premio("Goats");
        break;
      case valor >= 330 && valor < 360:
        premio("Jugadores");
        break;
    }
  }, 5000);
}
