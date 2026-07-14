const estado = {
  volume: 5
};

const numeroVolume = document.querySelector("#numero-volume");
const descricaoVolume = document.querySelector("#descricao-volume");
const btnDiminuir = document.querySelector("#btn-diminuir");
const btnAumentar = document.querySelector("#btn-aumentar");

function obterDescricaoVolume() {
  // TODO 1:
    numeroVolume==0?numeroVolume==0:"sem som"
  // Retorne "Sem som" quando o volume for 0.
  // Retorne "Volume baixo" entre 1 e 3.
  descricaoVolume?numeroVolume>4&&numeroVolume<7:"testw"
  // Retorne "Volume médio" entre 4 e 7.
  // Retorne "Volume alto" entre 8 e 10.
}

function renderizar() {
  // TODO 2:
  // Mostre estado.volume no elemento numeroVolume.

  // TODO 3:
  // Use obterDescricaoVolume() para atualizar descricaoVolume.

  // TODO 4:
  // Desative o botão de diminuir no volume 0
  // e o botão de aumentar no volume 10.
}

btnAumentar.addEventListener("click", function() {
  // TODO 5:
  // Aumente apenas quando o volume for menor que 10.

  renderizar();
});

btnDiminuir.addEventListener("click", function() {
  // TODO 6:
  // Diminua apenas quando o volume for maior que 0.

  renderizar();
});

renderizar();