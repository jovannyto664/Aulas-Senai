"use strict";

const STORAGE_KEY_LIVROS = "biblioteca_livros";
const STORAGE_KEY_PREFERENCIAS = "preferencias";

const preferenciasPadrao = {
  tema: "claro",
  tamanhoFonte: 16,
  notificacoes: true,
};

let livros = [];

function gerarId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const formLivro = document.querySelector("#form-livro");
const inputTitulo = document.querySelector("#titulo");
const inputAutor = document.querySelector("#autor");
const inputAno = document.querySelector("#ano");
const inputPaginas = document.querySelector("#paginas");
const btnCadastrar = document.querySelector("#btn-cadastrar");
const mensagemFormulario = document.querySelector("#mensagem-formulario");
const listaLivros = document.querySelector("#lista-livros");
const totalLivros = document.querySelector("#total-livros");
const totalPaginas = document.querySelector("#total-paginas");
const btnExemplos = document.querySelector("#btn-exemplos");
const btnCorromper = document.querySelector("#btn-corromper");
const btnLimpar = document.querySelector("#btn-limpar");
const testesValidacoes = document.querySelector("#testes-validacoes");
const testesCalculadora = document.querySelector("#testes-calculadora");
const previewPreferencias = document.querySelector("#preview-preferencias");
const botoesPreferencia = document.querySelectorAll("[data-teste-preferencia]");

function criarCopiaPreferenciasPadrao() {
  return { ...preferenciasPadrao };
}

function mostrarMensagem(texto, tipo = "info") {
  mensagemFormulario.textContent = texto;
  mensagemFormulario.className = `feedback ${tipo}`;
}

function validarNome(nome) {
  const texto = String(nome ?? "").trim().replace(/\s+/g, " ");

  if (texto === "") {
    throw new Error("O nome não pode ficar vazio.");
  }

  if (texto.length < 3) {
    throw new Error("O nome precisa ter pelo menos 3 caracteres.");
  }

  return texto;
}

function validarIdade(valor) {
  const texto = String(valor ?? "").trim();

  if (texto === "") {
    throw new Error("A idade precisa ser informada.");
  }

  const idade = Number(texto);

  if (Number.isNaN(idade)) {
    throw new Error("A idade precisa ser um número.");
  }

  if (idade < 0) {
    throw new Error("A idade não pode ser negativa.");
  }

  if (idade > 120) {
    throw new Error("A idade não pode ser maior que 120.");
  }

  return idade;
}

function validarEmail(email) {
  const texto = String(email ?? "").trim();
  const emailMinimo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (texto === "") {
    throw new Error("O e-mail precisa ser informado.");
  }

  if (!emailMinimo.test(texto)) {
    throw new Error("O e-mail precisa ter usuário, @ e domínio.");
  }

  return texto.toLowerCase();
}

function converterNumero(valor, nomeCampo) {
  const texto = String(valor ?? "").trim();

  if (texto === "") {
    throw new Error(`${nomeCampo} precisa ser informado.`);
  }

  const numero = Number(texto);

  if (Number.isNaN(numero)) {
    throw new Error(`${nomeCampo} precisa ser um número.`);
  }

  return numero;
}

function calcular(numero1, numero2, operacao) {
  const n1 = converterNumero(numero1, "O primeiro número");
  const n2 = converterNumero(numero2, "O segundo número");
  const operacaoTratada = String(operacao ?? "").trim().toLowerCase();

  switch (operacaoTratada) {
    case "soma":
      return n1 + n2;
    case "subtracao":
    case "subtração":
      return n1 - n2;
    case "multiplicacao":
    case "multiplicação":
      return n1 * n2;
    case "divisao":
    case "divisão":
      if (n2 === 0) {
        throw new Error("Não é possível dividir por zero.");
      }

      return n1 / n2;
    default:
      throw new Error("Operação inválida. Use soma, subtração, multiplicação ou divisão.");
  }
}

