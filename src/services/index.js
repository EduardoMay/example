const fs = require("fs");
const { exec } = require("child_process");
const dns = require("dns");

const PATH_FILE_WPA_SUPPLICANT = "/etc/wpa_supplicant/wpa_supplicant.conf";

const contentFile = (ssid, password) => {
  return `
  ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
  update_config=1
  country=MX

  network={
      ssid="${ssid}"
      psk="${password}"
      key_mgmt=WPA-PSK
  }
  `;
};

const init = (ssid, password) => {
  const existsFile = fs.existsSync("/var/www/html/example/index.js");

  if (existsFile) {
    // Eliminar archivo
    try {
      fs.unlink(PATH_FILE_WPA_SUPPLICANT);

      console.log("Archivo eliminado");
      // Volver a crear el archivo wpa_supplicant.conf
    } catch (error) {
      console.error("Error al eliminar archivo", error);
    }
  } else {
    // Crear archivo wpa_supplicant
    fs.writeFile(
      PATH_FILE_WPA_SUPPLICANT,
      contentFile(ssid, password),
      (error) => {
        if (error) console.log(error);
        else {
          console.log("El archivo fue creado");
          // pegar el archivo en la ruta especifica
          // fs.copyFileSync('./archivo1.txt', `${process.env.PROGRAMFILES}\\..\\Users\\SuperAdmin\\Documents\\destino.txt`);

          // Correr comando en bash para reiniciar servicio de autohotsapd
          exec("git push origin master", (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              // Verificar la conexión a internet
              dns.lookup("example.org", (err, address, family) => {
                // Si hay internet
                if (!err) {
                  // Ejecutar comando wget para obtener los archivos actualizados
                }
              });
              return;
            }
            console.log(`stdout: ${stdout}`);
          });
        }
      }
    );
  }
};

init("Totalplay-889D", "_r,i{&wXA^9F");
