function iniciarEnlaceRetorno() {
    const enlace = document.getElementById('enlace-retorno');

    if (!enlace) return;
    const urlInicio = new URL('../../index.html', window.location.href).href;
    const referente = document.referrer;


    if (!referente) return;

    let urlAnterior;

    try {
        urlAnterior = new URL(referente);
    } catch (error) {
        return;
    }

    const mismoSitio =
        urlAnterior.origin !== 'null' &&
        urlAnterior.origin === window.location.origin;

    if (!mismoSitio) return;

    const esLaMismaPagina =
        urlAnterior.pathname === window.location.pathname;
        
    enlace.href = esLaMismaPagina ? urlInicio : urlAnterior.href;
    enlace.hidden = false;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarEnlaceRetorno);
} else {
    iniciarEnlaceRetorno();
}