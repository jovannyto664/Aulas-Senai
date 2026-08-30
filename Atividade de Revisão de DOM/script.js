const botaoTema = document.querySelector("#btn-tema");
const campoChamado = document.querySelector("#campo-chamado");
const botaoAdicionar = document.querySelector("#btn-adicionar");
const containerChamados = document.querySelector("#container-chamados");

botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("modo-escuro");

  if (document.body.classList.contains("modo-escuro")) {
    botaoTema.textContent = "Modo Claro";
  } else {
    botaoTema.textContent = "Modo Escuro";
  }
});

botaoAdicionar.addEventListener("click", () => {
  const textoChamado = campoChamado.value.trim();

  if (textoChamado === "") {
    campoChamado.focus();
    return;
  }

  const cardChamado = document.createElement("div");
  const paragrafoChamado = document.createElement("p");
  const areaBotoes = document.createElement("div");
  const botaoResolver = document.createElement("button");
  const botaoApagar = document.createElement("button");

  cardChamado.classList.add("card-chamado");
  areaBotoes.classList.add("botoes-card");
  botaoResolver.classList.add("btn-resolver");
  botaoApagar.classList.add("btn-apagar");

  paragrafoChamado.textContent = textoChamado;
  botaoResolver.textContent = "Concluir";
  botaoApagar.textContent = "Excluir";

  botaoResolver.addEventListener("click", () => {
    cardChamado.classList.toggle("resolvido");
  });

  botaoApagar.addEventListener("click", () => {
    cardChamado.remove();
  });

  areaBotoes.append(botaoResolver, botaoApagar);
  cardChamado.append(paragrafoChamado, areaBotoes);
  containerChamados.prepend(cardChamado);

  campoChamado.value = "";
  campoChamado.focus();
});
