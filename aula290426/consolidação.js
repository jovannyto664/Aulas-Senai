let estoque = ['Teclado', 'Mouse', 'Monitor'];
estoque.push('webcam');
let mouse = estoque.indexOf('Mouse')
estoque.splice(1, 1)
estoque.shift()
console.log(estoque)