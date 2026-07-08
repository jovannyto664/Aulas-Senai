let nomes = [
    "Ana",
    "Bruno",
    "Carlos",
    "Daniela",
    "Eduardo",
    "Fernanda",
    "Gabriel",
    "Helena",
    "Igor",
    "Juliana",
    "Kaique",
    "Larissa",
    "Marcos",
    "Natália",
    "Otávio",
    "Patrícia",
    "Rafael",
    "Sabrina",
    "Thiago",
    "Vanessa"
];
function procurarNome(a) {
    if (nomes.includes(a)) {
        return console.log(a + "foi encontrada")
    }
    else {
        return console.log("não foi possivel localizar essa pessoa na lista");
    }
}
procurarNome("peppa")