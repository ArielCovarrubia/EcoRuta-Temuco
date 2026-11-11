
import { useEffect, useState } from 'react';
import { obtenerRutasApi } from './services/rutasService.ts';
import type { Ruta } from './types/ruta.ts';
import ListaRutas from './components/ListaRutas';
import MenuLateral from './components/MenuLateral';

function App() {
    const [rutas, setRutas] = useState<Ruta[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        obtenerRutasApi()
            .then((data) => {
                setRutas(data);
                setCargando(false);
            })
            .catch((err) => {
                console.error('Error al cargar rutas desde la API:', err);
                setError('No fue posible cargar las rutas desde el servidor.');
                setCargando(false);
            });
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

                {!cargando && !error && (
                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '999px',
                            backgroundColor: '#e8f5e9',
                            color: '#1b5e20',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            border: '1px solid #c8e6c9'
                        }}>
                            <span style={{ fontSize: '0.75rem' }}>🟢</span> API Conectada: {rutas.length} rutas cargadas
                        </span>
                    </div>
                )}

                {cargando && (
                    <p role="status" style={{ fontStyle: 'italic', color: '#666' }}>
                        Cargando rutas desde la API...
                    </p>
                )}

                {error && (
                    <p role="alert" style={{ color: '#d32f2f' }}>
                        {error}
                    </p>
                )}

                {!cargando && !error && <ListaRutas rutas={rutas} />}
            </main>
        </>
    );
}

export default App;
