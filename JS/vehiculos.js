function abrirVentanaRegistrarNuevo() {
    // Cargar opciones de tipo desde localStorage
    const tipos = JSON.parse(localStorage.getItem('tipos')) || [];
    const tipoSelector = document.getElementById('tipoRegistroNuevo');
    
    // Limpiar opciones previas
    tipoSelector.innerHTML = '';

    // Agregar opciones al selector
    tipos.forEach((tipo) => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        tipoSelector.appendChild(option);
    });

    // Mostrar la ventana emergente
    document.getElementById('registroNuevoModal').style.display = 'flex';
}

function cerrarVentanaRegistrarNuevo() {
    // Limpiar campos y cerrar la ventana
    document.getElementById('tipoRegistroNuevo').value = '';
    document.getElementById('placaRegistroNuevo').value = '';
    document.getElementById('descripcionRegistroNuevo').value = '';
    document.getElementById('registroNuevoModal').style.display = 'none';
}

function guardarRegistroNuevo() {
    const tipoVehiculo = document.getElementById('tipoRegistroNuevo').value;
    const placa = document.getElementById('placaRegistroNuevo').value;
    const descripcion = document.getElementById('descripcionRegistroNuevo').value;

    // Validaciones adicionales pueden ir aquí

    // Crear objeto de nuevo registro
    const nuevoRegistro = {
        tipoVehiculo,
        placa,
        descripcion,
        fechaHoraRegistro: new Date()
    };

    // Recuperar registros existentes o crear un nuevo array vacío
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Agregar el nuevo registro al array
    registros.push(nuevoRegistro);

    // Guardar todos los registros en el localStorage
    localStorage.setItem('registros', JSON.stringify(registros));

    alert('Registro Exitoso');

    // Cerrar la ventana emergente y limpiar campos
    cerrarVentanaRegistrarNuevo();

    // Actualizar la lista después de registrar un nuevo vehículo
    actualizarLista();
}

function cancelarRegistroNuevo() {
    // Cerrar la ventana emergente y limpiar campos
    cerrarVentanaRegistrarNuevo();
}

function actualizarLista() {
    const registrosTabla = document.getElementById('registrosTabla');

    // Limpiar la tabla antes de actualizar
    registrosTabla.innerHTML = '';

    // Recuperar registros del localStorage
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Invertir el array para mostrar los registros más nuevos primero
    registros = registros.reverse();

    // Iterar sobre los registros invertidos y agregar a la tabla
    registros.forEach((registro, index) => {
        // Crear una fila para el registro
        const row = registrosTabla.insertRow();

        // Agregar celdas a la fila
        agregarCelda(row, 'Tipo', registro.tipoVehiculo);
        agregarCelda(row, 'Placa', registro.placa);
        agregarCelda(row, 'Descripción', registro.descripcion);
        agregarCelda(row, 'Entrada', registro.fechaHoraRegistro ? formatoFecha(registro.fechaHoraRegistro) : '---');
        agregarCelda(row, 'Salida', registro.fechaHoraSalida ? formatoFecha(registro.fechaHoraSalida) : '---');

        // Agregar botón de Registrar Salida
        const btnRegistrarSalida = document.createElement('button');
        btnRegistrarSalida.textContent = 'Registrar Salida';
        btnRegistrarSalida.addEventListener('click', () => registrarSalida(index));
        agregarCelda(row, 'Registrar Salida', btnRegistrarSalida);

        // Agregar botón de Imprimir Registro
        const btnImprimirRegistro = document.createElement('button');
        btnImprimirRegistro.textContent = 'Imprimir Registro';
        btnImprimirRegistro.addEventListener('click', () => imprimirRegistro(index));
        agregarCelda(row, 'Imprimir Registro', btnImprimirRegistro);
    });
}

function agregarCelda(row, titulo, contenido) {
    // Agregar celda de título
    const cellTitulo = row.insertCell();
    cellTitulo.textContent = titulo;

    // Agregar celda de contenido
    const cellContenido = row.insertCell();
    cellContenido.textContent = contenido;
}

function formatoFecha(fecha) {
    if (fecha instanceof Date && !isNaN(fecha)) {
        const dia = ("0" + fecha.getDate()).slice(-2);
        const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
        const anio = fecha.getFullYear();
        const hora = ("0" + fecha.getHours()).slice(-2);
        const minutos = ("0" + fecha.getMinutes()).slice(-2);
        const segundos = ("0" + fecha.getSeconds()).slice(-2);

        return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
    } else {
        return '---';
    }
}