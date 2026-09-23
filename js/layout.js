const currentPath = window.location.pathname;
const isInsidePages = currentPath.includes('/paginas/');
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

    const botonAccesibilidad = headerContainer.querySelector('button')
    botonAccesibilidad.addEventListener('click', () => {
        document.body.classList.toggle('texto-grande');
    })

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
      contactLink.href = isInsidePages ? 'contacto.html' : 'paginas/contacto.html';
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
