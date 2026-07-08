let vetor = [10, -5, 8, -2, 15, -1]
let numerosNegativos = []
function substituirNegativos(vetor) {
    for (let i = 0; i < vetor.length; i++) {
        if (vetor[i] < 0) {
            numerosNegativos.push(vetor[i])

        }
    }
    return numerosNegativos.length
}
console.log(substituirNegativos(vetor));
