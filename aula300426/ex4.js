let espera = ["Ana", "Beto", "Caio"]
let aten = []
while (espera.length > 0) {
    aten.push(espera[0])
    console.log(espera[0], "foi atendido");
    espera.shift()
}