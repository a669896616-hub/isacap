// No es necesario usar jQuery(document).ready si cargas el script en el footer,
// pero es una buena práctica por si acaso.
document.addEventListener('DOMContentLoaded', function () {
    
    // Buscamos nuestro slider en la página
    const homepageSlider = document.querySelector('.mi-slider-homepage');

    // Si el slider existe, lo inicializamos
    if (homepageSlider) {
        const swiper = new Swiper(homepageSlider, {
            // Aquí van todas tus opciones de configuración favoritas
            loop: false,
            // autoplay eliminado para que no se mueva solo
            effect: 'fade', // Un efecto elegante
            
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = Math.ceil(target / 100);

      if(count < target) {
        counter.innerText = count + increment > target ? target : count + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Igualar alturas solo en escritorio
  function matchHeights() {
    var row = document.querySelector('.row.align-items-stretch');
    if (!row) return;
    var left = row.querySelector('.col-md-6:first-child > div');
    var right = row.querySelector('.col-md-6:last-child form');
    if (window.innerWidth >= 768 && left && right) {
      left.style.height = right.offsetHeight + 'px';
    } else if(left) {
      left.style.height = 'auto';
    }
  }
  matchHeights();
  window.addEventListener('resize', matchHeights);
});

// EN MAIN.JS (dentro del DOMContentLoaded si lo tienes)

document.addEventListener('DOMContentLoaded', function() {
    // ... tu otro código existente ...

    // --- INICIO: Lógica para el sidebar responsivo ---
    const sidebarToggler = document.getElementById('client-sidebar-toggler');
    const pageWrapper = document.getElementById('client-page-wrapper');
    const contentOverlay = document.createElement('div');
    contentOverlay.className = 'client-content-overlay';

    if (sidebarToggler && pageWrapper) {
        // Añadimos la capa de overlay al DOM
        pageWrapper.appendChild(contentOverlay);

        // Al hacer clic en el botón, añadimos/quitamos una clase al contenedor principal
        sidebarToggler.addEventListener('click', function() {
            pageWrapper.classList.toggle('sidebar-is-open');
        });

        // Al hacer clic en la capa oscura, cerramos el menú
        contentOverlay.addEventListener('click', function() {
            pageWrapper.classList.remove('sidebar-is-open');
        });
    }
    // --- FIN: Lógica para el sidebar responsivo ---
});

const fechaInicioInput = document.getElementById('fecha_constitucion');
const fechaFinInput = document.getElementById('fecha_extincion');
const plazoDisplay = document.getElementById('display-plazo-calculado');

// Nos aseguramos de que los 3 elementos existan en la página actual
if (fechaInicioInput && fechaFinInput && plazoDisplay) {
    
    // Creamos una función que se encargará de todo el cálculo
    function calcularYMostrarPlazo() {
        const inicioVal = fechaInicioInput.value;
        const finVal = fechaFinInput.value;

        // Si alguna de las dos fechas falta, limpiamos el mensaje y no hacemos nada
        if (!inicioVal || !finVal) {
            plazoDisplay.textContent = '';
            return;
        }

        // Convertimos los textos de fecha a objetos de Fecha de JavaScript
        const fechaInicio = new Date(inicioVal);
        const fechaFin = new Date(finVal);

        // Validamos que las fechas sean correctas y que la de fin no sea anterior a la de inicio
        if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime()) || fechaFin < fechaInicio) {
            plazoDisplay.textContent = 'Fechas inválidas.';
            plazoDisplay.style.color = '#dc3545'; // Color rojo de Bootstrap para errores
            return;
        }
        
        plazoDisplay.style.color = 'inherit'; // Restauramos el color por defecto

        // Calculamos la diferencia en milisegundos y la convertimos a días
        const diffTime = Math.abs(fechaFin - fechaInicio);
        const totalDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Sumamos 1 para ser inclusivo
        
        let textoPlazo = '';

        // Aplicamos las mismas reglas de formato que en PHP
        if (totalDias < 30) {
            textoPlazo = `${totalDias} día(s)`;
        } else if (totalDias < 730) { // Menos de 24 meses aprox.
            const meses = Math.floor(totalDias / 30.44); // Promedio de días por mes
            textoPlazo = `${meses} mes(es)`;
        } else {
            const anios = (totalDias / 365.25).toFixed(1); // Un decimal
            textoPlazo = `${anios} año(s)`;
        }
        
        // Mostramos el resultado en nuestro div
        plazoDisplay.textContent = 'Plazo estimado: ' + textoPlazo;
    }

    // Le decimos a CADA campo de fecha que ejecute nuestra función cuando su valor cambie
    fechaInicioInput.addEventListener('change', calcularYMostrarPlazo);
    fechaFinInput.addEventListener('change', calcularYMostrarPlazo);
    
    // También la ejecutamos una vez al cargar la página, por si estamos en modo edición
    calcularYMostrarPlazo();
}

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
    
    // Selecciona todas las secciones que deben animarse
    const sectionsToAnimate = document.querySelectorAll('.scroll-section');

    if (!sectionsToAnimate.length) return;

    // Opciones para el Intersection Observer
    // threshold: 0.1 significa que la animación se dispara cuando el 10% del elemento es visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    // Creamos el observador
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento está intersectando (visible en la pantalla)
            if (entry.isIntersecting) {
                // Añadimos la clase 'is-visible' para activar la transición CSS
                entry.target.classList.add('is-visible');
                // Dejamos de observar este elemento una vez que ya es visible para mejorar el rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Le decimos al observador que vigile cada una de las secciones
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

});