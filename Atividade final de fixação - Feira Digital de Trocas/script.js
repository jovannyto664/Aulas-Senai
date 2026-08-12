const formulario = document.getElementById("formItem");
const pesquisa = document.getElementById("pesquisa");
const filtroCat = document.getElementById("filtroCategoria");
const filtroTipo = document.getElementById("filtroTipo");
const filtroSituacao = document.querySelector("#filtroSituacao");
const mensagem = document.getElementById("mensagem");
const listaItens = document.getElementById("listaItens");
const estadoVazio = document.querySelector("#estadoVazio")
function renderizarItens() {
    estadoVazio.innerHTML =""

  itens.forEach((item) => {
    const card = document.createElement("article");

    card.innerHTML = `
      <h3>${item.nome}</h3>
      <p><strong>Categoria:</strong> ${item.categoria}</p>
      <p><strong>Estado:</strong> ${item.estado}</p>
      <p><strong>Tipo:</strong> ${item.tipo}</p>
      <p><strong>Descrição:</strong> ${item.descricao}</p>
      <p><strong>Responsável:</strong> ${item.responsavel}</p>
      <p><strong>Situação:</strong> ${item.situacao}</p>

      <button data-id="${item.id}" data-acao="reservar">Reservar</button>
      <button data-id="${item.id}" data-acao="disponibilizar">Disponibilizar</button>
      <button data-id="${item.id}" data-acao="excluir">Excluir</button>
    `;

    listaItens.appendChild(card);
  });
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const novoForm = new FormData(formulario);

  const nome = novoForm.get("nome")?.trim();
  const descricao = novoForm.get("descricao")?.trim();
  const responsavel = novoForm.get("responsavel")?.trim();
  const categoria = novoForm.get("categoria")?.trim();
  const estado = novoForm.get("estado")?.trim();
  const tipo = novoForm.get("tipo")?.trim();

  const item = {
    nome,
    descricao,
    responsavel,
    categoria,
    estado,
    tipo,
    disponivel: true,
  };

  if (!nome || nome.length === 0) {
    mensagem.textContent = "Digite um nome válido.";
    return;
  }

  if (!categoria) {
    mensagem.textContent = "Selecione a categoria.";
    return;
  }

  if (!tipo) {
    mensagem.textContent = "Selecione o tipo de disponibilidade.";
    return;
  }

  if (!estado) {
    mensagem.textContent = "Selecione o estado.";
    return;
  }

  if (!descricao || descricao.length === 0) {
    mensagem.textContent = "Digite um nome válido.";
    return;
  }

  if (!responsavel || responsavel.length === 0) {
    mensagem.textContent = "Digite um nome válido.";
    return;
  }

  console.log(novoForm);
  console.log(novoForm.get("categoria"));
  formulario.reset();
  mensagem.textContent = "Item cadastrado com sucesso!";
  renderizarItens()
});
