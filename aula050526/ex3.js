let precos = [120, 45, 80, 15, 200]
let lista = []
for (let i = 0; i < precos.length; i++) {
    if (precos[i] <= 100) {
        lista.push(precos[i])
    }
}
console.log(lista);

