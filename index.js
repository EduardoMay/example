const fs = require("fs")
const { exec } = require("child_process")
const dns = require('dns');

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
  `
}

const generateFile = (ssid, password) => {
  const existsFile = fs.existsSync("/var/www/html/example/index.js")

  if (existsFile) {
    fs.writeFile('./archivo1.txt', 'línea 1\nLínea 2', error => {
      if (error)
        console.log(error);
      else
        console.log('El archivo fue creado');
    });
  } else {
    // Crear archivo wpa_supplicant
    fs.writeFile(`${process.env.PROGRAMFILES}\\..\\Users\\SuperAdmin\\Documents\\destino.txt`, contentFile(ssid, password), error => {
      if (error)
        console.log(error);
      else {
        console.log('El archivo fue creado');
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
            dns.lookup('example.org', (err, address, family) => {
              // Si hay internet
              if (!err) {

              }
            });
            return;
          }
          console.log(`stdout: ${stdout}`);
        });
      }
    });
  }
}

console.log(generateFile());