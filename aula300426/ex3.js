let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let pares = []
for (let i = 0; i <= 10; i++) {
    numeros[i] % 2 == 0 ? pares.push(numeros[i]) : null
}
console.log("números pares:", pares)
//copilot ativou quando fui digitar e descobri o ? e o : pra abreviar o if :D