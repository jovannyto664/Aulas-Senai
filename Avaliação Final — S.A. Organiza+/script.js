// 1. Carrega as tarefas do localStorage ou inicia com uma lista vazia
let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Elementos do DOM
const inputTexto = document.getElementById("textoAdd");
const elementoMensagem = document.getElementById("mensagem");
const elementoLista = document.getElementById("listaTarefas");

// Função para salvar a lista atualizada no localStorage
function salvarNoLocalStorage() {
  // localStorage só armazena texto (String), por isso usamos JSON.stringify
  localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
}

// Função para renderizar/atualizar a lista na página
function renderizarTarefas() {
  elementoLista.innerHTML = ""; // Limpa a lista na tela antes de redesenhar

  listaTarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.id = `tarefa-${tarefa.id}`;

    // Span com o título da tarefa
    const spanTitulo = document.createElement("span");
    spanTitulo.innerText = tarefa.titulo;

    // Checkbox de conclusão
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;

    // Evento ao marcar/desmarcar a tarefa
    checkbox.addEventListener("change", () => {
      tarefa.concluida = checkbox.checked;
      salvarNoLocalStorage();
    });

    li.appendChild(checkbox);
    li.appendChild(spanTitulo);
    elementoLista.appendChild(li);
  });
}

// Função chamada ao clicar no botão de cadastrar/adicionar
function addTarefa() {
  const texto = inputTexto.value.trim();

  // 1. Verificar se o campo não está vazio
  if (texto === "") {
    // Apresenta mensagem de orientação se o título não for informado
    elementoMensagem.innerText = "Por favor, informe o título da tarefa antes de adicionar.";
    elementoMensagem.style.color = "red";
    inputTexto.focus();
    return;
  }

  // Limpa mensagem de erro caso estivesse visível
  elementoMensagem.innerText = "";

  // 2. Criar um objeto representando a tarefa
  const novaTarefa = {
    id: Date.now(), // Gera um ID único baseado no timestamp
    titulo: texto,
    concluida: false,
  };

  // 3. Adicionar o objeto à estrutura de dados (Array)
  listaTarefas.push(novaTarefa);

  // 4. Salvar os dados no localStorage
  salvarNoLocalStorage();

  // 5. Atualizar a lista exibida na página
  renderizarTarefas();

  // 6. Limpar o campo de digitação e focar nele novamente
  inputTexto.value = "";
  inputTexto.focus();
}

// Renderiza as tarefas salvas assim que a página é carregada
renderizarTarefas();

