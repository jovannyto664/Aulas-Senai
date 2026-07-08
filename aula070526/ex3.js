function calcularDesconto(preco, desconto) {
    // 1. Calcule o valor final aqui

    let final = preco - (preco * desconto)
    return final
    // 2. Use o 'return' para enviar o valor de volta
}
console.log(calcularDesconto(4731, 0.22));
