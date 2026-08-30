const estado = {
  ligada: false
};

const lampada = document.querySelector("#lampada");
const mensagem = document.querySelector("#mensagem");
const btnAlternar = document.querySelector("#btn-alternar");

function renderizar() {
  lampada.classList.toggle("acesa", estado.ligada);

  if (estado.ligada) {
    mensagem.textContent = "A lâmpada está acesa.";
    btnAlternar.textContent = "Apagar";
  } else {
    mensagem.textContent = "A lâmpada está apagada.";
    btnAlternar.textContent = "Acender";
  }
}

btnAlternar.addEventListener("click", function() {
  estado.ligada = !estado.ligada;
  renderizar();
});

renderizar();
