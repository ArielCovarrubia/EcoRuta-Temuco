const currentPath = window.location.pathname;

const isInsidePages = currentPath.includes('/paginas/');

const isInsideExtraPages =
    currentPath.includes('/paginas extra/') ||
    currentPath.includes('/paginas%20extra/');

const basePath = isInsideExtraPages
    ? '../components/'
    : isInsidePages
        ? 'components/'
        : 'paginas/components/';




fetch(`${basePath}header.html`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar la cabecera');
        }

        return response.text();
    })
    .then(data => {
        const headerContainer =
            document.getElementById('header-container');

        if (!headerContainer) return;

        headerContainer.innerHTML = data;

        const botonAccesibilidad =
            headerContainer.querySelector('#btn-accesibilidad');

        const menuAccesibilidad =
            headerContainer.querySelector('#menu-accesibilidad');

        const selectorTexto =
            headerContainer.querySelector('#tamano-texto');

        const controlContraste =
            headerContainer.querySelector('#contraste-alto');

        const controlTema =
            headerContainer.querySelector('#btn-tema');

        if (botonAccesibilidad && menuAccesibilidad) {

            function cerrarMenuAccesibilidad() {
                menuAccesibilidad.hidden = true;

                botonAccesibilidad.setAttribute(
                    'aria-expanded',
                    'false'
                );
            }

            // Abrir y cerrar al presionar el botón
            botonAccesibilidad.addEventListener('click', () => {
                const abierto =
                    botonAccesibilidad.getAttribute('aria-expanded') === 'true';

                if (abierto) {
                    cerrarMenuAccesibilidad();
                } else {
                    menuAccesibilidad.hidden = false;

                    botonAccesibilidad.setAttribute(
                        'aria-expanded',
                        'true'
                    );
                }
            });

            // Cerrar al hacer clic fuera del menú
            document.addEventListener('click', (evento) => {
                if (
                    !menuAccesibilidad.contains(evento.target) &&
                    !botonAccesibilidad.contains(evento.target)
                ) {
                    cerrarMenuAccesibilidad();
                }
            });

            // Cerrar al presionar Escape
            document.addEventListener('keydown', (evento) => {
                if (
                    evento.key === 'Escape' &&
                    botonAccesibilidad.getAttribute('aria-expanded') === 'true'
                ) {
                    cerrarMenuAccesibilidad();
                    botonAccesibilidad.focus();
                }
            });

        }

        const guardarAccesibilidad =
            localStorage.getItem('guardarAccesibilidad') !== 'false';

        const temaGuardado = guardarAccesibilidad
            ? localStorage.getItem('tema')
            : null;

        const contrasteGuardado = guardarAccesibilidad
            ? localStorage.getItem('contrasteAlto')
            : null;

        const textoGuardado = guardarAccesibilidad
            ? localStorage.getItem('tamanoTexto')
            : null;

        document.body.classList.toggle(
            'modo-oscuro',
            temaGuardado === 'oscuro'
        );

        if (controlTema) {
            controlTema.checked = temaGuardado === 'oscuro';
        }

        document.body.classList.toggle(
            'alto-contraste',
            contrasteGuardado === 'true'
        );

        if (controlContraste) {
            controlContraste.checked = contrasteGuardado === 'true';
        }

        const botonesTamano = headerContainer.querySelectorAll('.btn-tamano');
        const anuncioAccesibilidad = headerContainer.querySelector('#anuncio-accesibilidad')

        const tamanosValidos = [
            'pequeno',
            'normal',
            'grande',
            'muy-grande'
        ];

        const nombreTamano = {
            'pequeno': 'Pequeño',
            'normal': 'Normal',
            'grande': 'Grande',
            'muy-grande': 'Muy grande'
        };

        const tamanoInicial = tamanosValidos.includes(textoGuardado)
            ? textoGuardado
            : 'normal';

        function aplicarTamanoTexto(tamano, anunciar = false) {
            document.body.classList.remove(
                'texto-pequeno',
                'texto-normal',
                'texto-grande',
                'texto-muy-grande',
                'texto-grande-antiguo'
            );

            document.body.classList.add(`texto-${tamano}`);

            // Aplicar el tamaño también al elemento raíz html.
            document.documentElement.classList.remove(
                'texto-pequeno',
                'texto-normal',
                'texto-grande',
                'texto-muy-grande'
            );

            document.documentElement.classList.add(`texto-${tamano}`);

            // 1. Actualiza el estado visual/accesible de los botones.
            botonesTamano.forEach(btn => {
                const esActivo = btn.dataset.tamano === tamano;
                btn.setAttribute('aria-pressed', String(esActivo));
            });

            // 2. Anuncio para lectores de pantalla.
            if (anunciar && anuncioAccesibilidad) {
                const nombreLegible = nombreTamano[tamano] || tamano;
                anuncioAccesibilidad.textContent =
                    `Tamaño del texto establecido en ${nombreLegible}.`;
            }
        }

        aplicarTamanoTexto(tamanoInicial, false);

        botonesTamano.forEach(boton => {
            boton.addEventListener('click', () => {
                const tamano = boton.dataset.tamano;
                if (!tamanosValidos.includes(tamano)) return;
            
                aplicarTamanoTexto(tamano, true);
               
                if (localStorage.getItem('guardarAccesibilidad') !== 'false') {
                    localStorage.setItem('tamanoTexto', tamano);
                }
            });
        });

        // Cambiar alto contraste.
        if (controlContraste) {
            controlContraste.addEventListener('change', () => {
                const activo = controlContraste.checked;

                document.body.classList.toggle('alto-contraste', activo);

                if (
                    localStorage.getItem('guardarAccesibilidad') !== 'false'
                ) {
                    localStorage.setItem(
                        'contrasteAlto',
                        String(activo)
                    );
                }
            });

            // Permitir activar con Enter.
            controlContraste.addEventListener('keydown', (evento) => {
                if (evento.key === 'Enter') {
                    evento.preventDefault();
                    controlContraste.click();
                }
            });
        }

        // Cambiar modo oscuro.
        if (controlTema) {
            controlTema.addEventListener('change', () => {
                const activo = controlTema.checked;

                document.body.classList.toggle('modo-oscuro', activo);

                if (
                    localStorage.getItem('guardarAccesibilidad') !== 'false'
                ) {
                    localStorage.setItem(
                        'tema',
                        activo ? 'oscuro' : 'claro'
                    );
                }
            });

            // Permitir activar con Enter.
            controlTema.addEventListener('keydown', (evento) => {
                if (evento.key === 'Enter') {
                    evento.preventDefault();
                    controlTema.click();
                }
            });
        }

        // Título de la página.
        const pageTitle =
            document.body.dataset.pageTitle || 'EcoRuta';

        const titleElement =
            headerContainer.querySelector('#page-title');

        if (titleElement) {
            titleElement.textContent = pageTitle;
        }

        // Enlaces de navegación.
        const homeLink =
            headerContainer.querySelector('[data-link="home"]');

        const contactLink =
            headerContainer.querySelector('[data-link="contact"]');

        const navegacion =
            headerContainer.querySelector('nav');

        if (!isInsidePages && navegacion) {
            navegacion.remove();

            const header =
                headerContainer.querySelector('header');

            if (header) {
                header.classList.add('sin-navegacion');
            }
        }

        if (homeLink) {
            homeLink.href = isInsideExtraPages
                ? '../../index.html'
                : isInsidePages
                    ? '../index.html'
                    : 'index.html';
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
        console.error('Error al cargar la cabecera:', error);
    });


fetch(`${basePath}footer.html`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el pie de página');
        }

        return response.text();
    })
    .then(data => {
        const footerContainer =
            document.getElementById('footer-container');

        if (footerContainer) {
            footerContainer.innerHTML = data;
        }
    })
    .catch(error => {
        console.error('Error al cargar el pie de página:', error);
    });

    
