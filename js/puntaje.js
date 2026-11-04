function calcularPuntaje(criterios) {
    const total = Object.values(criterios).reduce((suma, valor) => suma + valor, 0);
    let estado;
    if (total >= 8) {
        estado = 'aprobado';
    } else if (total >= 5) {
        estado = 'pendiente de revisión';
    } else {
        estado = 'rechazado';
    }
    return { total, estado };
}
const formulario = document.querySelector('#calculadora-puntaje');
const resultado = document.querySelector('#resultado');
if (formulario && resultado) {
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        const valores = new FormData(formulario);
        const criterios = {
            impactoAmbiental: Number(valores.get('impactoAmbiental')),
            aporteLocal: Number(valores.get('aporteLocal')),
            relacionNaturaleza: Number(valores.get('relacionNaturaleza')),
            cultura: Number(valores.get('cultura')),
            practicasResponsables: Number(valores.get('practicasResponsables')),
            pertinenciaTerritorial: Number(valores.get('pertinenciaTerritorial'))
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
