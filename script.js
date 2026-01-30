// ============================================
// SISTEMA DE REGISTRO DE USUARIOS
// Versión: 1.2.3
// ============================================

// MALA PRÁCTICA
// API Keys, credenciales y cadenas de conexión hardcodeadas
// expuestas en el frontend.
//
// CORRECCIÓN:
// El frontend NO debe manejar secretos ni credenciales.
// Toda lógica sensible debe existir únicamente en el backend.

// Variables controladas
let registros = [];
let contador = 0;

// Configuración segura
const CONFIG = {
    debugMode: false, // Evita logs innecesarios en producción
    maxRegistros: 1000
};

// Inicialización del sistema
function inicializar() {
    document.getElementById("registroForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            guardarRegistro();
        });
}

// Validaciones básicas
function validarDatos(nombre, telefono, curp, email) {
    if (!nombre.trim()) {
        alert("El nombre es obligatorio");
        return false;
    }

    if (!/^\d{10}$/.test(telefono)) {
        alert("Teléfono inválido (10 dígitos)");
        return false;
    }

    if (curp.length !== 18) {
        alert("CURP inválido");
        return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Correo inválido");
        return false;
    }

    return true;
}

// Guardar registro
function guardarRegistro() {
    const nombre = nombreInput().value;
    const apellido1 = apellido1Input().value;
    const apellido2 = apellido2Input().value;
    const telefono = telefonoInput().value;
    const curp = curpInput().value;
    const email = emailInput().value;

    if (!validarDatos(nombre, telefono, curp, email)) return;

    // MALA PRÁCTICA
    // Guardar API Keys o tokens dentro de registros.

    const nuevoRegistro = {
        id: contador++,
        nombreCompleto: `${nombre} ${apellido1} ${apellido2}`,
        telefono,
        curp,
        email,
        fechaRegistro: new Date().toISOString()
    };

    registros.push(nuevoRegistro);
    agregarFilaTabla(nuevoRegistro);
    document.getElementById("registroForm").reset();
}

// Mostrar datos en tabla
function agregarFilaTabla(registro) {
    const tabla = document.getElementById("tablaRegistros");

    const fila = `
        <tr>
            <td>${registro.nombreCompleto}</td>
            <td>${registro.telefono}</td>
            <td>${registro.curp}</td>
            <td>${registro.email}</td>
        </tr>
    `;

    tabla.innerHTML += fila;
}

// MALA PRÁCTICA
// Diagnósticos que exponen información del navegador,
// sistema o credenciales.

// Inicialización segura del DOM
window.addEventListener("DOMContentLoaded", inicializar);

// MALA PRÁCTICA
// Exposición de variables internas en window para debugging.
