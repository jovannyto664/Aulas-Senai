// O estado guarda a informação verdadeira.
const estado = {
  ligada: false
};

// Elementos da página.
const lampada = document.querySelector("#lampada" );
const mensagem = document.querySelector("#mensagem");
const btnAlternar = document.querySelector("#btn-alternar");

// Mostra na tela aquilo que existe no estado.
function renderizar() {
  // TODO 1:
  // Adicione ou remova a classe "acesa" conforme estado.ligada.
    lampada.classList.toggle("acesa", estado.ligada)

    if (estado.ligada) {
        mensagem.textContent = "A lâmpada está acesa."
        btnAlternar.textContent = "Apagar"
        
    } else {
        mensagem.textContent = "A lâmpada está apagada."
        btnAlternar.textContent = "acender"
    }
  // TODO 2:
  // Atualize o texto da mensagem.

  // TODO 3:
  // Atualize o texto do botão para "Acender" ou "Apagar".
}

btnAlternar.addEventListener("click", function() {
  // TODO 4:
  // Inverta o valor de estado.ligada.
    estado.ligada = !estado.ligada
  renderizar();
});

renderizar();