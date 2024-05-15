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

/* carrito */      
// Variable global para almacenar el total de la compra
let total = 0;
 
function agregarProducto() {
    // Obtener el contenido del producto y su precio
    let producto = this.parentNode.parentNode.getElementsByClassName("titulo")[0].innerText;
    let precio = parseFloat(this.parentNode.parentNode.getElementsByClassName("cuerpo")[0].querySelector("p").innerText);
 
    // Crear una nueva fila para la tabla
    let fila = document.createElement("tr");
 
    // Crear celdas para los datos del producto
    let celdaProducto = document.createElement("td");
    celdaProducto.innerText = producto;
 
    let celdaPrecio = document.createElement("td");
    celdaPrecio.innerText = precio.toLocaleString("es-ES", { style: "currency", currency: "COP" });
 
    let celdaCantidad = document.createElement("td");
    let botonIncrementar = document.createElement("button");
    botonIncrementar.innerText = "+";
    botonIncrementar.addEventListener("click", function() {
        let cantidadActual = parseInt(celdaCantidad.innerText);
        if (cantidadActual < 10) {
            celdaCantidad.innerText = cantidadActual + 1;
            actualizarTotal();
        }
    });
 
    let botonDecrementar = document.createElement("button");
    botonDecrementar.innerText = "-";
    botonDecrementar.addEventListener("click", function() {
        let cantidadActual = parseInt(celdaCantidad.innerText);
        if (cantidadActual > 1) {
            celdaCantidad.innerText = cantidadActual - 1;
            actualizarTotal();
        }
    });
 
    // Inicializar la cantidad en 1
    celdaCantidad.innerText = "1";
    // Agregar los botones de flecha a la celda de cantidad
    celdaCantidad.appendChild(botonIncrementar);
    celdaCantidad.appendChild(botonDecrementar);
 
    let celdaSubtotal = document.createElement("td");
    let subtotal = precio; // Inicializar el subtotal con el precio del producto
    celdaSubtotal.innerText = subtotal.toLocaleString("es-ES", { style: "currency", currency: "COP" });
 
    let celdaEliminar = document.createElement("td");
    let imagenEliminar = document.createElement("img");
    imagenEliminar.src = "img/borrar.png"; // Agrega la URL de la imagen de la caneca de basura
    celdaEliminar.appendChild(imagenEliminar);
 
    // Agregar las celdas a la fila
    fila.appendChild(celdaProducto);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaCantidad);
    fila.appendChild(celdaSubtotal);
    fila.appendChild(celdaEliminar);
 
    // Agregar la fila a la tabla
    document.getElementById("carrito-body").appendChild(fila);
 
    // Calcular el subtotal del producto y actualizar el total
    total += subtotal;
    actualizarTotal();
 
    // Obtener todas las imágenes de eliminar
    let imagenesEliminar = document.querySelectorAll(".carrito-table img");
 
    // Agregar el evento de clic a cada imagen
    imagenesEliminar.forEach(imagen => {
        imagen.addEventListener("click", function() {
            // Obtener la fila asociada a la imagen
            let fila = this.parentNode.parentNode;
            // Obtener el subtotal del producto que se va a eliminar
            let subtotalEliminar = parseFloat(fila.querySelector("td:nth-child(4)").innerText.replace("COP", "").replace(/\./g, "").replace(",", ""));
            // Restar el subtotal del producto eliminado del total
            total -= subtotalEliminar;
            // Actualizar el total
            actualizarTotal();
            // Eliminar la fila
            fila.parentNode.removeChild(fila);
        });
    });
}
 
function actualizarTotal() {
    let totalElemento = document.getElementById("total");
    totalElemento.innerText = total.toLocaleString("es-ES", { style: "currency", currency: "COP" });
}
 
// Obtener todos los botones "Comprar"
let botonesComprar = document.querySelectorAll(".pie button");
// Agregar el evento de clic a cada botón
botonesComprar.forEach(boton => {
    boton.addEventListener("click", agregarProducto);
});
 
// Llamar a la función actualizarTotal al cargar la página para mostrar el total inicial
actualizarTotal();