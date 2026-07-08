const precosBrutos = [19.9, 100, 45.55, 4.99];
let precosBonitos = precosBrutos.map((numeros)=>{
    return (`R$ ${numeros.toFixed(2)}`)})

console.log(precosBonitos)
/* precosBonitos.forEach((num)=>{
    console.log("R$",num);
    }) */