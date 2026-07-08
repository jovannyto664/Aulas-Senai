/*function adicionarDias(date1,diasADD) {
    let dt1 = new Date(date1)
    let add = (diasADD*60*60*24) 
    let res = new Date (dt1 + add)
    return res
}

console.log(adicionarDias("2026-05-27", 10).toLocaleString("pt-BR"));*/


function adicionarDias(date1, diasADD) {
    let dt1 = new Date(date1);
    dt1.setDate(dt1.getDate() + diasADD);
    return dt1;
}

console.log(adicionarDias("2026-05-27", 10));


