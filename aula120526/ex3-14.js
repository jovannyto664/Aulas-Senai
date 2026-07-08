let produtos = ["teclado", "mouse", "monitor"]
function preco(produto) {
    if (produto === "teclado") {
        console.log("R$ 100");
    } else if (produto === "mouse") {
        console.log("R$ 50");
    } else if (produto === "monitor") {
        console.log("R$ 800");
    } else {
        console.log("produto não encontrado");
    }
}
preco("mouse")