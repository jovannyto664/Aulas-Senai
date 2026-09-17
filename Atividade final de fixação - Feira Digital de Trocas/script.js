const STORAGE_KEY = "feira-digital-itens";
const LEGACY_STORAGE_KEY = "itens";
const LIMITE_DESCRICAO = 200;

const exemplos = [
  {
    nome: "Livro de JavaScript",
    categoria: "Livros",
    estado: "Bom",
    tipo: "Troca",
    descricao: "Livro usado em ótimo estado, ideal para revisar DOM e funções.",
    responsavel: "Ana",
  },
  {
    nome: "Mochila escolar",
    categoria: "Roupas",
    estado: "Usado",
    tipo: "Doação",
    descricao: "Mochila limpa, com marcas leves de uso e zíper funcionando.",
    responsavel: "Bruno",
  },
  {
    nome: "Jogo de copos",
    categoria: "Casa",
    estado: "Novo",
    tipo: "Troca",
    descricao: "Conjunto com quatro copos ainda na embalagem.",
    responsavel: "Carla",
  },
];

let itens = [];
let temporizadorMensagem = null;
let elementos = {};

document.addEventListener("DOMContentLoaded", iniciarAplicacao);

function iniciarAplicacao() {
  selecionarElementos();
  itens = carregarItens();

  elementos.formulario.addEventListener("submit", cadastrarItem);
  elementos.formulario.addEventListener("reset", limparFormulario);
  elementos.listaItens.addEventListener("click", tratarCliqueDaLista);
  elementos.pesquisa.addEventListener("input", aplicarPesquisaEFiltros);
  elementos.filtroCategoria.addEventListener("change", aplicarPesquisaEFiltros);
  elementos.filtroTipo.addEventListener("change", aplicarPesquisaEFiltros);
  elementos.filtroSituacao.addEventListener("change", aplicarPesquisaEFiltros);
  elementos.btnExemplos.addEventListener("click", carregarExemplos);
  elementos.descricao.addEventListener("input", atualizarContadorDescricao);
  document.addEventListener("keydown", tratarAtalhosDoTeclado);

  atualizarContadorDescricao();
  aplicarPesquisaEFiltros();
}

function selecionarElementos() {
  elementos = {
    formulario: document.getElementById("formItem"),
    nome: document.getElementById("nome"),
    categoria: document.getElementById("categoria"),
    estado: document.getElementById("estado"),
    tipo: document.getElementById("tipo"),
    responsavel: document.getElementById("responsavel"),
    descricao: document.getElementById("descricao"),
    contadorDescricao: document.getElementById("contadorDescricao"),
    pesquisa: document.getElementById("pesquisa"),
    filtroCategoria: document.getElementById("filtroCategoria"),
    filtroTipo: document.getElementById("filtroTipo"),
    filtroSituacao: document.getElementById("filtroSituacao"),
    mensagem: document.getElementById("mensagem"),
    listaItens: document.getElementById("listaItens"),
    estadoVazio: document.getElementById("estadoVazio"),
    quantidadeResultados: document.getElementById("quantidadeResultados"),
    totalItens: document.getElementById("totalItens"),
    totalDisponiveis: document.getElementById("totalDisponiveis"),
    totalReservados: document.getElementById("totalReservados"),
    totalDoacoes: document.getElementById("totalDoacoes"),
    btnExemplos: document.getElementById("btnExemplos"),
  };
}

function cadastrarItem(event) {
  event.preventDefault();

  const dados = obterDadosDoFormulario();
  const erros = validarDados(dados);

  atualizarValidacaoDosCampos(erros);

  if (Object.keys(erros).length > 0) {
    mostrarMensagem("Revise os campos destacados antes de cadastrar.", "erro");
    focarPrimeiroCampoComErro(erros);
    return;
  }

  const item = criarItem(dados);
  itens.push(item);
  salvarItens();
  elementos.formulario.reset();
  limparFormulario();
  aplicarPesquisaEFiltros();
  mostrarMensagem("Item cadastrado com sucesso.", "sucesso");
}

function obterDadosDoFormulario() {
  return {
    nome: elementos.nome.value.trim(),
    categoria: elementos.categoria.value,
    estado: elementos.estado.value,
    tipo: elementos.tipo.value,
    responsavel: elementos.responsavel.value.trim(),
    descricao: elementos.descricao.value.trim(),
  };
}

