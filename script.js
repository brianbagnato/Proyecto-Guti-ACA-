// script.js
// Sistema de Gestión de Alumnos
// Verificar si estamos en la página de clases
if (window.location.pathname.includes('clases.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Código para mostrar clases (similar al de clases.html)
    });
}

// Verificar si estamos en la página de creación
if (window.location.pathname.includes('crearClase.html')) {
    // Código para manejar creación de clases
}
// Contador para generar IDs únicos
let alumnoCount = 0;

// Referencias a elementos del DOM
const listaAlumnos = document.querySelector('.lista-alumnos');
const btnAgregar = document.querySelector('.alumno-input button');
const inputAlumno = document.getElementById('alumno');

/**
 * Crea un nuevo elemento de alumno en la lista
 * @param {string} nombre - Nombre del alumno a crear
 */
function crearAlumno(nombre) {

    // Crear contenedor principal
    const div = document.createElement('div');
    div.className = 'alumno-item';
    div.dataset.id = `alumno-${Date.now()}`; // ID único para manipulación

    // Elemento para mostrar el nombre
    const spanNombre = document.createElement('span');
    spanNombre.textContent = nombre;
    spanNombre.className = 'nombre-alumno';

    // Contenedor para botones de acciones
    const acciones = document.createElement('div');
    acciones.className = 'acciones';

    // Botón Editar
    const btnEditar = document.createElement('button');
    btnEditar.title = "Editar alumno";
    const iconoEditar = document.createElement('img');
    iconoEditar.src = 'lapiz.png';
    iconoEditar.alt = 'Editar';
    iconoEditar.style.width = '20px';
    iconoEditar.style.height = '20px';
    btnEditar.appendChild(iconoEditar);
    btnEditar.onclick = () => editarAlumno(spanNombre);

    // Botón Eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.title = "Eliminar alumno";
    const iconoEliminar = document.createElement('img');
    iconoEliminar.src = './img/Vector.png';
    iconoEliminar.alt = 'Eliminar';
    iconoEliminar.style.width = '20px';
    iconoEliminar.style.height = '20px';
    btnEliminar.appendChild(iconoEliminar);
    btnEliminar.onclick = () => eliminarAlumno(div);

    // Ensamblar componentes
    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);
    div.appendChild(spanNombre);
    div.appendChild(acciones);
    listaAlumnos.appendChild(div);
}

/**
 * Permite editar el nombre de un alumno
 * @param {HTMLElement} span - Elemento span que contiene el nombre
 */
function editarAlumno(span) {
    const originalNombre = span.textContent;
    const parent = span.parentElement;

    // Crear campo de edición
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalNombre;
    input.className = 'input-edicion';
    input.autofocus = true; // Foco automático al campo

    // Botón Aceptar
    const btnAceptar = document.createElement('button');
    btnAceptar.title = "Confirmar cambios";
    const iconoCheck = document.createElement('img');
    iconoCheck.src = 'check.png';
    iconoCheck.alt = 'Aceptar';
    iconoCheck.style.width = '20px';
    iconoCheck.style.height = '20px';

    // Botón Cancelar
    const btnCancelar = document.createElement('button');
    btnCancelar.title = "Cancelar edición";
    const iconoCancelar = document.createElement('img');
    iconoCancelar.src = 'cancelar.png';
    iconoCancelar.alt = 'Cancelar';
    iconoCancelar.style.width = '20px';
    iconoCancelar.style.height = '20px';

    // Configurar acciones
    btnAceptar.onclick = () => {
        if (input.value.trim() !== '') {
            span.textContent = input.value.trim();
        }
        restaurarVista(span, input, btnAceptar, btnCancelar);
    };

    btnCancelar.onclick = () => {
        span.textContent = originalNombre;
        restaurarVista(span, input, btnAceptar, btnCancelar);
    };

    // Reemplazar elementos en la UI
    parent.insertBefore(input, span);
    span.style.display = 'none';

    const acciones = parent.querySelector('.acciones');
    acciones.innerHTML = '';
    acciones.appendChild(btnAceptar);
    acciones.appendChild(btnCancelar);
}

/**
 * Restaura la vista normal después de editar
 * @param {HTMLElement} span - Elemento del nombre
 * @param {HTMLElement} input - Campo de entrada
 * @param {HTMLElement} btnAceptar - Botón aceptar
 * @param {HTMLElement} btnCancelar - Botón cancelar
 */
function restaurarVista(span, input, btnAceptar, btnCancelar) {
    const parent = span.parentElement;
    span.style.display = '';
    input.remove();

    const acciones = parent.querySelector('.acciones');
    acciones.innerHTML = '';

    // Recrear botones originales
    const btnEditar = document.createElement('button');
    btnEditar.title = "Editar alumno";
    const iconoEditar = document.createElement('img');
    iconoEditar.src = 'lapiz.png';
    iconoEditar.alt = 'Editar';
    iconoEditar.style.width = '20px';
    iconoEditar.style.height = '20px';
    btnEditar.appendChild(iconoEditar);
    btnEditar.onclick = () => editarAlumno(span);

    const btnEliminar = document.createElement('button');
    btnEliminar.title = "Eliminar alumno";
    const iconoEliminar = document.createElement('img');
    iconoEliminar.src = './img/Vector.png';
    iconoEliminar.alt = 'Eliminar';
    iconoEliminar.style.width = '20px';
    iconoEliminar.style.height = '20px';
    btnEliminar.appendChild(iconoEliminar);
    btnEliminar.onclick = () => eliminarAlumno(parent);

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);
}

/**
 * Elimina un alumno de la lista
 * @param {HTMLElement} elemento - Elemento DOM a eliminar
 */
function eliminarAlumno(elemento) {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
        elemento.remove();
    }
}
/*
// Evento para agregar nuevo alumno
btnAgregar.addEventListener('click', () => {
  let nombre = inputAlumno.value.trim();

  // Generar nombre automático si está vacío
  if (nombre === '') {
    alumnoCount++;
    nombre = `Alumno ${alumnoCount}`;
    crearAlumno(nombre);
  }else{
    
  crearAlumno(nombre);
  }

  crearAlumno(nombre);
  inputAlumno.value = '';
  inputAlumno.focus(); // Regresar foco al input
});
*/
// Permitir agregar con Enter
inputAlumno.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnAgregar.click();
    }
});
// ✅ Marca todos los radios con un valor dado (P, A o T)
function marcarTodos(valor) {
    const radios = document.querySelectorAll(`input[type="radio"][value="${valor}"]`);
    radios.forEach(radio => radio.checked = true);
}

// ✅ Cierra el registro: marca como "A" a los que no estén en "P" o "T"
function cerrarRegistro() {
    const radios = document.querySelectorAll('input[type="radio"]');
    const grupos = {};

    // Agrupar por name
    radios.forEach(radio => {
        const name = radio.name;
        if (!grupos[name]) grupos[name] = [];
        grupos[name].push(radio);
    });

    // Para cada grupo, si no está marcado ni P ni T, marcar A
    Object.values(grupos).forEach(grupo => {
        const algunoMarcado = grupo.find(r => r.checked && (r.value === "P" || r.value === "T"));
        if (!algunoMarcado) {
            const ausente = grupo.find(r => r.value === "A");
            if (ausente) ausente.checked = true;
        }
    });
}