function validarTextoLivro(valor, nomeCampo) {
  const texto = String(valor ?? "").trim().replace(/\s+/g, " ");

  if (texto === "") {
    throw new Error(`${nomeCampo} não pode ficar vazio.`);
  }

  if (texto.length < 3) {
    throw new Error(`${nomeCampo} precisa ter pelo menos 3 caracteres.`);
  }

  return texto;
}

function validarInteiroLivro(valor, nomeCampo, minimo, maximo) {
  const texto = String(valor ?? "").trim();

  if (texto === "") {
    throw new Error(`${nomeCampo} não pode ficar vazio.`);
  }

  const numero = Number(texto);

  if (!Number.isInteger(numero)) {
    throw new Error(`${nomeCampo} precisa ser um número inteiro.`);
  }

  if (numero < minimo) {
    throw new Error(`${nomeCampo} não pode ser menor que ${minimo}.`);
  }

  if (maximo !== undefined && numero > maximo) {
    throw new Error(`${nomeCampo} não pode ser maior que ${maximo}.`);
  }

  return numero;
}

function criarLivroAPartirDoFormulario() {
  const anoAtual = new Date().getFullYear();

  return {
    id: gerarId(),
    titulo: validarTextoLivro(inputTitulo.value, "O título"),
    autor: validarTextoLivro(inputAutor.value, "O autor"),
    ano: validarInteiroLivro(inputAno.value, "O ano de publicação", 1450, anoAtual),
    paginas: validarInteiroLivro(inputPaginas.value, "A quantidade de páginas", 1),
  };
}

function recuperarPreferencias() {
  const valorSalvo = localStorage.getItem(STORAGE_KEY_PREFERENCIAS);

  if (valorSalvo === null) {
    console.info("Preferências ausentes. Usando objeto padrão.");
    return criarCopiaPreferenciasPadrao();
  }

  try {
    const preferencias = JSON.parse(valorSalvo);

    if (
      preferencias === null ||
      typeof preferencias !== "object" ||
      Array.isArray(preferencias) ||
      typeof preferencias.tema !== "string" ||
      typeof preferencias.tamanhoFonte !== "number" ||
      typeof preferencias.notificacoes !== "boolean"
    ) {
      console.warn("Preferências com formato incompatível:", preferencias);
      return criarCopiaPreferenciasPadrao();
    }

    return preferencias;
  } catch (erro) {
    console.error("Falha técnica ao converter preferências:", erro);
    return criarCopiaPreferenciasPadrao();
  }
}

function livroTemFormatoValido(livro) {
  return (
    livro !== null &&
    typeof livro === "object" &&
    typeof livro.id === "string" &&
    typeof livro.titulo === "string" &&
    typeof livro.autor === "string" &&
    Number.isInteger(livro.ano) &&
    Number.isInteger(livro.paginas)
  );
}

function recuperarLivros() {
  const valorSalvo = localStorage.getItem(STORAGE_KEY_LIVROS);

  if (valorSalvo === null) {
    return [];
  }

  try {
    const livrosRecuperados = JSON.parse(valorSalvo);

    if (!Array.isArray(livrosRecuperados)) {
      console.warn("A chave de livros não contém um array:", livrosRecuperados);
      return [];
    }

    if (!livrosRecuperados.every(livroTemFormatoValido)) {
      console.warn("A chave de livros contém itens incompatíveis:", livrosRecuperados);
      return [];
    }

    return livrosRecuperados;
  } catch (erro) {
    console.error("Falha técnica ao recuperar livros:", erro);
    return [];
  }
}

function salvarLivros(novosLivros) {
  try {
    localStorage.setItem(STORAGE_KEY_LIVROS, JSON.stringify(novosLivros));
  } catch (erro) {
    console.error("Falha técnica ao salvar livros:", erro);
    throw new Error("Não foi possível salvar os livros agora.");
  }
}

