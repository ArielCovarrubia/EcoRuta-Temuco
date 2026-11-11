
import { useEffect, useState } from 'react';
import { obtenerRutasApi } from './services/rutasService.ts';
import type { Ruta } from './types/ruta.ts';
import ListaRutas from './components/ListaRutas';
import MenuLateral from './components/MenuLateral';
import { FormularioInscripcion } from './components/FormularioInscripcion';

function App() {
    const [rutas, setRutas] = useState<Ruta[]>([]);
    const [origen, setOrigen] = useState<'api' | 'respaldo' | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        obtenerRutasApi()
            .then(({ rutas: data, origen: source }) => {
                if (!isMounted) return;
                setRutas(data);
                setOrigen(source);
                setCargando(false);
            })
            .catch((err) => {
                if (!isMounted) return;
                console.error('Error al cargar rutas desde la API:', err);
                setError('No fue posible cargar las rutas desde el servidor.');
                setCargando(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            <header>
                <h1>EcoRuta</h1>
                <MenuLateral />
            </header>

            <main>
                <h2>Rutas de EcoRuta</h2>
                <p>Descubre las rutas disponibles de nuestra plataforma.</p>

                {!cargando && !error && origen && (
                    <div className="contenedor-badge-api">
                        <span className={origen === 'api' ? 'badge-api-conectada' : 'badge-api-respaldo'}>
                            <span aria-hidden="true">{origen === 'api' ? '🟢' : '🟡'}</span>{' '}
                            {origen === 'api'
                                ? `API conectada: ${rutas.length} rutas cargadas`
                                : `Usando respaldo local: ${rutas.length} rutas cargadas`}
                        </span>
                    </div>
                )}

                {cargando && (
                    <p role="status" className="mensaje-cargando-api">
                        Cargando rutas desde la API...
                    </p>
                )}

                {error && (
                    <p role="alert" className="mensaje-error-api">
                        {error}
                    </p>
                )}

                {!cargando && !error && (
                    <>
                        <ListaRutas rutas={rutas} />
                        <section aria-labelledby="seccion-inscripcion-titulo" style={{ marginTop: '2.5rem' }}>
                            <h3 id="seccion-inscripcion-titulo">Inscripción rápida a rutas</h3>
                            <FormularioInscripcion
                                rutas={rutas}
                                rutaIdInicial={rutas[0]?.id}
                                origen={origen}
                            />
                        </section>
                    </>
                )}
            </main>
        </>
    );
}

export default App;
