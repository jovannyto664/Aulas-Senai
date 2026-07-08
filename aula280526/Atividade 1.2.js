/*const date = date("2026-05-27")
console.log(data.getDay());*/
const data = new Date("2026-05-27");
const dias = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo"
];
console.log(dias[data.getDay()]);
