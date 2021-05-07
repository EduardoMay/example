const fa = require("fs")

const existFile = () => {
  return fa.existsSync("/var/www/html/example/index.js")
}

console.log(existFile());