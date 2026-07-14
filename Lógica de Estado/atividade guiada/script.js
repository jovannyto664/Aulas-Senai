// 1. O estado guarda a informação verdadeira do placar.
const estado = {
  pontos: 0
};

// 2. Selecionamos os elementos da página.
const numeroPontos = document.querySelector("#numero-pontos");
const btnAumentar = document.querySelector("#btn-aumentar");
const btnDiminuir = document.querySelector("#btn-diminuir");
const btnZerar = document.querySelector("#btn-zerar");

// 3. Esta função mostra o estado atual na tela.
function renderizar() {
  numeroPontos.textContent = estado.pontos;
}

// 4. Cada evento altera primeiro o estado.
btnAumentar.addEventListener("click", function() {
  estado.pontos++;
  renderizar();
});

btnDiminuir.addEventListener("click", function() {
  if (estado.pontos > 0) {
    estado.pontos--;
    renderizar();
  }
});

btnZerar.addEventListener("click", function() {
  estado.pontos = 0;
  renderizar();
});

// 5. Primeira atualização da tela.
renderizar();

