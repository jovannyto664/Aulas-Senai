const estado = {
  tema: "claro"
};

const painel = document.querySelector("#painel");
const temaAtual = document.querySelector("#tema-atual");

const btnClaro = document.querySelector("#btn-claro");
const btnEscuro = document.querySelector("#btn-escuro");
const btnAzul = document.querySelector("#btn-azul");

function salvarEstado() {
  localStorage.setItem("tema_painel", estado.tema);
}

function carregarEstado() {
  const temaSalvo = localStorage.getItem("tema_painel");

  if (temaSalvo !== null) {
    estado.tema = temaSalvo;
  }
}

function renderizar() {
  painel.classList.remove(
    "tema-claro",
    "tema-escuro",
    "tema-azul"
  );

  painel.classList.add("tema-" + estado.tema);
  temaAtual.textContent = "Tema atual: " + estado.tema;
}

function alterarTema(novoTema) {
  estado.tema = novoTema;
  salvarEstado();
  renderizar();
}

btnClaro.addEventListener("click", function() {
  alterarTema("claro");
});

btnEscuro.addEventListener("click", function() {
  alterarTema("escuro");
});

btnAzul.addEventListener("click", function() {
  alterarTema("azul");
});

carregarEstado();
renderizar();
