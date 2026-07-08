let vendas = [250, 480, 120, 900, 610]
let maior = 0
for (let i = 0; i < vendas.length; i++) {
    maior = Math.max(maior, vendas[i])
}
console.log(maior);