function criarItemLivro(livro) {
  const item = document.createElement("li");
  const titulo = document.createElement("strong");
  const detalhes = document.createElement("span");

  titulo.textContent = livro.titulo;
  detalhes.textContent = `${livro.autor} - ${livro.ano} - ${livro.paginas} páginas`;

  item.append(titulo, detalhes);
  return item;
}

function renderizarLivros() {
  listaLivros.innerHTML = "";

  if (livros.length === 0) {
    const itemVazio = document.createElement("li");
    itemVazio.classList.add("vazio");
    itemVazio.textContent = "Nenhum livro cadastrado.";
    listaLivros.appendChild(itemVazio);
  } else {
    livros.forEach((livro) => {
      listaLivros.appendChild(criarItemLivro(livro));
    });
  }

  const paginas = livros.reduce((total, livro) => total + livro.paginas, 0);
  totalLivros.textContent = String(livros.length);
  totalPaginas.textContent = String(paginas);
}

function cadastrarLivro(evento) {
  evento.preventDefault();

  const textoOriginalBotao = btnCadastrar.textContent;
  btnCadastrar.disabled = true;
  btnCadastrar.textContent = "Processando...";

  try {
    const livro = criarLivroAPartirDoFormulario();
    const novaLista = [...livros, livro];

    salvarLivros(novaLista);
    livros = novaLista;
    renderizarLivros();
    formLivro.reset();
    inputTitulo.focus();
    mostrarMensagem("Livro cadastrado com sucesso.", "sucesso");
  } catch (erro) {
    console.error("Falha ao cadastrar livro:", erro);
    mostrarMensagem(erro.message, "erro");
  } finally {
    btnCadastrar.disabled = false;
    btnCadastrar.textContent = textoOriginalBotao;
  }
}

function carregarLivrosDeExemplo() {
  const exemplos = [
    {
      id: gerarId(),
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      ano: 1899,
      paginas: 256,
    },
    {
      id: gerarId(),
      titulo: "O Hobbit",
      autor: "J. R. R. Tolkien",
      ano: 1937,
      paginas: 310,
    },
  ];

  try {
    salvarLivros(exemplos);
    livros = exemplos;
    renderizarLivros();
    mostrarMensagem("Exemplos salvos no localStorage.", "sucesso");
  } catch (erro) {
    console.error("Falha ao salvar exemplos:", erro);
    mostrarMensagem(erro.message, "erro");
  }
}

function inserirLivrosInvalidos() {
  localStorage.setItem(STORAGE_KEY_LIVROS, "{ livros: quebrados");
  livros = recuperarLivros();
  renderizarLivros();
  mostrarMensagem("Conteúdo inválido inserido na chave biblioteca_livros. Veja o console.", "erro");
}

function limparLivros() {
  localStorage.removeItem(STORAGE_KEY_LIVROS);
  livros = [];
  renderizarLivros();
  mostrarMensagem("Biblioteca limpa.", "info");
}

function executarTeste(nome, acao) {
  try {
    const resultado = acao();
    return {
      nome,
      status: "ok",
      detalhe: typeof resultado === "undefined" ? "Executado sem erro." : String(resultado),
    };
  } catch (erro) {
    return {
      nome,
      status: "erro",
      detalhe: erro.message,
    };
  }
}

function criarLinhaTeste(teste) {
  const item = document.createElement("div");
  const nome = document.createElement("strong");
  const detalhe = document.createElement("span");

  item.classList.add("teste", teste.status);
  nome.textContent = teste.nome;
  detalhe.textContent = teste.detalhe;
  item.append(nome, detalhe);

  return item;
}

function renderizarTestes(container, testes) {
  container.innerHTML = "";
  testes.forEach((teste) => {
    container.appendChild(criarLinhaTeste(teste));
  });
}

