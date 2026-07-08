function maior(num1, num2) {
    if (num1 > num2) {
        return console.log("o numero " + num1 + " é maior que o numero " + num2);
    } else if (num2 > num1) {
        return console.log("o numero " + num2 + " é maior que o numero " + num1);
    } else {
        return console.log("os numeros são iguais")
    }
}
maior(10, 20)