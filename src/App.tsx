import { obtenerRutas } from './services/rutasService';
import ListaRutas from './components/ListaRutas';

function App() {
    const rutas = obtenerRutas();

    return (
        <main>
            <h1>Rutas de EcoRuta</h1>
            <p>Descubre las rutas disponibles de nuestra plataforma.</p>

            <ListaRutas rutas={rutas} />
        </main>
    );
}

export default App;