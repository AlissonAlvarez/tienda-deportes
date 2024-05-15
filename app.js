/* funcinalidad nava */
function mostrarBarraLateral() {
    let barraLateral = document.querySelector(".barraLateral")
    barraLateral.style.display = "flex"
}

function ocultarBarraLateral() {
    let barraLateral = document.querySelector(".barraLateral")
    barraLateral.style.display = "none"
}
/* nosotros */
document.addEventListener("DOMContentLoaded", function() {
    const carrusel = document.querySelector('.carrusel');
    const slides = document.querySelectorAll('.seccionInformacionAbajo article');
    const siguienteBtn = document.querySelector('.siguiente');
    const anteriorBtn = document.querySelector('.anterior');
  
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth;
    const intervalo = 5000;
  
    function siguienteSlide() {
      currentIndex++;
      if (currentIndex >= slides.length) {
        currentIndex = 0;
      }
      moverCarrusel();
    }
  
    function anteriorSlide() {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = slides.length - 1;
      }
      moverCarrusel();
    }
  
    function moverCarrusel() {
      const posicion = -currentIndex * slideWidth;
      carrusel.style.transition = 'transform 1s ease';
      carrusel.style.transform = `translateX(${posicion}px)`;
    }
  
    setInterval(siguienteSlide, intervalo);
  
  
    moverCarrusel();
  
    siguienteBtn.addEventListener('click', siguienteSlide);
    anteriorBtn.addEventListener('click', anteriorSlide);
  });

      