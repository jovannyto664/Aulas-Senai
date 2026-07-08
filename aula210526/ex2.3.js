const clientes = [
    { nome: "Lucas", mensalidade: 50 },
    { nome: "Beatriz", mensalidade: 40 }
];
const clientes2 = clientes.map((af) => ({
    nome: af.nome,
    mensalidade: af.mensalidade * 0.80,
    descontoAplicado: true
}));
console.log(clientes2);