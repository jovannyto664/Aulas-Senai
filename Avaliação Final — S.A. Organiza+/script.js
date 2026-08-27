let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const inputTexto = document.getElementById("textoAdd");
const elementoMensagem = document.getElementById("mensagem");
const elementoLista = document.getElementById("listaTarefas");
const contador = document.querySelector("#contador");
const pendentes = document.querySelector(".pendentes");
const total = document.querySelector(".total");
const concluidos = document.querySelector(".concluidos");
const excluirConcluidas = document.querySelector("#excluirCon");
let contadorP = 0;
let contadorC = 0;

function contarPendentes() {
  pendentes.textContent = listaTarefas.filter(
    (tarefa) => !tarefa.concluida,
  ).length;
}

function contarConcluidos() {
  const tarefasConcluidas = listaTarefas.filter((tarefa) => tarefa.concluida);
  concluidos.textContent = tarefasConcluidas.length;
}
function salvarNoLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
}

function renderizarTarefas() {
  elementoLista.innerHTML = "";

  listaTarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.id = `tarefa-${tarefa.id}`;

    const spanTitulo = document.createElement("span");
    spanTitulo.innerText = tarefa.titulo;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;

    checkbox.addEventListener("change", () => {
      tarefa.concluida = checkbox.checked;
      salvarNoLocalStorage();
      renderizarTarefas();
    });
    const exclusao = document.createElement("button");
    exclusao.innerText = "excluir";
    exclusao.addEventListener("click", () => excluir(tarefa.id));

    li.appendChild(checkbox);
    li.appendChild(spanTitulo);
    li.appendChild(exclusao);
    elementoLista.appendChild(li);
  });
  contarPendentes();
  contarConcluidos();
}

function addTarefa() {
  const texto = inputTexto.value.trim();
  contarPendentes();
  contarConcluidos();
  if (texto === "") {
    elementoMensagem.innerText =
      "Por favor, informe o título da tarefa antes de adicionar.";
    elementoMensagem.style.color = "red";
    inputTexto.focus();
    return;
  }

  elementoMensagem.innerText = "";

  const novaTarefa = {
    id: Date.now(),
    titulo: texto,
    concluida: false,
    exclusao: false,
  };

  listaTarefas.push(novaTarefa);

  salvarNoLocalStorage();

  renderizarTarefas();

  contandoT(total);

  inputTexto.value = "";
  inputTexto.focus();
}

function contandoT(e) {
  e.textContent = listaTarefas.length;
}

function excluir(id) {
  listaTarefas = listaTarefas.filter((tarefa) => tarefa.id !== id);
  salvarNoLocalStorage();
  renderizarTarefas();
  contandoT(total);
  contarPendentes();
  contarConcluidos();
  elementoMensagem.innerText = "Tarefas excluídas com sucesso!";
  elementoMensagem.style.color = "green";
}

function limparTarefasConcluidas() {
  listaTarefas = listaTarefas.filter((tarefa) => !tarefa.concluida);

  salvarNoLocalStorage();
  renderizarTarefas();
  contandoT(total);
  contarPendentes();
  contarConcluidos();
}
excluirConcluidas.addEventListener("click", limparTarefasConcluidas);

renderizarTarefas();
contarPendentes();
contarConcluidos();
contandoT(total);
