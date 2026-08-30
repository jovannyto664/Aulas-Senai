const inputEmail = document.querySelector("#input-email");
const btnGravar = document.querySelector("#btn-gravar");
const feedbackEmail = document.querySelector("#feedback-email");

let pontuacao = 0;
const numCliques = document.querySelector("#num-cliques");
const btnIncremento = document.querySelector("#btn-incremento");
const feedbackCliques = document.querySelector("#feedback-cliques");

const previewUsuario = document.querySelector("#preview-usuario");

const inputNomePet = document.querySelector("#nome-pet");
const inputRacaPet = document.querySelector("#raca-pet");
const btnSalvarPet = document.querySelector("#btn-salvar-pet");
const feedbackPet = document.querySelector("#feedback-pet");

const inputNovoItem = document.querySelector("#novo-item");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaMercadoElemento = document.querySelector("#lista-mercado");
const feedbackLista = document.querySelector("#feedback-lista");

const painelStorage = document.querySelector("#painel-storage");
const listaMercado = [];

const usuario = { id: 101, perfil: "Admin" };
localStorage.setItem("dados_sessao_correto", JSON.stringify(usuario));
previewUsuario.textContent = JSON.stringify(usuario);

const pontuacaoSalva = localStorage.getItem("score_atual");
if (pontuacaoSalva !== null) {
    pontuacao = Number(pontuacaoSalva);
    numCliques.textContent = pontuacao;
}

const listaSalva = localStorage.getItem("itens_sacola");
if (listaSalva !== null) {
    const itensConvertidos = JSON.parse(listaSalva);

    if (Array.isArray(itensConvertidos)) {
        listaMercado.push(...itensConvertidos);
    }
}

function atualizarListaMercado() {
    listaMercadoElemento.innerHTML = "";

    listaMercado.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        listaMercadoElemento.appendChild(li);
    });
}

function atualizarPainelStorage() {
    const dados = {
        user_email: localStorage.getItem("user_email"),
        score_atual: localStorage.getItem("score_atual"),
        dados_sessao_correto: localStorage.getItem("dados_sessao_correto"),
        registro_animal: localStorage.getItem("registro_animal"),
        itens_sacola: localStorage.getItem("itens_sacola"),
    };

    painelStorage.textContent = JSON.stringify(dados, null, 2);
}

btnGravar.addEventListener("click", () => {
    const email = inputEmail.value.trim();

    if (email === "") {
        feedbackEmail.textContent = "Digite um e-mail antes de salvar.";
        return;
    }

    localStorage.setItem("user_email", email);
    feedbackEmail.textContent = `E-mail salvo: ${email}`;
    inputEmail.value = "";
    atualizarPainelStorage();
});

btnIncremento.addEventListener("click", () => {
    pontuacao += 1;
    numCliques.textContent = pontuacao;
    localStorage.setItem("score_atual", String(pontuacao));
    feedbackCliques.textContent = `Pontuacao salva como texto: ${String(pontuacao)}`;
    atualizarPainelStorage();
});

btnSalvarPet.addEventListener("click", () => {
    const nome = inputNomePet.value.trim();
    const raca = inputRacaPet.value.trim();

    if (nome === "" || raca === "") {
        feedbackPet.textContent = "Preencha o nome e a raca do pet.";
        return;
    }

    const pet = {
        nome: nome,
        raca: raca,
    };

    localStorage.setItem("registro_animal", JSON.stringify(pet));
    feedbackPet.textContent = `Pet registrado: ${nome} (${raca})`;
    inputNomePet.value = "";
    inputRacaPet.value = "";
    atualizarPainelStorage();
});

btnAdicionar.addEventListener("click", () => {
    const valor = inputNovoItem.value.trim();

    if (valor === "") {
        feedbackLista.textContent = "Digite um item para adicionar.";
        return;
    }

    listaMercado.push(valor);
    localStorage.setItem("itens_sacola", JSON.stringify(listaMercado));
    inputNovoItem.value = "";
    feedbackLista.textContent = `${valor} foi inserido na lista.`;
    atualizarListaMercado();
    atualizarPainelStorage();
});

atualizarListaMercado();
atualizarPainelStorage();
