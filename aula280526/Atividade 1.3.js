
/*function verificarMaioridade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }}
    log("Idade:", idade);
    if (idade >= 18) {
        log("Maior de idade"); 
    } else {
        log("Menor de idade");
    }
    verificarMaioridade("2008-03-10");*/
function calcularIdade(nascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (
        mes < 0
        ||
        (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
        idade--;
    }
    return console.log(idade);
}
if (calcularIdade(new Date("2008-03-10")) >= 18) {
    console.log("maior de idade");
}
else {
    console.log("menor de idade");
}
