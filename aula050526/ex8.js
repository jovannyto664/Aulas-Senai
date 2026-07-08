let temp = [22, 28, 35, 19, 42, 25]
let total = 0
let media = 0
let maior = 0
for (let i = 0; i < temp.length; i++) {
    total = total + temp[i]
    maior = Math.max(maior, temp[i])
    media = total / temp.length

}
console.log(total);
console.log(media);
console.log(maior);
//temp.includes(42) ? console.log("a temperatuda critica foi atingida") : null
//console.log("a temperatuda critica foi atingida") ? temp.includes(42) : null
console.log(temp.includes(42) ? "a temperatura crítica de 42°C foi atingida" : "");
