import type { Ruta } from '../types/ruta';
import TarjetaRuta from './TarjetaRuta';

interface ListaRutasProps {
    rutas: Ruta[];
}

function ListaRutas({ rutas }: ListaRutasProps) {
    return (
        <section className="cartas-img">
            {rutas.map((ruta) => (
                <TarjetaRuta
                    key={ruta.id}
                    ruta={ruta}
                />
            ))}
        </section>
    );
}

export default ListaRutas;