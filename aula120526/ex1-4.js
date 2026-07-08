function saudacao(hora) {
    if (hora < 12) {
        return console.log("bom dia");
    } else if (hora < 18) {
        return console.log("boa tarde")
    } else {
        return console.log("boa noite")
    }
}
saudacao(10)