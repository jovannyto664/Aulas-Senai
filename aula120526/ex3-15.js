/*let temperaturas = [
    23, 25, 19, 31, 28,
    22, 18, 27, 30, 24,
    21, 26, 17, 29, 32,
    20, 16, 33, 28, 25
];
let max = 0
let min = Infinity
let media = 0
function gerarRelatorio(temp) {
    for (i = 0; i < temperaturas.length; i++) {
        max = Math.max(max, temperaturas[i])
        min = Math.min(min, temperaturas[i])
        media = media + temperaturas[i]
    }
    media = media / temperaturas.length
    console.log(max);
    console.log(min);
    console.log(media);
}
gerarRelatorio()
*/
function gerarRelatorio(temp) {
    let max = temp[0];
    let min = temp[0];
    let media = 0;
    for (i = 0; i < temp.length; i++) {
        max = Math.max(max, temp[i]);
        min = Math.min(min, temp[i]);
        media = media + temp[i];
    }
    media = media / temp.length;
    console.log(max);
    console.log(min);
    console.log(media);
}
gerarRelatorio([25,56,34,13,65,32])