
import { useEffect, useRef, useState } from 'react';

const tamanos = ['pequeno', 'normal', 'grande', 'muy-grande'];

function MenuLateral() {
    const [abierto, setAbierto] = useState(false);
    const [tamano, setTamano] = useState(() => {
        return localStorage.getItem('guardarAccesibilidad') === 'true'
            ? localStorage.getItem('tamanoTexto') || 'normal'
            : 'normal';
    });
    const [contraste, setContraste] = useState(
        () => localStorage.getItem('guardarAccesibilidad') === 'true' &&
            localStorage.getItem('contrasteAlto') === 'true'
    );
    const [oscuro, setOscuro] = useState(
        () => localStorage.getItem('guardarAccesibilidad') === 'true' &&
            localStorage.getItem('tema') === 'oscuro'
    );

    const botonAbrir = useRef<HTMLButtonElement>(null);
    const botonCerrar = useRef<HTMLButtonElement>(null);
    const panel = useRef<HTMLElement>(null);
    const focoInicializado = useRef(false);

    useEffect(() => {
        document.documentElement.classList.remove(
            ...tamanos.map(t => `texto-${t}`)
        );
        document.documentElement.classList.add(`texto-${tamano}`);
    }, [tamano]);

    useEffect(() => {
        document.body.classList.toggle('alto-contraste', contraste);
        document.body.classList.toggle('modo-oscuro', oscuro);
    }, [contraste, oscuro]);

    useEffect(() => {
        if (localStorage.getItem('guardarAccesibilidad') === 'false') return;

        localStorage.setItem('tamanoTexto', tamano);
        localStorage.setItem('contrasteAlto', String(contraste));
        localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro');
    }, [tamano, contraste, oscuro]);

    useEffect(() => {
        if (abierto) {
            botonCerrar.current?.focus();
        } else if (focoInicializado.current) {
            botonAbrir.current?.focus();
        }

        focoInicializado.current = true;
    }, [abierto]);

    useEffect(() => {
        if (!abierto) return;

        function controlarTeclado(evento: KeyboardEvent) {
            if (evento.key === 'Escape') {
                setAbierto(false);
                return;
            }

            if (evento.key === 'Tab' && panel.current) {
                const elementos = Array.from(
                    panel.current.querySelectorAll<HTMLElement>(
                        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled])'
                    )
                ).filter(elemento => elemento.offsetParent !== null);

                if (!elementos.length) {
                    evento.preventDefault();
                    return;
                }

                const primero = elementos[0];
                const ultimo = elementos[elementos.length - 1];

                if (evento.shiftKey && document.activeElement === primero) {
                    evento.preventDefault();
                    ultimo.focus();
                } else if (!evento.shiftKey && document.activeElement === ultimo) {
                    evento.preventDefault();
                    primero.focus();
                }
            }
        }

        document.addEventListener('keydown', controlarTeclado);
        return () => document.removeEventListener('keydown', controlarTeclado);
    }, [abierto]);

    return (
        <>
            <button
                ref={botonAbrir}
                id="btn-menu-lateral"
                type="button"
                aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={abierto}
                aria-controls="menu-accesibilidad"
                onClick={() => setAbierto(true)}
            >
                <span aria-hidden="true">☰</span>
            </button>

            <div
                id="fondo-menu-lateral"
                hidden={!abierto}
                onClick={() => setAbierto(false)}
            />

            <aside
                ref={panel}
                id="menu-accesibilidad"
                className={abierto ? 'abierto' : ''}
                aria-label="Menú principal"
                aria-hidden={!abierto}
                aria-modal="true"
                role="dialog"
                hidden={!abierto}
            >
                <button
                    ref={botonCerrar}
                    id="btn-cerrar-menu"
                    type="button"
                    aria-label="Cerrar menú"
                    onClick={() => setAbierto(false)}
                >
                    ×
                </button>

                <section className="seccion-contactos">
                    <h2>Contactos</h2>

                    <p>Correo: pendiente de confirmar</p>
                    <p>Teléfono: pendiente de confirmar</p>

                    <div className="redes-menu">
                        <a href="https://www.facebook.com/profile.php?id=61596273801992"
                            target="_blank" rel="noopener noreferrer">
                            Facebook
                        </a>
                        <a href="https://www.instagram.com/ecoruta2026/"
                            target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                        <a href="https://x.com/EcoRuta2026"
                            target="_blank" rel="noopener noreferrer">
                            X
                        </a>
                    </div>
                </section>

                <section className="seccion-accesibilidad">
                    <h2>Accesibilidad</h2>

                    <fieldset className="grupo-tamano-texto">
                        <legend>Tamaño del texto</legend>
                        <div className="botones-tamano">
                            {tamanos.map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    className="btn-tamano"
                                    aria-pressed={tamano === t}
                                    onClick={() => setTamano(t)}
                                >
                                    {t === 'muy-grande'
                                        ? 'Muy grande'
                                        : t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    <label>
                        <input
                            type="checkbox"
                            checked={contraste}
                            onChange={e => setContraste(e.target.checked)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setContraste(valor => !valor);
                                }
                            }}
                        />
                        Alto contraste
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={oscuro}
                            onChange={e => setOscuro(e.target.checked)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setOscuro(valor => !valor);
                                }
                            }}
                        />
                        Modo oscuro
                    </label>
                </section>
            </aside>
        </>
    );
}

export default MenuLateral;