function validarDados(dados) {
  const erros = {};

  if (!dados.nome) {
    erros.nome = "Digite um nome válido.";
  }

  if (!dados.categoria) {
    erros.categoria = "Selecione uma categoria.";
  }

  if (!dados.estado) {
    erros.estado = "Selecione o estado de conservação.";
  }

  if (!dados.tipo) {
    erros.tipo = "Selecione troca ou doação.";
  }

  if (!dados.responsavel) {
    erros.responsavel = "Informe o responsável.";
  }

  if (!dados.descricao) {
    erros.descricao = "Digite uma descrição.";
  } else if (dados.descricao.length > LIMITE_DESCRICAO) {
    erros.descricao = `A descrição deve ter no máximo ${LIMITE_DESCRICAO} caracteres.`;
  }

  if (existeItemIgual(dados)) {
    erros.nome = "Já existe um item cadastrado com estes mesmos dados.";
  }

  return erros;
}

function existeItemIgual(dados) {
  const camposComparados = [
    "nome",
    "categoria",
    "estado",
    "tipo",
    "responsavel",
    "descricao",
  ];

  return itens.some((item) =>
    camposComparados.every(
      (campo) => normalizarTexto(item[campo]) === normalizarTexto(dados[campo])
    )
  );
}

function atualizarValidacaoDosCampos(erros) {
  const campos = {
    nome: elementos.nome,
    categoria: elementos.categoria,
    estado: elementos.estado,
    tipo: elementos.tipo,
    responsavel: elementos.responsavel,
    descricao: elementos.descricao,
  };

  Object.entries(campos).forEach(([nomeCampo, campo]) => {
    const erro = erros[nomeCampo] || "";
    const elementoErro = document.getElementById(`erro${capitalizar(nomeCampo)}`);

    campo.classList.toggle("campo-erro", Boolean(erro));
    campo.classList.toggle("campo-valido", !erro && Boolean(campo.value.trim()));
    campo.setAttribute("aria-invalid", erro ? "true" : "false");

    if (elementoErro) {
      elementoErro.textContent = erro;
    }
  });
}

function focarPrimeiroCampoComErro(erros) {
  const primeiroCampo = Object.keys(erros)[0];

  if (primeiroCampo && elementos[primeiroCampo]) {
    elementos[primeiroCampo].focus();
  }
}

function limparFormulario() {
  setTimeout(() => {
    atualizarContadorDescricao();
    atualizarValidacaoDosCampos({});
  }, 0);
}

function criarItem(dados) {
  return {
    id: criarId(),
    nome: dados.nome,
    categoria: dados.categoria,
    estado: dados.estado,
    tipo: dados.tipo,
    responsavel: dados.responsavel,
    descricao: dados.descricao,
    situacao: "disponivel",
    criadoEm: new Date().toISOString(),
  };
}

function criarId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function aplicarPesquisaEFiltros() {
  const itensFiltrados = getItensFiltrados();
  renderizarItens(itensFiltrados);
  atualizarResumo();
}

function getItensFiltrados() {
  const termo = normalizarTexto(elementos.pesquisa.value);
  const categoria = elementos.filtroCategoria.value;
  const tipo = elementos.filtroTipo.value;
  const situacao = elementos.filtroSituacao.value;

  return itens.filter((item) => {
    const textoDoItem = normalizarTexto(`${item.nome} ${item.descricao}`);
    const pesquisaOk = !termo || textoDoItem.includes(termo);
    const categoriaOk = categoria === "Todos" || item.categoria === categoria;
    const tipoOk = tipo === "Todos" || item.tipo === tipo;
    const situacaoOk = situacao === "Todos" || item.situacao === situacao;

    return pesquisaOk && categoriaOk && tipoOk && situacaoOk;
  });
}

function renderizarItens(lista) {
  elementos.listaItens.replaceChildren();
  elementos.quantidadeResultados.textContent = `${lista.length} resultado(s)`;

  if (lista.length === 0) {
    elementos.estadoVazio.hidden = false;
    elementos.estadoVazio.textContent =
      itens.length === 0
        ? "Nenhum item cadastrado ainda."
        : "Nenhum item encontrado com os critérios atuais.";
    return;
  }

  elementos.estadoVazio.hidden = true;

  lista.forEach((item) => {
    elementos.listaItens.appendChild(criarCartaoItem(item));
  });
}

