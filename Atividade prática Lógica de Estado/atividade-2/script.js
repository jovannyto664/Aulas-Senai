const estado = {
  volume: 5
};

const numeroVolume = document.querySelector("#numero-volume");
const descricaoVolume = document.querySelector("#descricao-volume");
const btnDiminuir = document.querySelector("#btn-diminuir");
const btnAumentar = document.querySelector("#btn-aumentar");

function obterDescricaoVolume() {
  if (estado.volume === 0) {
    return "Sem som";
  }

  if (estado.volume <= 3) {
    return "Volume baixo";
  }

  if (estado.volume <= 7) {
    return "Volume médio";
  }

  return "Volume alto";
}

function renderizar() {
  numeroVolume.textContent = estado.volume;
  descricaoVolume.textContent = obterDescricaoVolume();
  btnDiminuir.disabled = estado.volume === 0;
  btnAumentar.disabled = estado.volume === 10;
}

btnAumentar.addEventListener("click", function() {
  if (estado.volume < 10) {
    estado.volume++;
  }

  renderizar();
});

btnDiminuir.addEventListener("click", function() {
  if (estado.volume > 0) {
    estado.volume--;
  }

  renderizar();
});

renderizar();
