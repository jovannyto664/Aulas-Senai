function autencicar(senha) {
    if (senha === "1234") {
        return console.log("acesso liberado")
    } else {
        return console.log("Acesso Negado");
    }
}
autencicar("1234")