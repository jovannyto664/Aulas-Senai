const statusPoluido = " AGUARDANDO-APROVACAO-DO-DEPARTAMENTO ";
const statusLimpo = statusPoluido.toLowerCase().trim().replace(/-/g, " ");
console.log(statusLimpo);