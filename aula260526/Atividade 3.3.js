const telelimpo = telefoneFormatado.replaceAll(/())/g,"").replaceAll(/-/g,"").replaceAll(/\s/g,"");
console.log(telelimpo);




const telefoneLimpo = telefoneFormatado.replace(/\D/g, "");
console.log(telefoneLimpo);
/*const telefoneFormatado = "(47) 98888-5432";

const telelimpo = telefoneFormatado.replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")

console.log(telelimpo);*/


/*const telelimpo = telefoneFormatado
  .replaceAll("(", "")
  .replaceAll(")", "")
  .replaceAll("-", "")
  .replaceAll(" ", "");

console.log(telelimpo); // 47988885432
*/