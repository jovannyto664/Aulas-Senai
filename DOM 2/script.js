const linguagens = [
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "PHP"
];

const produtos = [
    { nome: "Notebook", preco: "R$ 3500" },
    { nome: "Mouse Gamer", preco: "R$ 150" },
    { nome: "Teclado Mecanico", preco: "R$ 300" }
];

// Atividade 1
const titulo = document.querySelector("#container h1");
const pai = titulo.parentElement;
const proximoIrmao = titulo.nextElementSibling;
const filhos = pai.children;
const ultimoFilho = pai.lastElementChild;
const resultados = document.querySelector("#resultados");

const listaDeFilhos = Array.from(filhos)
    .map((filho) => `${filho.tagName.toLowerCase()} - ${filho.textContent}`)
    .join(", ");

const respostas = [
    `Elemento selecionado: ${titulo.tagName.toLowerCase()} - ${titulo.textContent}`,
    `Pai do h1: ${pai.tagName.toLowerCase()}#${pai.id}`,
    `Proximo irmao: ${proximoIrmao.tagName.toLowerCase()} - ${proximoIrmao.textContent}`,
    `Filhos da div: ${listaDeFilhos}`,
    `Quantidade de filhos da div: ${filhos.length}`,
    `Ultimo filho da div: ${ultimoFilho.tagName.toLowerCase()} - ${ultimoFilho.textContent}`
];

respostas.forEach((resposta) => {
    const item = document.createElement("li");
    item.textContent = resposta;
    resultados.appendChild(item);
});

console.log("h1:", titulo);
console.log("Pai:", pai);
console.log("Proximo irmao:", proximoIrmao);
console.log("Filhos da div:", filhos);
console.log("Quantidade de filhos:", filhos.length);
console.log("Ultimo filho:", ultimoFilho);

// Atividade 2
const areaElementosCriados = document.querySelector("#elementos-criados");
const tituloCriado = document.createElement("h1");
const paragrafoCriado = document.createElement("p");

tituloCriado.textContent = "Titulo criado com JavaScript";
paragrafoCriado.textContent = "Este paragrafo tambem foi criado dinamicamente.";

areaElementosCriados.appendChild(tituloCriado);
areaElementosCriados.appendChild(paragrafoCriado);

// Atividade 3
const listaContainer = document.querySelector("#lista-container");
const listaLinguagens = document.createElement("ul");

linguagens.forEach((linguagem) => {
    const item = document.createElement("li");
    item.textContent = linguagem;
    listaLinguagens.appendChild(item);
});

listaContainer.appendChild(listaLinguagens);

// Atividade 4
const produtosContainer = document.querySelector("#produtos");

produtos.forEach((produto) => {
    const card = document.createElement("div");
    const nome = document.createElement("h2");
    const preco = document.createElement("p");

    card.classList.add("card");
    nome.textContent = produto.nome;
    preco.textContent = produto.preco;

    card.appendChild(nome);
    card.appendChild(preco);
    produtosContainer.appendChild(card);
});

// Atividade 5
const inputTarefa = document.querySelector("#tarefa");
const botaoAdicionar = document.querySelector("#adicionar");
const listaTarefas = document.querySelector("#lista");
const aviso = document.querySelector("#aviso");

function adicionarTarefa() {
    const textoDigitado = inputTarefa.value.trim();

    if (textoDigitado === "") {
        aviso.textContent = "Digite uma tarefa antes de adicionar.";
        inputTarefa.focus();
        return;
    }

    const item = document.createElement("li");
    item.textContent = textoDigitado;
    item.title = "Clique para remover";

    item.addEventListener("click", () => {
        item.remove();
    });

    listaTarefas.appendChild(item);
    inputTarefa.value = "";
    aviso.textContent = "";
    inputTarefa.focus();
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});
