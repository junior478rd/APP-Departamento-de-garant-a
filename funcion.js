funcion 
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
  const tabla = document.getElementById("inventario").getElementsByTagName('tbody')[0];
  const nuevaFila = tabla.insertRow();

  const datos = [
    document.getElementById("fechaEntrada").value,
    document.getElementById("equipo").value,
    document.getElementById("imel").value,
    document.getElementById("problema").value,
    document.getElementById("cliente").value,
    document.getElementById("cedula").value,
    document.getElementById("tecnico").value,
    document.getElementById("fechaSalida").value
  ];

  datos.forEach(dato => {
    const celda = nuevaFila.insertCell();
    celda.textContent = dato;
  });

  const celdaAccion = nuevaFila.insertCell();
  const boton = document.createElement("button");
  boton.textContent = "Eliminar";
  boton.className = "eliminar";
  boton.onclick = function() {
    eliminarFila(boton);
  };
  celdaAccion.appendChild(boton);

  document.querySelectorAll(".formulario input").forEach(input => input.value = "");
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

  fetch("guardar.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })
  .then(response => response.json())
  .then(res => {
    if (res.status === "ok") {
      alert("Registro guardado correctamente");
      location.reload();
    } else {
      alert("Error al guardar: " + res.mensaje);
    }
  });
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
      location.reload(); // Recarga para ver el nuevo registro (puedes mejorarlo con JS dinámico)
    } else {
      alert('Error al guardar: ' + resultado.mensaje);
    }
  })
  .catch(error => {
    alert('Error en la conexión con el servidor');
    console.error(error);
  });
}