function criarCartaoItem(item) {
  const reservado = item.situacao === "reservado";
  const cartao = criarElemento("article", "cartao-item");
  cartao.classList.add(item.situacao, criarClassePeloTexto(item.tipo));
  cartao.dataset.id = item.id;

  const topo = criarElemento("div", "cartao-topo");
  const titulo = criarElemento("h3", "", item.nome);
  const etiquetas = criarElemento("div", "cartao-meta");
  etiquetas.append(
    criarEtiqueta(textoSituacao(item), item.situacao),
    criarEtiqueta(item.tipo, criarClassePeloTexto(item.tipo))
  );
  topo.append(titulo, etiquetas);

  const descricao = criarElemento("p", "cartao-descricao", item.descricao);
  const detalhes = criarElemento("dl", "detalhes-item");
  adicionarDetalhe(detalhes, "Categoria", item.categoria);
  adicionarDetalhe(detalhes, "Estado", item.estado);
  adicionarDetalhe(detalhes, "Responsável", item.responsavel);
  adicionarDetalhe(detalhes, "Cadastro", formatarData(item.criadoEm));

  const acoes = criarElemento("div", "acoes-cartao");
  const botaoSituacao = criarElemento(
    "button",
    reservado ? "btn-secundario" : "btn-principal",
    reservado ? "Disponibilizar novamente" : "Reservar item"
  );
  botaoSituacao.type = "button";
  botaoSituacao.dataset.acao = reservado ? "disponibilizar" : "reservar";
  botaoSituacao.dataset.id = item.id;

  const botaoExcluir = criarElemento("button", "btn-excluir", "Excluir");
  botaoExcluir.type = "button";
  botaoExcluir.dataset.acao = "excluir";
  botaoExcluir.dataset.id = item.id;

  acoes.append(botaoSituacao, botaoExcluir);
  cartao.append(topo, descricao, detalhes, acoes);

  return cartao;
}

function criarEtiqueta(texto, classe) {
  return criarElemento("span", `etiqueta ${classe}`, texto);
}

function adicionarDetalhe(lista, termo, descricao) {
  const dt = criarElemento("dt", "", `${termo}:`);
  const dd = criarElemento("dd", "", descricao);

  lista.append(dt, dd);
}

function tratarCliqueDaLista(event) {
  const botao = event.target.closest("button[data-acao]");

  if (!botao) {
    return;
  }

  const { acao, id } = botao.dataset;

  if (acao === "reservar") {
    alterarSituacao(id, "reservado");
  }

  if (acao === "disponibilizar") {
    alterarSituacao(id, "disponivel");
  }

  if (acao === "excluir") {
    confirmarExclusao(id);
  }
}

function alterarSituacao(id, novaSituacao) {
  const item = itens.find((itemAtual) => itemAtual.id === id);

  if (!item) {
    return;
  }

  item.situacao = novaSituacao;
  salvarItens();
  aplicarPesquisaEFiltros();

  const texto =
    novaSituacao === "reservado"
      ? "Item reservado com sucesso."
      : "Item disponibilizado novamente.";

  mostrarMensagem(texto, "sucesso");
}

function confirmarExclusao(id) {
  const item = itens.find((itemAtual) => itemAtual.id === id);

  if (!item) {
    return;
  }

  const confirmado = window.confirm(`Deseja excluir "${item.nome}"?`);

  if (!confirmado) {
    mostrarMensagem("Exclusão cancelada.", "aviso");
    return;
  }

  excluirItem(id);
}

function excluirItem(id) {
  itens = itens.filter((item) => item.id !== id);
  salvarItens();
  aplicarPesquisaEFiltros();
  mostrarMensagem("Item excluído com sucesso.", "aviso");
}

function atualizarResumo() {
  const total = itens.length;
  const disponiveis = itens.filter((item) => item.situacao === "disponivel").length;
  const reservados = itens.filter((item) => item.situacao === "reservado").length;
  const doacoes = itens.filter((item) => item.tipo === "Doação").length;

  elementos.totalItens.textContent = total;
  elementos.totalDisponiveis.textContent = disponiveis;
  elementos.totalReservados.textContent = reservados;
  elementos.totalDoacoes.textContent = doacoes;
}

