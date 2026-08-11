// 1. ELEMENTOS DO DOM
const inputTitulo = document.querySelector("#input-titulo");
const btnAdd = document.querySelector("#btn-adicionar");
const listaFilmes = document.querySelector("#lista-filmes");
const mensagem = document.querySelector("#mensagem");

// 2. ESTADO DA APLICAÇÃO
let filmes = [];

// 3. FUNÇÕES
function salvarFilmes() {
  localStorage.setItem("meus_filmes", JSON.stringify(filmes));
}

function carregarFilmes() {
  const filmesSalvos = localStorage.getItem("meus_filmes");

  if (filmesSalvos) {
    filmes = JSON.parse(filmesSalvos);
  }
}

function adicionarFilme() {
  const titulo = inputTitulo.value.trim();

  if (titulo === "") {
    mensagem.textContent = "Digite um título!";
    mensagem.className = "mensagem erro";
    return;
  }

  const novoFilme = {
    id: Date.now(),
    titulo: titulo,
    assistido: false,
  };

  filmes.push(novoFilme);
  salvarFilmes();

  inputTitulo.value = "";
  mensagem.textContent = "Filme adicionado com sucesso!";
  mensagem.className = "mensagem sucesso";

  renderizarFilmes();
  inputTitulo.focus();
}

function alternarAssistido(id) {
  const filme = filmes.find(function (filme) {
    return filme.id === id;
  });

  if (!filme) {
    return;
  }

  filme.assistido = !filme.assistido;
  salvarFilmes();
  renderizarFilmes();
}

function excluirFilme(id) {
  filmes = filmes.filter(function (filme) {
    return filme.id !== id;
  });

  salvarFilmes();
  mensagem.textContent = "Filme excluído.";
  mensagem.className = "mensagem sucesso";
  renderizarFilmes();
}

function renderizarFilmes() {
  listaFilmes.innerHTML = "";

  filmes.forEach(function (filme) {
    const li = document.createElement("li");
    li.className = "filme";

    if (filme.assistido) {
      li.classList.add("assistido");
    }

    const span = document.createElement("span");
    span.className = "titulo-filme";
    span.textContent = filme.titulo;

    const btnStatus = document.createElement("button");
    btnStatus.className = "btn-status";
    btnStatus.textContent = filme.assistido ? "Não assistido" : "Assistido";
    btnStatus.addEventListener("click", function () {
      alternarAssistido(filme.id);
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn-excluir";
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", function () {
      excluirFilme(filme.id);
    });

    li.appendChild(span);
    li.appendChild(btnStatus);
    li.appendChild(btnExcluir);
    listaFilmes.appendChild(li);
  });
}

// 4. EVENTOS
btnAdd.addEventListener("click", adicionarFilme);

inputTitulo.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionarFilme();
  }
});

// 5. INICIALIZAÇÃO
carregarFilmes();
renderizarFilmes();
