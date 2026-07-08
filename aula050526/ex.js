let kills = [12, 19, 7, 25, 15];
let bonus = kills.includes(19)
let record = 0
let soma = 0
let media = 0
for (let i = 0; i < kills.length; i++) {
    record = Math.max(record, kills[i])
    /*if(record < kills[i]){ record = kills[i]}    descobri um truquezinho novo :D*/
}
for (let i = 0; i < kills.length; i++) {
    soma = soma + kills[i]
}
media = soma / kills.length
console.log("parabens,você fez 19 kills e ganhou bonus");
console.log("seu record de kills em uma partida foi:", record);
console.log("kills totais:", soma);
console.log("media de kills:", media);