function cargarAvisoCookies() {
    const contenedorExistente =
        document.getElementById('aviso-cookies');

    // Si el aviso ya existe en la página, no duplicarlo.
    if (contenedorExistente) {
        iniciarPreferenciasCookies();
        return;
    }

    fetch(`${basePath}aviso-cookies.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el aviso de cookies');
            }

            return response.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            iniciarPreferenciasCookies();
        })
        .catch(error => {
            console.error('Error al cargar el aviso de cookies:', error);
        });
}

function iniciarPreferenciasCookies() {
    const aviso = document.getElementById('aviso-cookies');

    if (!aviso) return;

    const botonAceptar =
        document.getElementById('aceptar-cookies');

    const botonRechazar =
        document.getElementById('rechazar-cookies');

    const botonGestionar =
        document.getElementById('gestionar-cookies');


    const decisionGuardada =
        localStorage.getItem('decisionCookies');

    aviso.hidden = Boolean(decisionGuardada);

    // Aceptar preferencias opcionales.
    if (botonAceptar) {
        botonAceptar.addEventListener('click', () => {
            localStorage.setItem('decisionCookies', 'aceptar');
            localStorage.setItem('preferenciasOpcionales', 'true');
            localStorage.setItem('guardarAccesibilidad', 'true');

            aviso.hidden = true;
        });
    }


    if (botonRechazar) {
        botonRechazar.addEventListener('click', () => {
            localStorage.setItem('decisionCookies', 'rechazar');
            localStorage.setItem('preferenciasOpcionales', 'false');
            localStorage.setItem('guardarAccesibilidad', 'false');
            localStorage.setItem('guardarIdioma', 'false');

            localStorage.removeItem('tema');
            localStorage.removeItem('contrasteAlto');
            localStorage.removeItem('tamanoTexto');

            aviso.hidden = true;
        });
    }

    // Abrir el panel de gestión.
    if (botonGestionar) {
        botonGestionar.addEventListener('click', () => {
            let panel =
                document.getElementById('panel-preferencias');

            // Crear el panel una sola vez.
            if (!panel) {
                panel = document.createElement('section');

                panel.id = 'panel-preferencias';
                panel.setAttribute('role', 'dialog');
                panel.setAttribute(
                    'aria-labelledby',
                    'titulo-preferencias'
                );

                panel.innerHTML = `
                    <h2 id="titulo-preferencias">
                        Gestionar preferencias
                    </h2>

                    <p>
                        Elige qué preferencias deseas guardar
                        en este navegador.
                    </p>

                    <label>
                        <input
                            type="checkbox"
                            id="preferencia-accesibilidad"
                        >
                        Recordar preferencias de accesibilidad
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            id="preferencia-idioma"
                        >
                        Recordar preferencia de idioma
                    </label>

                    <div class="botones-cookies">
                        <button
                            type="button"
                            id="guardar-preferencias"
                        >
                            Guardar preferencias
                        </button>

                        <button
                            type="button"
                            id="cerrar-preferencias"
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            id="revocar-preferencias"
                        >
                            Revocar preferencias
                        </button>
                    </div>
                `;

                aviso.appendChild(panel);
            }

            const accesibilidad =
                document.getElementById('preferencia-accesibilidad');

            const idioma =
                document.getElementById('preferencia-idioma');

            accesibilidad.checked =
                localStorage.getItem('guardarAccesibilidad') !== 'false';

            idioma.checked =
                localStorage.getItem('guardarIdioma') === 'true';

            panel.hidden = false;

            document.getElementById('guardar-preferencias').onclick = () => {
                const guardarAccesibilidad = accesibilidad.checked;
                const guardarIdioma = idioma.checked;

                localStorage.setItem(
                    'guardarAccesibilidad',
                    String(guardarAccesibilidad)
                );

                localStorage.setItem(
                    'guardarIdioma',
                    String(guardarIdioma)
                );

                localStorage.setItem(
                    'decisionCookies',
                    'personalizada'
                );

                localStorage.setItem(
                    'preferenciasOpcionales',
                    String(guardarAccesibilidad || guardarIdioma)
                );

                if (!guardarAccesibilidad) {
                    localStorage.removeItem('tema');
                    localStorage.removeItem('contrasteAlto');
                    localStorage.removeItem('tamanoTexto');

                    document.body.classList.remove(
                        'modo-oscuro',
                        'alto-contraste',
                        'texto-pequeno',
                        'texto-normal',
                        'texto-grande',
                        'texto-muy-grande'
                    );

                    document.body.classList.add('texto-normal');

                    const selector =
                        document.getElementById('tamano-texto');

                    if (selector) selector.value = 'normal';

                    const tema =
                        document.getElementById('btn-tema');

                    if (tema) tema.checked = false;

                    const contraste =
                        document.getElementById('contraste-alto');

                    if (contraste) contraste.checked = false;
                }

                panel.hidden = true;
                aviso.hidden = true;
            };

            document.getElementById('cerrar-preferencias').onclick = () => {
                panel.hidden = true;
            };

            document.getElementById('revocar-preferencias').onclick = () => {
                localStorage.removeItem('decisionCookies');
                localStorage.removeItem('preferenciasOpcionales');
                localStorage.removeItem('guardarAccesibilidad');
                localStorage.removeItem('guardarIdioma');

                localStorage.removeItem('tema');
                localStorage.removeItem('contrasteAlto');
                localStorage.removeItem('tamanoTexto');

                panel.hidden = true;
                aviso.hidden = false;
            };
        });
    }
}


function inyectarModuloEmergencias() {
    if (document.getElementById('btn-emergencia-flotante')) return;

    const emergenciaHTML = `
        <button
            id="btn-emergencia-flotante"
            class="btn-emergencia-sticky"
            type="button"
            aria-label="Abrir contactos de emergencia"
            aria-expanded="false"
            aria-controls="panel-emergencia"
        >
            <span class="texto-btn">Emergencia</span>
        </button>

        <section
            id="panel-emergencia"
            class="panel-emergencia oculto"
            tabindex="-1"
            aria-labelledby="titulo-emergencia"
        >
            <h3 id="titulo-emergencia">Contactos de emergencia</h3>

            <p class="aviso-medico">
                Directorio informativo de teléfonos públicos de emergencia.
                EcoRutas no garantiza la atención directa de estos servicios.
            </p>

            <ul>
                <li>
                    <span>Carabineros</span>
                    <a href="tel:133" aria-label="Llamar a Carabineros al 133">133</a>
                    <button type="button" class="btn-copiar-telefono"
                        data-telefono="133">Copiar</button>
                </li>
                <li>
                    <span>Ambulancia (SAMU)</span>
                    <a href="tel:131" aria-label="Llamar a SAMU al 131">131</a>
                    <button type="button" class="btn-copiar-telefono"
                        data-telefono="131">Copiar</button>
                </li>
                <li>
                    <span>Bomberos</span>
                    <a href="tel:132" aria-label="Llamar a Bomberos al 132">132</a>
                    <button type="button" class="btn-copiar-telefono"
                        data-telefono="132">Copiar</button>
                </li>
                <li>
                    <span>CONAF (incendios forestales)</span>
                    <a href="tel:130" aria-label="Llamar a CONAF al 130">130</a>
                    <button type="button" class="btn-copiar-telefono"
                        data-telefono="130">Copiar</button>
                </li>
            </ul>

            <p id="estado-copia-telefono" role="status" aria-live="polite"></p>

            <button id="cerrar-panel-emergencia" type="button">
                Cerrar
            </button>
        </section>
    `;

    document.body.insertAdjacentHTML('beforeend', emergenciaHTML);

    const boton =
        document.getElementById('btn-emergencia-flotante');

    const panel =
        document.getElementById('panel-emergencia');

    const botonCerrar =
        document.getElementById('cerrar-panel-emergencia');

    const estadoCopia =
        document.getElementById('estado-copia-telefono');

    boton.addEventListener('click', () => {
        const abierto =
            boton.getAttribute('aria-expanded') === 'true';

        boton.setAttribute('aria-expanded', String(!abierto));
        panel.classList.toggle('oculto', abierto);

        if (!abierto) {
            panel.focus();
        }
    });

    botonCerrar.addEventListener('click', () => {
        panel.classList.add('oculto');
        boton.setAttribute('aria-expanded', 'false');
        boton.focus();
    });

    panel.querySelectorAll('.btn-copiar-telefono').forEach(botonCopiar => {
        botonCopiar.addEventListener('click', async () => {
            const telefono = botonCopiar.dataset.telefono;

            try {
                await navigator.clipboard.writeText(telefono);
                estadoCopia.textContent = `Número ${telefono} copiado.`;
            } catch (error) {
                estadoCopia.textContent =
                    'No se pudo copiar automáticamente. Selecciona el número para copiarlo.';
            }
        });
    });

    const esComputador = window.matchMedia(
        '(hover: hover) and (pointer: fine)'
    );

    function actualizarBotonesCopiar() {
        panel.querySelectorAll('.btn-copiar-telefono').forEach(botonCopiar => {
            botonCopiar.hidden = !esComputador.matches;
        });
    }

    actualizarBotonesCopiar();
    esComputador.addEventListener('change', actualizarBotonesCopiar);
}


function iniciarModulos() {
    cargarAvisoCookies();
    inyectarModuloEmergencias();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarModulos);
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

  let mensajeEstado = contenedor.querySelector('.mensaje-estado');
  if (!mensajeEstado) {
    mensajeEstado = document.createElement('p');
    mensajeEstado.className = 'mensaje-estado mensaje-cargando';
    contenedor.appendChild(mensajeEstado);
  }

  mensajeEstado.classList.remove('oculto', 'mensaje-error');
  mensajeEstado.classList.add('mensaje-cargando');
  mensajeEstado.textContent = 'Cargando emprendedores...';

  const apiUrl = 'https://6ad90babf89c5702ed9a6190.mockapi.io/emprendedores';

  try {
    const respuesta = await fetch(apiUrl);

    if (!respuesta.ok) {
      throw new Error(`HTTP Error: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    contenedor.innerHTML = '';

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

    if (publicados.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-info">No hay emprendedores disponibles para esta ubicación.</p>';
        return;
    }

    // 4. Dibujar las tarjetas dinámicamente en el DOM
    publicados.forEach(emp => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'carta-ciudad';

      tarjeta.innerHTML = `
        <h3>${emp.nombre}</h3>
        <p><strong>Ubicación:</strong> ${emp.ubicacion}</p>
        <p>${emp.descripcion}</p>
        <p><strong>Puntaje Sustentable:</strong> ${emp.puntajeSustentable} / 12</p>
        <div class="contacto-emprendedor" style="margin-top: 0.8rem; text-align: center;">
          <a href="https://wa.me/${emp.whatsapp.replace(/\+|\s/g, '')}" target="_blank" class="btn-ciudad">WhatsApp</a>
          <p style="font-size: 0.8rem; margin-top: 0.4rem; color: #4a5568;">${emp.redesSociales}</p>
        </div>
      `;

      contenedor.appendChild(tarjeta);
    });

  } catch (error) {
    // 5. Manejo amigable con try/catch sin romper el sitio
    console.error('Error al cargar la lista de emprendedores:', error);

    contenedor.innerHTML = '';
    const parrafoError = document.createElement('p');
    parrafoError.classList.add('mensaje-error');
    parrafoError.textContent = 'No se pudieron cargar los emprendedores en este momento. Por favor, intenta nuevamente más tarde.';

    contenedor.appendChild(parrafoError);
  }
}

// Ejecutar módulos y catálogo al cargar el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        iniciarModulos();
        cargarEmprendedoresPublicados();
    });
} else {
    iniciarModulos();
    cargarEmprendedoresPublicados();
}