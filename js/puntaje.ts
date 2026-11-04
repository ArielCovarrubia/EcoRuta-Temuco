type ValorCriterio = 0 | 1 | 2;
type EstadoPuntaje = 'aprobado' | 'pendiente de revisión' | 'rechazado';

interface CriteriosSustentabilidad {
    impactoAmbiental: ValorCriterio;
    aporteLocal: ValorCriterio;
    relacionNaturaleza: ValorCriterio;
    cultura: ValorCriterio;
    practicasResponsables: ValorCriterio;
    pertinenciaTerritorial: ValorCriterio;
}

interface ResultadoPuntaje {
    total: number;
    estado: EstadoPuntaje;
}

function calcularPuntaje(criterios: CriteriosSustentabilidad): ResultadoPuntaje {
    const total = Object.values(criterios).reduce((suma, valor) => suma + valor, 0);
    let estado: EstadoPuntaje;

    if (total >= 8) {
        estado = 'aprobado';
    } else if (total >= 5) {
        estado = 'pendiente de revisión';
    } else {
        estado = 'rechazado';
    }

    return { total, estado };
}

const formulario = document.querySelector<HTMLFormElement>('#calculadora-puntaje');
const resultado = document.querySelector<HTMLElement>('#resultado');

if (formulario && resultado) {
    formulario.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault();

        const valores = new FormData(formulario);
        const criterios: CriteriosSustentabilidad = {
            impactoAmbiental: Number(valores.get('impactoAmbiental')) as ValorCriterio,
            aporteLocal: Number(valores.get('aporteLocal')) as ValorCriterio,
            relacionNaturaleza: Number(valores.get('relacionNaturaleza')) as ValorCriterio,
            cultura: Number(valores.get('cultura')) as ValorCriterio,
            practicasResponsables: Number(valores.get('practicasResponsables')) as ValorCriterio,
            pertinenciaTerritorial: Number(valores.get('pertinenciaTerritorial')) as ValorCriterio
        };
        const calculo = calcularPuntaje(criterios);
        const requiereRevisionCultural = calculo.estado === 'rechazado' && criterios.cultura === 2;

        resultado.textContent = requiereRevisionCultural
            ? `Puntaje: ${calculo.total}/12. Estado: ${calculo.estado}. Sujeto a revisión del Product Owner.`
            : `Puntaje: ${calculo.total}/12. Estado: ${calculo.estado}.`;
        resultado.classList.remove('estado-aprobado', 'estado-pendiente', 'estado-rechazado');
        resultado.classList.add(`estado-${calculo.estado === 'pendiente de revisión' ? 'pendiente' : calculo.estado}`);
    });
}
