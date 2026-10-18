document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-contacto');
  if (!form) return;

  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const mensajeInput = document.getElementById('mensaje');
  const btnEnviar = document.getElementById('btn-enviar');

  const errorNombre = document.getElementById('error-nombre');
  const errorEmail = document.getElementById('error-email');
  const errorMensaje = document.getElementById('error-mensaje');
  const mensajeExito = document.getElementById('mensaje-exito');

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validarCampos() {
    let esValido = true;

    if (nombreInput.value.trim() === '') {
      if (errorNombre) errorNombre.textContent = 'El nombre es obligatorio.';
      nombreInput.classList.add('invalido');
      esValido = false;
    } else {
      if (errorNombre) errorNombre.textContent = '';
      nombreInput.classList.remove('invalido');
    }

    if (emailInput.value.trim() === '') {
      if (errorEmail) errorEmail.textContent = 'El correo electrónico es obligatorio.';
      emailInput.classList.add('invalido');
      esValido = false;
    } else if (!regexEmail.test(emailInput.value.trim())) {
      if (errorEmail) errorEmail.textContent = 'Ingresa un correo electrónico válido.';
      emailInput.classList.add('invalido');
      esValido = false;
    } else {
      if (errorEmail) errorEmail.textContent = '';
      emailInput.classList.remove('invalido');
    }

    if (mensajeInput.value.trim().length < 10) {
      if (errorMensaje) errorMensaje.textContent = 'El mensaje debe tener al menos 10 caracteres.';
      mensajeInput.classList.add('invalido');
      esValido = false;
    } else {
      if (errorMensaje) errorMensaje.textContent = '';
      mensajeInput.classList.remove('invalido');
    }

    if (btnEnviar) btnEnviar.disabled = !esValido;
    return esValido;
  }

  nombreInput.addEventListener('input', validarCampos);
  emailInput.addEventListener('input', validarCampos);
  mensajeInput.addEventListener('input', validarCampos);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validarCampos()) {
      if (mensajeExito) mensajeExito.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
      form.reset();
      if (btnEnviar) btnEnviar.disabled = true;

      setTimeout(() => {
        if (mensajeExito) mensajeExito.textContent = '';
      }, 5000);
    }
  });
});