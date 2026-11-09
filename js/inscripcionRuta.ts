interface DatosInscripcion {
    nombre: string;
    email: string;
    telefono: string;
    cupos: number;
}

document.addEventListener("DOMContentLoaded", ()=> {
    const formulario = document.getElementById("form-inscripcion-ruta") as HTMLFormElement | null;
    const mensajeExito = document.getElementById("mensaje-exito-inscripcion") as HTMLParagraphElement | null;

    if (!formulario) return;

    // Elementos de los campos
    const inputNombre = document.getElementById("ins-nombre") as HTMLInputElement | null;
    const inputEmail = document.getElementById("ins-email") as HTMLInputElement | null;
    const inputTelefono = document.getElementById("ins-telefono") as HTMLInputElement | null;
    const inputCupos = document.getElementById("ins-cupos") as HTMLInputElement | null;

    // Mensajes de error
    const errNombre = document.getElementById("error-nombre") as HTMLSpanElement | null;
    const errEmail = document.getElementById("error-email") as HTMLSpanElement | null;
    const errTelefono = document.getElementById("error-telefono") as HTMLSpanElement | null;
    const errCupos = document.getElementById("error-cupos") as HTMLSpanElement | null;

    formulario.addEventListener("submit", (e: Event): void => {
        e.preventDefault();
        
        // Limpiar errores previos
        limpiarErrores();

        let esValido = true;

        // Validar Nombre
        if (!inputNombre || !inputNombre.value.trim()) {
            marcarError(inputNombre, errNombre, "El nombre completo es obligatorio.");
            esValido = false;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputEmail || !inputEmail.value.trim() || !regexEmail.test(inputEmail.value.trim())) {
            marcarError(inputEmail, errEmail, "Ingresa un correo electrónico válido.");
            esValido = false;
        }

        // Validar Cupos
        if (!inputCupos) return;
        const numCupos = parseInt(inputCupos.value, 10);
        if (isNaN(numCupos) || numCupos < 1 || numCupos > 5) {
            marcarError(inputCupos, errCupos, "La cantidad debe ser entre 1 y 5 personas.");
            esValido = false;
        }

        // Si todo es válido
        if (esValido && inputNombre && inputEmail && inputCupos) {
            const datos = {
                nombre: inputNombre.value.trim(),
                email: inputEmail.value.trim(),
                telefono: inputTelefono ? inputTelefono.value.trim() : "",
                cupos: numCupos
            };

            console.log("Inscripción realizada con éxito:", datos);

            if (mensajeExito) {
                mensajeExito.textContent = `¡Gracias, ${datos.nombre}! Tu inscripción para ${datos.cupos} cupo(s) ha sido registrada exitosamente.`;
                mensajeExito.classList.remove("oculto");
            }

            formulario.reset();
        }
    });

    function marcarError(input: HTMLInputElement | null, spanError: HTMLSpanElement | null, mensaje: string): void {
        if (input) input.classList.add("invalido");
        if (spanError) spanError.textContent = mensaje;
    }

    function limpiarErrores(): void {
        [inputNombre, inputEmail, inputTelefono, inputCupos].forEach(input => {
            if (input) input.classList.remove("invalido");
        });
        [errNombre, errEmail, errTelefono, errCupos].forEach(span => {
            if (span) span.textContent = "";
        });
        if (mensajeExito) {
            mensajeExito.classList.add("oculto");
            mensajeExito.textContent = "";
        }
    }
});