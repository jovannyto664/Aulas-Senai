const estado = {
  animais: [
    {
      nome: "Leão",
      habitat: "Savana",
      alimentacao: "Carnívoro"
    },
    {
      nome: "Pinguim",
      habitat: "Regiões geladas",
      alimentacao: "Peixes"
    },
    {
      nome: "Macaco",
      habitat: "Florestas",
      alimentacao: "Onívoro"
    }
  ],
  indiceAtual: 0
};

const nomeAnimal = document.querySelector("#nome-animal");
const habitatAnimal = document.querySelector("#habitat-animal");
const alimentacaoAnimal = document.querySelector("#alimentacao-animal");
const posicao = document.querySelector("#posicao");

const btnAnterior = document.querySelector("#btn-anterior");
const btnProximo = document.querySelector("#btn-proximo");

function renderizar() {
  const animalAtual = estado.animais[estado.indiceAtual];

  nomeAnimal.textContent = animalAtual.nome;
  habitatAnimal.textContent = animalAtual.habitat;
  alimentacaoAnimal.textContent = animalAtual.alimentacao;
  posicao.textContent = "Animal " + (estado.indiceAtual + 1) + " de " + estado.animais.length;
}

btnProximo.addEventListener("click", function() {
  if (estado.indiceAtual === estado.animais.length - 1) {
    estado.indiceAtual = 0;
  } else {
    estado.indiceAtual++;
  }

  renderizar();
});

btnAnterior.addEventListener("click", function() {
  if (estado.indiceAtual === 0) {
    estado.indiceAtual = estado.animais.length - 1;
  } else {
    estado.indiceAtual--;
  }

  renderizar();
});

renderizar();
