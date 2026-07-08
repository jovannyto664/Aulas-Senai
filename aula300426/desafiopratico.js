let estoque = ["Banana", "Maçã", "Pêra", "Maçã", "Uva"]
let promocao = []
for (let i = 0; i < estoque.length; i++) {
    estoque[i] == "Maçã" ? promocao.push(estoque[i]) && estoque.pop() : null
}
console.log(estoque);
console.log(promocao);

