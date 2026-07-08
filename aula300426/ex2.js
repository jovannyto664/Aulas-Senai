let mochila = ["Caderno", "Lápis", "Estojo"]
while (mochila[0] == "Caderno") {
    for (let i = mochila.length - 1; i >= 0; i--) {
        console.log("item:", mochila[i]);
        mochila.pop(i);
    }
}