let inventario = ["Escudo de Madeira", "Poção Simples", "Espada Curta", "Poção Simples", "Poção Simples", "Arco Longo", "Poção Simples", "Amuleto Antigo", "Capa de Couro", "Poção Simples", "Botas de Ferro", "Poção Simples", "Tocha", "Poção Simples", "Luvas de Seda", "Poção Simples", "Escudo de Bronze", "Poção Simples", "Poção Simples", "Capacete de Malha", "Poção Simples", "Machado de Guerra", "Poção Simples", "Anel de Prata"];
for (let i = 0; i < inventario.length; i++) {
    inventario[i] == "Poção Simples" ? inventario.splice(i, 1, "Poção Rara") : null
}

console.log(inventario);