const currentPath = window.location.pathname;
const isInsidePages = currentPath.includes('/paginas/');
const isInsideExtraPages = currentPath.includes('/paginas extra/') || currentPath.includes('/paginas%20extra/');
const basePath = isInsideExtraPages ? '../components/' : isInsidePages ? 'components/' : 'paginas/components/';

fetch(`${basePath}header.html`)
  .then(response => {
    if (!response.ok) throw new Error('Header not found');
    return response.text();
  })
  .then(data => {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    headerContainer.innerHTML = data;

    const botonTema = headerContainer.querySelector('#btn-tema');
    const botonAccesibilidad = headerContainer.querySelector('#btn-accesibilidad');

    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'oscuro') {
      document.body.classList.add('modo-oscuro');
      if (botonTema) {
        botonTema.textContent = 'Modo claro';
        botonTema.setAttribute('aria-pressed', 'true');
      }
    }

    const textoGrandeGuardado = localStorage.getItem('textoGrande');
    if (textoGrandeGuardado === 'true') {
      document.body.classList.add('texto-grande');
      if (botonAccesibilidad) {
        botonAccesibilidad.setAttribute('aria-pressed', 'true');
        botonAccesibilidad.setAttribute('aria-label', 'Desactivar texto grande');
      }
    }

    if (botonTema) {
      botonTema.addEventListener('click', () => {
        const modoOscuroActivo = document.body.classList.toggle('modo-oscuro');

        botonTema.textContent = modoOscuroActivo ? 'Modo claro' : 'Modo oscuro';

        botonTema.setAttribute('aria-pressed', String(modoOscuroActivo));
        localStorage.setItem('tema', modoOscuroActivo ? 'oscuro' : 'claro');
      });
    }

    if (botonAccesibilidad) {
      botonAccesibilidad.addEventListener('click', () => {
        const textoGrandeActivo = document.body.classList.toggle('texto-grande');

        botonAccesibilidad.setAttribute('aria-pressed', String(textoGrandeActivo));
        botonAccesibilidad.setAttribute(
          'aria-label',
          textoGrandeActivo ? 'Desactivar texto grande' : 'Activar texto grande'
        );
        localStorage.setItem('textoGrande', String(textoGrandeActivo));
      });
    }

    const pageTitle = document.body.dataset.pageTitle || 'EcoRuta';
    const titleElement = headerContainer.querySelector('#page-title');
    if (titleElement) {
      titleElement.textContent = pageTitle;
    }

    const homeLink = headerContainer.querySelector('[data-link="home"]');
    const contactLink = headerContainer.querySelector('[data-link="contact"]');
    const navegation = headerContainer.querySelector('nav');

    if (!isInsidePages && navegation) {
        navegation.remove();
        const header = headerContainer.querySelector('header');
        if (header) {
          header.classList.add('sin-navegacion');
        }
    }

    if (homeLink) {
      homeLink.href = isInsideExtraPages ? '../../index.html' : isInsidePages ? '../index.html' : 'index.html';
    }

    if (contactLink) {
      contactLink.href = isInsideExtraPages
        ? 'contacto.html'
        : isInsidePages
          ? 'paginas extra/contacto.html'
          : 'paginas/paginas extra/contacto.html';
    }
  })
  .catch(error => {
    console.error('Error loading header:', error);
  });

fetch(`${basePath}footer.html`)
  .then(response => {
    if (!response.ok) throw new Error('Footer not found');
    return response.text();
  })
  .then(data => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = data;
    }
  })
  .catch(error => {
    console.error('Error loading footer:', error);
  });

function inyectarModuloEmergencias() {
  // Evitar duplicación si el módulo ya existe
  if (document.getElementById('btn-emergencia-flotante')) return;

  const emergenciaHTML = `
    <button id="btn-emergencia-flotante" class="btn-emergencia-sticky" aria-label="Abrir directorio de contactos de emergencia" aria-expanded="false">
      <span class="texto-btn"> Emergencia</span>
    </button>
    <div id="panel-emergencia" class="panel-emergencia oculto" tabindex="-1">
        <h3>Contactos de Emergencia</h3>
        <p class="aviso-medico">Este panel es un directorio informativo directo con entidades públicas y no constituye una garantía de atención médica directa por parte de EcoRuta.</p>
        <ul>
            <li><a href="tel:133" onclick="return false;"> Carabineros: 133</a></li>
            <li><a href="tel:131" onclick="return false;"> Ambulancia (SAMU): 131</a></li>
            <li><a href="tel:132" onclick="return false;"> Bomberos: 132</a></li>
            <li><a href="tel:130" onclick="return false;"> CONAF (Incendios): 130</a></li>
        </ul>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', emergenciaHTML);

  const btnEmergencia = document.getElementById('btn-emergencia-flotante');
  const panelEmergencia = document.getElementById('panel-emergencia');

  if (btnEmergencia && panelEmergencia) {
    btnEmergencia.addEventListener('click', () => {
      const estaOculto = panelEmergencia.classList.toggle('oculto');
      btnEmergencia.setAttribute('aria-expanded', String(!estaOculto));

      if (!estaOculto) {
        panelEmergencia.focus();
      }
    });
  }
}

// Inyectar el botón tan pronto como el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inyectarModuloEmergencias);
} else {
  inyectarModuloEmergencias();
}