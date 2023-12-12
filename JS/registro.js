function validarCredenciales() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("clave").value;
  
    // Aquí debes comparar las credenciales con las correctas
    if (usuario === "admin" && contrasena === "1234") {
      // Credenciales correctas, redireccionar al HTML deseado
      window.location.href = 'Vehiculos.html';
    } else {
      // Credenciales incorrectas, mostrar alerta
      alert("Usuario o contraseña incorrectos");
    }
  }