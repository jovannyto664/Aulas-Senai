function mt(mult){
    return mult*7
}
const multiplicadores = [1, 2, 3, 4, 5];
multiplicadores.forEach((Num) => console.log("7 x",Num,mt(multiplicadores[Num-1])))