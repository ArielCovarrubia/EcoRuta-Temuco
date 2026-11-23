function iniciarVolverARuta(): void {
    const enlace = document.getElementById('enlace-volver-ruta') as HTMLAnchorElement | null;

    if (!enlace || !document.referrer) return;

    let urlAnterior: URL;

    try {
        urlAnterior = new URL(document.referrer);
    } catch {
        return;
    }

    const mismoSitio =
        urlAnterior.origin !== 'null' &&
        urlAnterior.origin === window.location.origin;

    // enlace.href ya es absoluta: se compara con la página de la comuna.
    const esLaPaginaDeLaComuna =
        urlAnterior.pathname === new URL(enlace.href).pathname;

    if (mismoSitio && esLaPaginaDeLaComuna) {
        enlace.href = urlAnterior.href;
    }
}

iniciarVolverARuta();

// Marca el archivo como módulo para no contaminar el ámbito global.
export {};