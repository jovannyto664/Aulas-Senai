const estoque = [
    { produto: "Teclado Mecânico", quantidade: 15, preco: 250 },
    { produto: "Mouse Gamer", quantidade: 5, preco: 120 },
    { produto: "Monitor 24'", quantidade: 8, preco: 900 }
];
estoque.forEach((spin) => {
    console.log(spin.produto, "Valor em Estoque: R$", (spin.preco * spin.quantidade));
    if (spin.quantidade < 10) {
        console.log("--> ATENÇÃO: Reposição imediata necessária para", spin.produto);
    }
})