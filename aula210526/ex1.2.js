const movimentacoes = [1500, -350, 200, -800, -150];
let saldoFinal = 0; // Utilize esta variável externa para acumular o valor

movimentacoes.forEach((num)=> {
    if(num>=0){
        saldoFinal=+ num
    } else{
        saldoFinal=-num
    }
})
console.log("Superávit de",saldoFinal);


/*function calculoSaldoFinal(sal){
    sal.forEach(element => {
        let fin = 0
        if (sal)
        fin = element + fin
        console.log(fin)
        return fin
    } 
);
}
saldoFinal = calculoSaldoFinal(movimentacoes)
console.log(calculoSaldoFinal(movimentacoes));
console.log(saldoFinal);

movimentacoes.forEach(() => {})*/