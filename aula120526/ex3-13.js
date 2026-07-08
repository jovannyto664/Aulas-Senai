
function filtrarMaioresDeIdade(idades) {
    let maioresDeIdade = [];
    for (let i = 0; i < idades.length; i++) {
        if (idades[i] >= 18) {
            maioresDeIdade.push(idades[i]);
        }
    }
    return maioresDeIdade;
}
console.log(filtrarMaioresDeIdade([12, 18, 25, 14, 30, 11]));
 