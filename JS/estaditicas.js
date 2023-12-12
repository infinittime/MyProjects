function calcularEstadisticas() {
    // Obtener la lista completa de vehículos desde el localStorage
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Filtrar vehículos para el día actual
    const vehiculosHoy = registros.filter(registro => esMismoDia(registro.fechaHoraRegistro, fechaActual));

    // Filtrar vehículos para el mes actual
    const vehiculosEsteMes = registros.filter(registro => esMismoMes(registro.fechaHoraRegistro, fechaActual));

    // Filtrar vehículos para el año actual
    const vehiculosEsteAnio = registros.filter(registro => esMismoAnio(registro.fechaHoraRegistro, fechaActual));

    // Calcular estadísticas y llenar contenedores
    const estadisticasHoy = calcularEstadisticasPorFecha(vehiculosHoy);
    llenarContenedor('estadisticasHoy', estadisticasHoy);

    const estadisticasEsteMes = calcularEstadisticasPorFecha(vehiculosEsteMes);
    llenarContenedor('estadisticasMes', estadisticasEsteMes);

    const estadisticasEsteAnio = calcularEstadisticasPorFecha(vehiculosEsteAnio);
    llenarContenedor('estadisticasAnio', estadisticasEsteAnio);

    // Crear los gráficos
    crearGrafico('graficoHoy', estadisticasHoy);
    crearGrafico('graficoMes', estadisticasEsteMes);
    crearGrafico('graficoAnio', estadisticasEsteAnio);
}

function llenarContenedor(idContenedor, estadisticas) {
    // Llenar el contenedor con las estadísticas
    document.getElementById(idContenedor).innerText = `Dinero: $${estadisticas.dinero}, Vehículos: ${estadisticas.vehiculos}`;
}

function calcularEstadisticasPorFecha(vehiculos) {
    // Realizar cálculos para obtener estadísticas (puedes ajustar según tus necesidades)
    const dineroRecaudado = calcularDineroRecaudado(vehiculos);
    const cantidadVehiculos = vehiculos.length;

    return {
        dinero: dineroRecaudado.toFixed(2),
        vehiculos: cantidadVehiculos
    };
}

function calcularDineroRecaudado(vehiculos) {
    // Puedes ajustar esto según tu lógica específica de cálculo de dinero recaudado
    // En este ejemplo, asumimos una tarifa fija por vehículo
    const tarifaPorVehiculo = 10;
    return vehiculos.length * tarifaPorVehiculo;
}

// Funciones auxiliares para comparar fechas
function esMismoDia(fecha1, fecha2) {
    return fecha1.getDate() === fecha2.getDate() &&
        fecha1.getMonth() === fecha2.getMonth() &&
        fecha1.getFullYear() === fecha2.getFullYear();
}

function esMismoMes(fecha1, fecha2) {
    return fecha1.getMonth() === fecha2.getMonth() &&
        fecha1.getFullYear() === fecha2.getFullYear();
}

function esMismoAnio(fecha1, fecha2) {
    return fecha1.getFullYear() === fecha2.getFullYear();
}

function crearGrafico(idCanvas, estadisticas) {
    const ctx = document.getElementById(idCanvas).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Dinero Recaudado', 'Vehículos'],
            datasets: [{
                label: 'Estadísticas',
                data: [parseFloat(estadisticas.dinero), estadisticas.vehiculos],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}