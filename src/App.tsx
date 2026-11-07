
import { obtenerRutas } from './services/rutasService';
import ListaRutas from './components/ListaRutas';
import MenuLateral from './components/MenuLateral';

function App() {
    const rutas = obtenerRutas();

    return (
        <>
            <header>
                <h1>EcoRuta</h1>
                <MenuLateral />
            </header>

            <main>
                <h1>Rutas de EcoRuta</h1>
                <p>Descubre las rutas disponibles de nuestra plataforma.</p>

                <ListaRutas rutas={rutas} />
            </main>
        </>
    );
}

export default App;