function montarTestesValidacoes() {
  const testes = [
    executarTeste("validarNome(' Ana Maria ')", () => validarNome(" Ana Maria ")),
    executarTeste("validarNome('')", () => validarNome("")),
    executarTeste("validarNome('Al')", () => validarNome("Al")),
    executarTeste("validarIdade('34')", () => validarIdade("34")),
    executarTeste("validarIdade('abc')", () => validarIdade("abc")),
    executarTeste("validarIdade('-1')", () => validarIdade("-1")),
    executarTeste("validarIdade('121')", () => validarIdade("121")),
    executarTeste("validarEmail('ANA@EXEMPLO.COM')", () => validarEmail("ANA@EXEMPLO.COM")),
    executarTeste("validarEmail('ana.com')", () => validarEmail("ana.com")),
    executarTeste("validarEmail('ana @email.com')", () => validarEmail("ana @email.com")),
  ];

  renderizarTestes(testesValidacoes, testes);
}

function montarTestesCalculadora() {
  const testes = [
    executarTeste("calcular(4, 2, 'soma')", () => calcular(4, 2, "soma")),
    executarTeste("calcular(4, 2, 'subtracao')", () => calcular(4, 2, "subtracao")),
    executarTeste("calcular(4, 2, 'multiplicacao')", () => calcular(4, 2, "multiplicacao")),
    executarTeste("calcular(4, 2, 'divisao')", () => calcular(4, 2, "divisao")),
    executarTeste("calcular('abc', 2, 'soma')", () => calcular("abc", 2, "soma")),
    executarTeste("calcular(4, 2, 'potencia')", () => calcular(4, 2, "potencia")),
    executarTeste("calcular(4, 0, 'divisao')", () => calcular(4, 0, "divisao")),
  ];

  renderizarTestes(testesCalculadora, testes);
}

function prepararTestePreferencia(tipo) {
  if (tipo === "ausente") {
    localStorage.removeItem(STORAGE_KEY_PREFERENCIAS);
  }

  if (tipo === "valido") {
    localStorage.setItem(
      STORAGE_KEY_PREFERENCIAS,
      JSON.stringify({
        tema: "escuro",
        tamanhoFonte: 18,
        notificacoes: false,
      })
    );
  }

  if (tipo === "quebrado") {
    localStorage.setItem(STORAGE_KEY_PREFERENCIAS, "{ tema: escuro");
  }

  if (tipo === "array") {
    localStorage.setItem(STORAGE_KEY_PREFERENCIAS, JSON.stringify(["escuro", 18, true]));
  }

  const preferencias = recuperarPreferencias();
  previewPreferencias.textContent = JSON.stringify(preferencias, null, 2);
}

function iniciarAplicacao() {
  const elementosEssenciais = [
    formLivro,
    inputTitulo,
    inputAutor,
    inputAno,
    inputPaginas,
    btnCadastrar,
    mensagemFormulario,
    listaLivros,
    totalLivros,
    totalPaginas,
    btnExemplos,
    btnCorromper,
    btnLimpar,
    testesValidacoes,
    testesCalculadora,
    previewPreferencias,
  ];

  if (!elementosEssenciais.every(Boolean)) {
    console.error("A aplicação não iniciou porque há elementos essenciais ausentes no HTML.");
    return;
  }

  livros = recuperarLivros();
  renderizarLivros();
  montarTestesValidacoes();
  montarTestesCalculadora();
  prepararTestePreferencia("ausente");

  formLivro.addEventListener("submit", cadastrarLivro);
  btnExemplos.addEventListener("click", carregarLivrosDeExemplo);
  btnCorromper.addEventListener("click", inserirLivrosInvalidos);
  btnLimpar.addEventListener("click", limparLivros);

  botoesPreferencia.forEach((botao) => {
    botao.addEventListener("click", () => {
      prepararTestePreferencia(botao.dataset.testePreferencia);
    });
  });
}

window.exerciciosTratamentoErros = {
  validarNome,
  validarIdade,
  validarEmail,
  calcular,
  recuperarPreferencias,
  recuperarLivros,
  salvarLivros,
  renderizarLivros,
};

iniciarAplicacao();
