  <script>
    function iniciarSesion() {
      const user = document.getElementById('usuario').value;
      const pass = document.getElementById('contrasena').value;
      const mensaje = document.getElementById('mensaje');

      const credencialesValidas = [
        { usuario: "admin", contrasena: "1234" },
        { usuario: "felix", contrasena: "1234" },
        { usuario: "emely", contrasena: "1234" },
        { usuario: "oriana", contrasena: "1234" },
        { usuario: "daniel", contrasena: "1234" }
      ];

      const accesoPermitido = credencialesValidas.some(cred => cred.usuario === user && cred.contrasena === pass);

      if (accesoPermitido) {
        document.getElementById('login').style.display = "none";
        document.getElementById('cargando').style.display = "block";
        setTimeout(() => {
          document.getElementById('cargando').style.display = "none";
          document.getElementById('contenido').style.display = "block";
        }, 1000);
      } else {
        mensaje.textContent = "Credenciales incorrectas.";
      }
    }

    function eliminarFila(btn) {
      const fila = btn.closest("tr");
      fila.remove();
    }

    function agregarRegistro() {
      const tabla = document.getElementById('inventario').getElementsByTagName('tbody')[0];
      const fila = tabla.insertRow();

      const campos = ['fechaEntrada', 'equipo', 'imel', 'problema', 'cliente', 'cedula', 'tecnico', 'fechaSalida'];

      campos.forEach(id => {
        const celda = fila.insertCell();
        celda.textContent = document.getElementById(id).value;
      });

      const celdaAccion = fila.insertCell();
      celdaAccion.innerHTML = `<button class="eliminar" onclick="eliminarFila(this)">Eliminar</button>`;

      // Limpia los campos
      campos.forEach(id => document.getElementById(id).value = "");
    }

    function exportTableToExcel(tableID, filename = '') {
      const downloadLink = document.createElement('a');
      const dataType = 'application/vnd.ms-excel';
      const tableSelect = document.getElementById(tableID);
      const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

      filename = filename ? filename + '.xls' : 'excel_data.xls';

      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
      downloadLink.download = filename;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

