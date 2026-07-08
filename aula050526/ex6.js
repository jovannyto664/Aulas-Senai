let producao = [40, 55, 30, 60]
let total = 0
let media = 0
for (let i = 0; i < producao.length; i++) {
    total = total + producao[i]
    media = total / producao.length
}
console.log(total);
console.log(media);

