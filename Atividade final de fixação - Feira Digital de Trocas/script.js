const formulario = document.getElementById("formItem");
const pesquisa = document.getElementById("pesquisa");
const filtroCat = document.getElementById("filtroCategoria");
const filtroTipo = document.getElementById("filtroTipo");
const filtroSituacao = document.getElementById("filtroSituacao");
const mensagem = document.getElementById("mensagem");
const listaItens = document.getElementById("listaItens");
const estadoVazio = document.getElementById("estadoVazio");

let itens = [];

function inicializarItens() {
  const itensSalvos = localStorage.getItem("itens");
  itens = itensSalvos ? JSON.parse(itensSalvos) : [];
}

function normalizarTexto(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function salvarItens() {
  localStorage.setItem("itens", JSON.stringify(itens));
}

function mostrarMensagem(texto, tipo = "info") {
  mensagem.textContent = texto;
  mensagem.className = tipo;
  mensagem.hidden = false;

  clearTimeout(mensagem.timer);
  mensagem.timer = setTimeout(() => {
    mensagem.textContent = "";
    mensagem.hidden = true;
    mensagem.className = "";
  }, 2500);
}

function atualizarResumo() {
  const totalItens = itens.length;
  const totalDisponiveis = itens.filter(item => item.situacao === "disponivel").length;
  const totalReservados = itens.filter(item => item.situacao === "reservado").length;
  const totalDoacoes = itens.filter(item => item.tipo === "Doação").length;

  document.getElementById("totalItens").textContent = totalItens;
  document.getElementById("totalDisponiveis").textContent = totalDisponiveis;
  document.getElementById("totalReservados").textContent = totalReservados;
  document.getElementById("totalDoacoes").textContent = totalDoacoes;
}

function validarDados({ nome, categoria, tipo, estado, descricao, responsavel }) {
  if (!nome) return "Digite um nome válido.";
  if (!categoria) return "Selecione a categoria.";
  if (!tipo) return "Selecione o tipo de disponibilidade.";
  if (!estado) return "Selecione o estado.";
  if (!descricao) return "Digite uma descrição válida.";
  if (!responsavel) return "Digite um responsável válido.";
  return "";
}

function criarItem(dados) {
  const id = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${performance.now().toFixed(0)}`;

  return {
    id,
    nome: dados.nome,
    categoria: dados.categoria,
    estado: dados.estado,
    tipo: dados.tipo,
    descricao: dados.descricao,
    responsavel: dados.responsavel,
    situacao: "disponivel"
  };
}

function renderizarItensLista(lista) {
  listaItens.innerHTML = "";
  
  if (lista.length === 0) {
    estadoVazio.textContent = "Nenhum item encontrado com os critérios atuais.";
    estadoVazio.style.display = "block";
    return;
  }

  estadoVazio.style.display = "none";

  lista.forEach((item) => {
    const card = document.createElement("article");
    const reservado = item.situacao === "reservado";

    card.className = reservado ? "card reservado" : "card disponivel";

    card.innerHTML = `
      <h3>${item.nome}</h3>
      <p><strong>Categoria:</strong> ${item.categoria}</p>
      <p><strong>Estado:</strong> ${item.estado}</p>
      <p><strong>Tipo:</strong> ${item.tipo}</p>
      <p><strong>Descrição:</strong> ${item.descricao}</p>
      <p><strong>Responsável:</strong> ${item.responsavel}</p>
      <p><strong>Situação:</strong> ${reservado ? "Reservado" : "Disponível"}</p>

      <button data-id="${item.id}" data-acao="${reservado ? "disponibilizar" : "reservar"}">
        ${reservado ? "Disponibilizar" : "Reservar"}
      </button>

      <button data-id="${item.id}" data-acao="excluir">Excluir</button>
    `;

    listaItens.appendChild(card);
  });
}

function renderizarItens() {
  renderizarItensLista(itens);
}

function getItensFiltrados() {
  const termoBusca = normalizarTexto(pesquisa.value);
  const categoria = filtroCat.value;
  const tipo = filtroTipo.value;
  const situacao = filtroSituacao.value;

  return itens.filter((item) => {
    const nome = normalizarTexto(item.nome);
    const descricao = normalizarTexto(item.descricao);

    const pesquisaOk =
      termoBusca === "" ||
      nome.includes(termoBusca) ||
      descricao.includes(termoBusca);

    const categoriaOk =
      categoria === "Todos" || item.categoria === categoria;

    const tipoOk =
      tipo === "Todos" || item.tipo === tipo;

    const situacaoOk =
      situacao === "Todos" ||
      (situacao === "Disponível" && item.situacao === "disponivel") ||
      (situacao === "Reservado" && item.situacao === "reservado");

    return pesquisaOk && categoriaOk && tipoOk && situacaoOk;
  });
}

function renderizarItensFiltrados() {
  renderizarItensLista(getItensFiltrados());
}

function alterarSituacao(id, novaSituacao) {
  const item = itens.find((i) => i.id === id);

  if (!item) return;

  item.situacao = novaSituacao;
  salvarItens();
  atualizarResumo();
  renderizarItensFiltrados();
  mostrarMensagem(
    novaSituacao === "reservado"
      ? "Item reservado com sucesso."
      : "Item disponibilizado novamente.",
    "info"
  );
}

function excluirItem(id) {
  const index = itens.findIndex((i) => i.id === id);

  if (index === -1) return;

  itens.splice(index, 1);
  salvarItens();
  atualizarResumo();
  renderizarItensFiltrados();
  mostrarMensagem("Item excluído com sucesso.", "aviso");
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarItens();
  renderizarItensFiltrados();
  atualizarResumo();

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const dados = new FormData(formulario);
    const nome = dados.get("nome")?.trim();
    const descricao = dados.get("descricao")?.trim();
    const responsavel = dados.get("responsavel")?.trim();
    const categoria = dados.get("categoria")?.trim();
    const estado = dados.get("estado")?.trim();
    const tipo = dados.get("tipo")?.trim();

    const erro = validarDados({ nome, categoria, tipo, estado, descricao, responsavel });

    if (erro) {
      mostrarMensagem(erro, "erro");
      return;
    }

    const item = criarItem({ nome, categoria, estado, tipo, descricao, responsavel });
    itens.push(item);

    salvarItens();
    atualizarResumo();
    renderizarItensFiltrados();
    formulario.reset();
    mostrarMensagem("Item cadastrado com sucesso!", "sucesso");
  });

  listaItens.addEventListener("click", (event) => {
    const botao = event.target.closest("button");

    if (!botao) return;

    const acao = botao.dataset.acao;
    const id = botao.dataset.id;

    if (acao === "reservar") {
      alterarSituacao(id, "reservado");
    }

    if (acao === "disponibilizar") {
      alterarSituacao(id, "disponivel");
    }

    if (acao === "excluir") {
      const confirmar = confirm("Deseja realmente excluir este item?");
      if (confirmar) {
        excluirItem(id);
      }
    }
  });

  pesquisa.addEventListener("input", renderizarItensFiltrados);
  filtroCat.addEventListener("change", renderizarItensFiltrados);
  filtroTipo.addEventListener("change", renderizarItensFiltrados);
  filtroSituacao.addEventListener("change", renderizarItensFiltrados);

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== pesquisa) {
      event.preventDefault();
      pesquisa.focus();
      pesquisa.select();
    }

    if (event.key === "Escape") {
      pesquisa.value = "";
      renderizarItensFiltrados();
      pesquisa.focus();
    }
  });
});

