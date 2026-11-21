
import { useState } from 'react';
import type { Ruta } from '../types/ruta';

interface TarjetaRutaProps {
    ruta: Ruta;
}

function obtenerFavoritos(): number[] {
    try {
        const guardados = localStorage.getItem('favoritos');
        return guardados ? JSON.parse(guardados) : [];
    } catch {
        return [];
    }
}

function TarjetaRuta({ ruta }: TarjetaRutaProps) {
    const [esFavorita, setEsFavorita] = useState(() =>
        obtenerFavoritos().includes(ruta.id)
    );

    function alternarFavorito() {
        const favoritos = obtenerFavoritos();

        let nuevosFavoritos: number[];

        if (favoritos.includes(ruta.id)) {
            nuevosFavoritos = favoritos.filter(id => id !== ruta.id);
        } else {
            nuevosFavoritos = [...favoritos, ruta.id];
        }

        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
        setEsFavorita(!esFavorita);
    }

    return (
        <article className="carta">
            <button
                type="button"
                className={`btn-favorito ${esFavorita ? 'activo' : ''}`}
                onClick={alternarFavorito}
                aria-label={esFavorita
                    ? `Quitar ${ruta.nombre} de favoritos`
                    : `Agregar ${ruta.nombre} a favoritos`}
                aria-pressed={esFavorita}
            >
                {esFavorita ? '♥' : '♡'}
            </button>

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