function carregarExemplos() {
  let adicionados = 0;

  exemplos.forEach((exemplo) => {
    if (!existeItemIgual(exemplo)) {
      itens.push(criarItem(exemplo));
      adicionados += 1;
    }
  });

  if (adicionados === 0) {
    mostrarMensagem("Os exemplos já estavam cadastrados.", "aviso");
    return;
  }

  salvarItens();
  aplicarPesquisaEFiltros();
  mostrarMensagem(`${adicionados} exemplo(s) carregado(s).`, "sucesso");
}

function atualizarContadorDescricao() {
  const tamanho = elementos.descricao.value.length;
  elementos.contadorDescricao.textContent = `${tamanho}/${LIMITE_DESCRICAO}`;
}

function tratarAtalhosDoTeclado(event) {
  const digitandoEmCampo = ["INPUT", "SELECT", "TEXTAREA"].includes(
    document.activeElement.tagName
  );

  if (event.key === "/" && !digitandoEmCampo) {
    event.preventDefault();
    elementos.pesquisa.focus();
    elementos.pesquisa.select();
  }

  if (event.key === "Escape" && elementos.pesquisa.value) {
    elementos.pesquisa.value = "";
    aplicarPesquisaEFiltros();
    elementos.pesquisa.focus();
    mostrarMensagem("Pesquisa limpa.", "aviso");
  }
}

function salvarItens() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
}

function carregarItens() {
  const dadosSalvos =
    localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);

  if (!dadosSalvos) {
    return [];
  }

  try {
    const dados = JSON.parse(dadosSalvos);

    if (!Array.isArray(dados)) {
      return [];
    }

    return dados.map(normalizarItemSalvo).filter(Boolean);
  } catch (erro) {
    mostrarMensagem("Não foi possível recuperar os dados salvos.", "erro");
    return [];
  }
}

function normalizarItemSalvo(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  return {
    id: item.id || criarId(),
    nome: item.nome || "Item sem nome",
    categoria: corrigirTexto(item.categoria) || "Outros",
    estado: corrigirTexto(item.estado) || "Não informado",
    tipo: normalizarTipo(item.tipo),
    responsavel: item.responsavel || "Não informado",
    descricao: item.descricao || "Sem descrição.",
    situacao: item.situacao === "reservado" ? "reservado" : "disponivel",
    criadoEm: item.criadoEm || new Date().toISOString(),
  };
}

function normalizarTipo(tipo) {
  const tipoCorrigido = corrigirTexto(tipo);
  const texto = normalizarTexto(tipoCorrigido);

  if (texto.includes("doacao")) {
    return "Doação";
  }

  return "Troca";
}

function corrigirTexto(texto = "") {
  const correcoes = {
    "EletrÃ´nicos": "Eletrônicos",
    "DoaÃ§Ã£o": "Doação",
    "DisponÃ­vel": "Disponível",
  };

  return correcoes[texto] || texto;
}

function mostrarMensagem(texto, tipo = "aviso") {
  clearTimeout(temporizadorMensagem);
  elementos.mensagem.textContent = texto;
  elementos.mensagem.className = `mensagem ${tipo}`;
  elementos.mensagem.hidden = false;

  temporizadorMensagem = setTimeout(() => {
    elementos.mensagem.textContent = "";
    elementos.mensagem.className = "mensagem";
    elementos.mensagem.hidden = true;
  }, 3200);
}

function criarElemento(tag, classe = "", texto = "") {
  const elemento = document.createElement(tag);

  if (classe) {
    elemento.className = classe;
  }

  if (texto) {
    elemento.textContent = texto;
  }

  return elemento;
}

function criarClassePeloTexto(texto) {
  return normalizarTexto(texto)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function textoSituacao(item) {
  return item.situacao === "reservado" ? "Reservado" : "Disponível";
}

function formatarData(data) {
  const dataValida = new Date(data);

  if (Number.isNaN(dataValida.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(dataValida);
}

function normalizarTexto(texto = "") {
  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
