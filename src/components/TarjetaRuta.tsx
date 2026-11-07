import type { Ruta } from '../types/ruta';

interface TarjetaRutaProps {
    ruta: Ruta;
}

function TarjetaRuta({ ruta }: TarjetaRutaProps) {
    return (
        <article className="carta">
            <img
                className="ruta-img"
                src={`/${ruta.imagen}`}
                alt={ruta.nombre}
            />

            <div>
                <h3>{ruta.nombre}</h3>
                <p>{ruta.descripcion}</p>
                <p>
                    <strong>Comuna:</strong> {ruta.comuna}
                </p>
                <p>
                    <strong>Dificultad:</strong> {ruta.dificultad}
                </p>
                <p>
                    <strong>Actividad:</strong> {ruta.tipoActividad}
                </p>
            </div>
        </article>
    );
}

export default TarjetaRuta;