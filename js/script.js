document.addEventListener('DOMContentLoaded', () => {
  // Capturamos el formulario y todos sus elementos usando sus IDs
  const formulario = document.getElementById('formulario-contacto');
  const inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const inputMensaje = document.getElementById('mensaje');
  const btnEnviar = document.getElementById('btn-enviar');

  const errorNombre = document.getElementById('error-nombre');
  const errorEmail = document.getElementById('error-email');
  const errorMensaje = document.getElementById('error-mensaje');
  const mensajeExito = document.getElementById('mensaje-exito');

  if (!formulario) return; 

 
  function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validarNombre() {
    const valor = inputNombre.value.trim();
    if (valor === '') {
      mostrarError(inputNombre, errorNombre, 'El nombre no puede estar vacío.');
      return false;
    }
    mostrarExito(inputNombre, errorNombre);
    return true;
  }

  function validarEmail() {
    const valor = inputEmail.value.trim();
    if (!esEmailValido(valor)) {
      mostrarError(inputEmail, errorEmail, 'Ingresa un correo electrónico válido.');
      return false;
    }
    mostrarExito(inputEmail, errorEmail);
    return true;
  }

  function validarMensaje() {
    const valor = inputMensaje.value.trim();
    if (valor.length < 10) {
      mostrarError(inputMensaje, errorMensaje, 'El mensaje debe tener al menos 10 caracteres.');
      return false;
    }
    mostrarExito(inputMensaje, errorMensaje);
    return true;
  }

  
  function mostrarError(input, elementoError, mensaje) {
    input.style.borderColor = '#c62828'; 
    input.style.backgroundColor = '#ffebee';
    elementoError.textContent = mensaje; 
    elementoError.style.color = '#c62828';
  }

  function mostrarExito(input, elementoError) {
    input.style.borderColor = '#2e7d32'; 
    input.style.backgroundColor = '#e8f5e9';
    elementoError.textContent = '';
  }

  function evaluarEstadoGeneral() {
    const v1 = validarNombre();
    const v2 = validarEmail();
    const v3 = validarMensaje();

    
    btnEnviar.disabled = !(v1 && v2 && v3);
  }

  inputNombre.addEventListener('input', evaluarEstadoGeneral);
  inputEmail.addEventListener('input', evaluarEstadoGeneral);
  inputMensaje.addEventListener('input', evaluarEstadoGeneral);

  formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 

    if (!btnEnviar.disabled) {
      mensajeExito.textContent = '¡Gracias por contactar a EcoRuta Temuco! Tu mensaje fue enviado con éxito.';
      mensajeExito.style.color = '#2e7d32';

      formulario.reset();
      [inputNombre, inputEmail, inputMensaje].forEach(input => {
        input.style.borderColor = '#ccc';
        input.style.backgroundColor = '#ffffff';
      });

      btnEnviar.disabled = true;
    }
  });
});