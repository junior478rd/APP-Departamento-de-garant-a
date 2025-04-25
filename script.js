function iniciarSesion() {
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  if (usuario === "felix" && contrasena === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("cargando").style.display = "block";

    setTimeout(() => {
      document.getElementById("cargando").style.display = "none";
      document.getElementById("contenido").style.display = "block";
    }, 2000);
  } else {
    document.getElementById("mensaje").textContent = "Usuario o contraseña incorrecta";
  }
}

function agregarRegistro() {
  const datos = {
    fechaEntrada: document.getElementById("fechaEntrada").value,
    equipo: document.getElementById("equipo").value,
    imel: document.getElementById("imel").value,
    problema: document.getElementById("problema").value,
    cliente: document.getElementById("cliente").value,
    cedula: document.getElementById("cedula").value,
    tecnico: document.getElementById("tecnico").value,
    fechaSalida: document.getElementById("fechaSalida").value
  };

  // Validación básica
  if (Object.values(datos).some(valor => valor.trim() === "")) {
    alert("Por favor completa todos los campos.");
    return;
  }

  fetch('guardar_registro.php', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(resultado => {
    if (resultado.status === 'ok') {
      alert('Registro guardado correctamente');
      location.reload(); // Para actualizar la tabla. Se puede optimizar más adelante.
    } else {
      alert('Error al guardar: ' + resultado.mensaje);
    }
  })
  .catch(error => {
    alert('Error en la conexión con el servidor');
    console.error(error);
  });
}

function eliminarFila(boton) {
  const fila = boton.closest("tr");
  fila.remove();
}

function exportTableToExcel(tableID, filename = '') {
  const downloadLink = document.createElement("a");
  const dataType = 'application/vnd.ms-excel';
  const tableSelect = document.getElementById(tableID);
  const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

  filename = filename ? filename + '.xls' : 'excel_data.xls';
  downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  downloadLink.download = filename;
  downloadLink.click();
}

