let numeros = [
    42, 7, 128, 3, 89,
    256, 14, 67, 91, 5,
    320, 18, 73, 210, 11,
    64, 99, 27, 150, 8
];
function Dobrar() {
    for (let i = 0; i < numeros.length; i++) {
        numeros[i] = numeros[i] * 2
    }
}
Dobrar()
console.log(numeros)