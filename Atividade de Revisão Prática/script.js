// Seletores principais usados para manipular o DOM.
const textoDestaque = document.getElementById("textoDestaque");
const btnAlterarTexto = document.getElementById("btnAlterarTexto");
const btnMostrarCuriosidade = document.getElementById("btnMostrarCuriosidade");
const secaoCuriosidade = document.getElementById("secaoCuriosidade");
const btnEstilo = document.getElementById("btnEstilo");
const blocoTexto = document.querySelector(".bloco-texto");
const novoMotivo = document.getElementById("novoMotivo");
const listaMotivos = document.getElementById("listaMotivos");
const btnAdicionarMotivo = document.getElementById("btnAdicionarMotivo");
const btnContador = document.getElementById("btnContador");
const contadorCliques = document.getElementById("contadorCliques");
const imagemHobby = document.getElementById("imagemHobby");
const legendaImagem = document.getElementById("legendaImagem");
const btnTrocarImagem = document.getElementById("btnTrocarImagem");
const nomeUsuario = document.getElementById("nomeUsuario");
const btnSaudacao = document.getElementById("btnSaudacao");
const mensagemSaudacao = document.getElementById("mensagemSaudacao");
const btnTema = document.getElementById("btnTema");
const btnResetar = document.getElementById("btnResetar");

const imagemNiko = "oneshot-from-niko.png";
const imagemWorldMachine = "oneshot-world-machine.png";
const textoOriginal = "OneShot não é o jogo que eu mais jogo, mas é o que eu mais amo pelo quanto ele é incrível.";
const motivosOriginais = listaMotivos.innerHTML;

let totalMomentos = 0;
let imagemAtual = "niko";
let textoAlterado = false;

btnAlterarTexto.addEventListener("click", function () {
    if (textoAlterado) {
        textoDestaque.textContent = textoOriginal;
        textoAlterado = false;
    } else {
        textoDestaque.textContent = "Jogar videogame é meu hobby, e OneShot é uma daquelas experiências que ficam guardadas na memória.";
        textoAlterado = true;
    }
});

btnMostrarCuriosidade.addEventListener("click", function () {
    secaoCuriosidade.classList.toggle("oculto");
});

btnEstilo.addEventListener("click", function () {
    blocoTexto.classList.toggle("destacado");

    if (blocoTexto.classList.contains("destacado")) {
        blocoTexto.style.backgroundColor = "#fff5d8";
        blocoTexto.style.fontSize = "1.04rem";
    } else {
        blocoTexto.style.backgroundColor = "";
        blocoTexto.style.fontSize = "";
    }
});

btnAdicionarMotivo.addEventListener("click", function () {
    const textoDigitado = novoMotivo.value.trim();

    if (textoDigitado === "") {
        novoMotivo.style.borderColor = "#c94f7c";
        novoMotivo.placeholder = "Digite um motivo antes de adicionar";
        return;
    }

    const novoItem = document.createElement("li");
    novoItem.textContent = textoDigitado;
    listaMotivos.appendChild(novoItem);

    novoMotivo.value = "";
    novoMotivo.style.borderColor = "";
    novoMotivo.placeholder = "Ex: a trilha sonora é inesquecível";
});

btnContador.addEventListener("click", function () {
    totalMomentos++;
    contadorCliques.textContent = totalMomentos;
});

btnTrocarImagem.addEventListener("click", function () {
    if (imagemAtual === "niko") {
        imagemHobby.src = imagemWorldMachine;
        imagemHobby.alt = "Imagem de OneShot mostrando The World Machine";
        legendaImagem.textContent = "The World Machine reforça o lado misterioso e único de OneShot.";
        imagemAtual = "worldMachine";
    } else {
        imagemHobby.src = imagemNiko;
        imagemHobby.alt = "Imagem de OneShot com Niko";
        legendaImagem.textContent = "OneShot me marcou pela história, pela atmosfera e pelo carinho nos detalhes.";
        imagemAtual = "niko";
    }
});

btnSaudacao.addEventListener("click", function () {
    const nome = nomeUsuario.value.trim();

    if (nome === "") {
        mensagemSaudacao.textContent = "Digite seu nome para receber a saudação.";
        return;
    }

    mensagemSaudacao.innerHTML = "Olá, <strong></strong>! Seja bem-vindo à minha página sobre jogos e OneShot!";
    mensagemSaudacao.querySelector("strong").textContent = nome;
});

btnTema.addEventListener("click", function () {
    document.body.classList.toggle("tema-escuro");
});

btnResetar.addEventListener("click", function () {
    totalMomentos = 0;
    imagemAtual = "niko";
    textoAlterado = false;

    contadorCliques.textContent = "0";
    textoDestaque.textContent = textoOriginal;
    secaoCuriosidade.classList.add("oculto");
    blocoTexto.classList.remove("destacado");
    blocoTexto.style.backgroundColor = "";
    blocoTexto.style.fontSize = "";
    imagemHobby.src = imagemNiko;
    imagemHobby.alt = "Imagem de OneShot com Niko";
    legendaImagem.textContent = "OneShot me marcou pela história, pela atmosfera e pelo carinho nos detalhes.";
    listaMotivos.innerHTML = motivosOriginais;
    nomeUsuario.value = "";
    novoMotivo.value = "";
    mensagemSaudacao.textContent = "";
    novoMotivo.style.borderColor = "";
    novoMotivo.placeholder = "Ex: a trilha sonora é inesquecível";
});
