const currentPath = window.location.pathname;
const isInsidePages = currentPath.includes('/paginas/');
const isInsideExtraPages = currentPath.includes('/paginas extra/') || currentPath.includes('/paginas%20extra/');
const basePath = isInsidePages ? 'components/' : 'paginas/components/';

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
    }

    if (homeLink) {
      homeLink.href = isInsidePages ? '../index.html' : 'index.html';
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
