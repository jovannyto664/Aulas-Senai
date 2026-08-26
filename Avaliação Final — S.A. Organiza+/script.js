let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const inputTexto = document.getElementById("textoAdd");
const elementoMensagem = document.getElementById("mensagem");
const elementoLista = document.getElementById("listaTarefas");
const contador = document.querySelector("#contador");
const pendentes = document.querySelector(".pendentes");
const total = document.querySelector(".total");
const concluidos = document.querySelector(".concluidos");
let contadorP = 0;
let contadorC = 0;

function excluirCon(e) {}

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
    });
    const exclusao = document.createElement("button");
    exclusao.innerText = "excluir";
    exclusao.addEventListener("click", () => excluir(tarefa.id));

    li.appendChild(checkbox);
    li.appendChild(spanTitulo);
    li.appendChild(exclusao);
    elementoLista.appendChild(li);
  });
}

function addTarefa() {
  const texto = inputTexto.value.trim();
  contandoT(total);

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

  inputTexto.value = "";
  inputTexto.focus();
}

function contandoT(e) {
  e.textContent = listaTarefas.length;
  renderizarTarefas();
}

function excluir(id) {
  listaTarefas = listaTarefas.filter((tarefa) => tarefa.id !== id);
  salvarNoLocalStorage();
  renderizarTarefas();
  elementoMensagem.innerText = "Tarefas excluídas com sucesso!";
  elementoMensagem.style.color = "green";
}

renderizarTarefas();

contandoT(total);
