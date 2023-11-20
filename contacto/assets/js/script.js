"use strict";

/* Loader */

document.addEventListener("DOMContentLoaded", function () {
  var loaderVideo = document.getElementById("loaderVideo");
  var loader = document.getElementById("loader");

  loaderVideo.addEventListener("ended", function () {
      loader.classList.add("loader2");
  });

  // Puedes ajustar el tiempo de espera según tus necesidades
  setTimeout(function () {
      loaderVideo.play(); // Inicia la reproducción del video
  }, 1000);
});



/* Sub - Menu */

function toggleSubMenu() {
    var subMenu = document.querySelector(".sub-menu");
    subMenu.style.display = (subMenu.style.display === "block") ? "none" : "block";
}

function toggleSubMenu() {
    var subMenu = document.querySelector(".sub-menu");
    var fundadoresLabel = document.querySelector(".li-fundadores");
    if (subMenu.style.display === "block") {
        subMenu.style.display = "none";
        fundadoresLabel.classList.remove("active");
    } else {
        subMenu.style.display = "block";
        fundadoresLabel.classList.add("active");
    }
}

function toggleSubMenu() {
    var subMenu = document.querySelector(".sub-menu");
    var fundadoresLabel = document.querySelector(".li-fundadores");

    if (subMenu.style.display === "block") {
        subMenu.style.display = "none";
        fundadoresLabel.classList.remove("active");
    } else {
        subMenu.style.display = "block";
        fundadoresLabel.classList.add("active");
    }
}


/* Slogan - Nav */

var executed = false; // Variable para controlar la ejecución única
var sloganElement = document.getElementById("slogan");
var text = "Calidad el único \ncamino del crecimiento"; // Texto con salto de línea
var scrollTimeout;

var executed = false; // Variable para controlar la ejecución única
var scrollTimeout; // Variable para controlar el tiempo de escritura
var completed = false; // Variable para controlar si la escritura se ha completado

function typeWriter(text, i) {
    if (i < text.length) {
        if (text.charAt(i) === "\n") {
            sloganElement.innerHTML += "<br>";
        } else {
            sloganElement.innerHTML += text.charAt(i);
        }
        i++;
        scrollTimeout = setTimeout(function () {
            typeWriter(text, i);
        }, 50); // Ajusta la velocidad de escritura
    } else {
        completed = true;
        executed = false; // Marca como no ejecutado
    }
}

window.addEventListener("scroll", function () {
    var sloganElement = document.getElementById("slogan");
    var scrollY = window.scrollY || window.pageYOffset;
    var windowHeight = window.innerHeight;
    var pageHeight = document.body.clientHeight;
    var scrollPercentage = (scrollY / (pageHeight - windowHeight)) * 100;

    if (scrollPercentage >= 35 && !executed && !completed) { // Ejecuta solo si se pasa del 35%, no se ha ejecutado antes y no se ha completado
        executed = true; // Marca como ejecutado
        sloganElement.innerHTML = ""; // Limpia el contenido existente
        sloganElement.classList.add("show-slogan");
        typeWriter("Calidad, el único \ncamino del crecimiento", 0);
    } else if (scrollPercentage < 35) { // Si se vuelve a desplazar hacia arriba, reinicia
        executed = false;
        completed = false; // Restablece el estado de completado
        sloganElement.classList.remove("show-slogan");
        clearTimeout(scrollTimeout); // Detiene la escritura en curso
    }
});



console.clear()
if (!CSS.supports('anchor-name: --anchor')) {
  
  /**
  * Run an event listener on the list.
  * Set the bounding properties based on closest element
  */
  const LIST = document.querySelector('ul')
  LIST.dataset.enhanced = true
  let current
  const UPDATE = ({ x, y }) => {
    const ARTICLE = document.elementFromPoint(x, y).closest('li').querySelector('article')
    if (ARTICLE !== current) {
      current = ARTICLE  
      // Set the bounds
      if (current) {
        const BOUNDS = current.getBoundingClientRect()
        console.info({ BOUNDS })
        LIST.style.setProperty('--top', BOUNDS.top)
        LIST.style.setProperty('--right', BOUNDS.right)
        LIST.style.setProperty('--bottom', BOUNDS.bottom)
        LIST.style.setProperty('--left', BOUNDS.left)
        LIST.style.setProperty('--height', BOUNDS.height)
        LIST.style.setProperty('--width', BOUNDS.width)
        console.info({ ARTICLE })
      }
    }
  }
  LIST.addEventListener('pointermove', UPDATE)
}




/* Mouse */

/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)



        // Velocidad de desplazamiento personalizada (ajusta el valor según tus preferencias)
        const velocidadScroll = 2;

        // Función para manejar el evento de scroll
        function handleScroll(event) {
            // Evita el desplazamiento predeterminado
            event.preventDefault();
            
            // Calcula la cantidad de desplazamiento basada en la velocidad personalizada
            const delta = event.deltaY;
            window.scrollBy(0, delta * velocidadScroll);
        }

        // Agrega un listener al evento de scroll
        window.addEventListener("wheel", handleScroll, { passive: false });


