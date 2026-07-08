let continua = true
let contador = 0

while (continua == true) {
    contador++
    if (contador == 3) {
        continua = false
    }
}
console.log("O laço parou no: ", contador)