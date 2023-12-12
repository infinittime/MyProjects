let contadorRecuadros = 0;

function agregarNuevoTipo() {
    contadorRecuadros++;

    const recuadro = document.createElement('div');
    recuadro.className = 'recuadro';
    recuadro.id = `recuadro${contadorRecuadros}`;

    recuadro.innerHTML = `
        <label for="tituloVehiculo">Título del Vehículo:</label>
        <input type="text" id="tituloVehiculo${contadorRecuadros}" />

        <br />

        <label for="cobroDiaNormal">Cobro por Día Normal:</label>
        <input type="number" id="cobroDiaNormal${contadorRecuadros}" />

        <br />

        <label for="cobroDiaFestivo">Cobro por Día Festivo:</label>
        <input type="number" id="cobroDiaFestivo${contadorRecuadros}" />

        <br />

        <button onclick="guardarRecuadro(${contadorRecuadros})">Guardar</button>
        <button onclick="cancelarRecuadro(${contadorRecuadros})">Cancelar</button>
        <div id="detalleRecuadro${contadorRecuadros}"></div>
    `;

    document.getElementById('contenedorRecuadros').appendChild(recuadro);
}

function guardarRecuadro(numeroRecuadro) {
    const tituloVehiculo = document.getElementById(`tituloVehiculo${numeroRecuadro}`).value;
    const cobroDiaNormal = document.getElementById(`cobroDiaNormal${numeroRecuadro}`).value;
    const cobroDiaFestivo = document.getElementById(`cobroDiaFestivo${numeroRecuadro}`).value;

    const informacionRecuadro = {
        tituloVehiculo,
        cobroDiaNormal,
        cobroDiaFestivo,
    };

    mostrarInformacionRecuadro(numeroRecuadro, informacionRecuadro);

    const tiposGuardados = JSON.parse(localStorage.getItem('tipos')) || [];
    tiposGuardados.push(informacionRecuadro);
    localStorage.setItem('tipos', JSON.stringify(tiposGuardados));
}

function cancelarRecuadro(numeroRecuadro) {
    document.getElementById(`recuadro${numeroRecuadro}`).style.display = 'none';
}

function mostrarInformacionRecuadro(numeroRecuadro, informacionRecuadro) {
    const detalleRecuadro = document.getElementById(`detalleRecuadro${numeroRecuadro}`);
    detalleRecuadro.innerHTML = `
        <strong>Título del Vehículo:</strong> ${informacionRecuadro.tituloVehiculo}
        <br /><br />
        <strong>Cobro por Día Normal:</strong> ${informacionRecuadro.cobroDiaNormal}
        <br />
        <strong>Cobro por Día Festivo:</strong> ${informacionRecuadro.cobroDiaFestivo}
    `;
}