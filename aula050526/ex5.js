let pings = [85, 12, 45, 150, 22]
let best = Infinity; // melhor ping possível é infinito, ou seja, qualquer ping encontrado será melhor que isso (nao entendi a explicação kkkkkkkkkkkkkkkk, mas acho q entendi o motivo, antes eu estava colocando 0 e nao estava dando certo "tive q pedir arrego pro copilot ;-;")
for (let i = 0; i < pings.length; i++) {
    if (pings[i] < best) {
        best = pings[i];
    }
}
console.log(best);
