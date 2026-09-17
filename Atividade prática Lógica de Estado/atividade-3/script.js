const estado = {
  pontosAzul: 0,
  pontosVerde: 0
};

const pontosAzul = document.querySelector("#pontos-azul");
const pontosVerde = document.querySelector("#pontos-verde");
const totalPontos = document.querySelector("#total-pontos");
const mensagemLider = document.querySelector("#mensagem-lider");

const btnAzul = document.querySelector("#btn-azul");
const btnVerde = document.querySelector("#btn-verde");
const btnZerar = document.querySelector("#btn-zerar");

function renderizar() {
  pontosAzul.textContent = estado.pontosAzul;
  pontosVerde.textContent = estado.pontosVerde;

  totalPontos.textContent = estado.pontosAzul + estado.pontosVerde;

  if (estado.pontosAzul > estado.pontosVerde) {
    mensagemLider.textContent = "O Time Azul está vencendo.";
  } else if (estado.pontosVerde > estado.pontosAzul) {
    mensagemLider.textContent = "O Time Verde está vencendo.";
  } else {
    mensagemLider.textContent = "A disputa está empatada.";
  }
}

btnAzul.addEventListener("click", function() {
  estado.pontosAzul++;
  renderizar();
});

btnVerde.addEventListener("click", function() {
  estado.pontosVerde++;
  renderizar();
});

btnZerar.addEventListener("click", function() {
  estado.pontosAzul = 0;
  estado.pontosVerde = 0;
  renderizar();
});

renderizar();
