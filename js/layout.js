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

// ==========================================================================
// CÁTALOGO DE EMPRENDEDORES (HU-03 / Fetch de emprendedores publicados)
// ==========================================================================

async function cargarEmprendedoresPublicados() {
  const contenedor = document.getElementById('contenedor-emprendedores');
  // Si en la página actual no existe el contenedor, no hace nada
  if (!contenedor) return;

  // 1. Mostrar estado visible "Cargando..."
  contenedor.innerHTML = '<p class="mensaje-cargando">Cargando emprendedores...</p>';

  // Determinar la ruta relativa correcta al JSON según dónde esté la página actual
  const jsonPath = isInsidePages ? '../data/emprendedores.json' : 'data/emprendedores.json';

  try {
    // 2. Consumir el archivo JSON con fetch y async/await
    const respuesta = await fetch(jsonPath);

    if (!respuesta.ok) {
      throw new Error(`HTTP Error: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    // 3. Filtrar emprendedores con estado "Publicado"
    let publicados = datos.filter(emp => emp.estado === 'Publicado');

    // Novedad: Si estamos en una página de detalle de ciudad, filtramos también por ubicación
    const tituloPagina = document.body.dataset.pageTitle || '';

    if (tituloPagina.includes('Temuco')) {
      publicados = publicados.filter(emp => emp.ubicacion.toLowerCase() === 'temuco');
    } else if (tituloPagina.includes('Pucón')) {
      publicados = publicados.filter(emp => emp.ubicacion.toLowerCase() === 'pucón');
    } else if (tituloPagina.includes('Villarrica')) {
      publicados = publicados.filter(emp => emp.ubicacion.toLowerCase() === 'villarrica');
    }

    // 4. Dibujar las tarjetas dinámicamente en el DOM
    publicados.forEach(emp => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'carta-ciudad'; // Usa las clases que ya tienen en CSS

      tarjeta.innerHTML = `
        <h3>${emp.nombre}</h3>
        <p><strong>Ubicación:</strong> ${emp.ubicacion}</p>
        <p>${emp.descripcion}</p>
        <p><strong>Puntaje Sustentable:</strong> ${emp.puntajeSustentable} / 12</p>
        <div class="contacto-emprendedor" style="margin-top: 0.8rem; text-align: center;">
          <a href="https://wa.me/${emp.whatsapp.replace('+', '')}" target="_blank" class="btn-ciudad">WhatsApp</a>
          <p style="font-size: 0.8rem; margin-top: 0.4rem; color: #4a5568;">${emp.redesSociales}</p>
        </div>
      `;

      contenedor.appendChild(tarjeta);
    });

  } catch (error) {
    // 5. Manejo amigable con try/catch sin romper el sitio
    console.error('Error al cargar la lista de emprendedores:', error);
    contenedor.innerHTML = '<p class="mensaje-error">No se pudieron cargar los emprendedores en este momento.</p>';
  }
}

// Inyectar o cargar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', cargarEmprendedoresPublicados);
} else {
  cargarEmprendedoresPublicados();
}