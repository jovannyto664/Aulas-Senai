"use strict";

const entradaJson = document.querySelector("#entrada-json");
const btnLer = document.querySelector("#btn-ler");

const nomePersonagem = document.querySelector("#nome-personagem");
const nivelPersonagem = document.querySelector("#nivel-personagem");
const mensagem = document.querySelector("#mensagem");

btnLer.addEventListener("click", function() {
  try {
    const texto = entradaJson.value.trim();

    if (texto === "") {
      throw new Error("Digite um JSON antes de ler.");
    }

    const personagem = JSON.parse(texto);

    if (personagem === null || typeof personagem !== "object" || Array.isArray(personagem)) {
      throw new Error("O JSON precisa representar um objeto.");
    }

    if (typeof personagem.nome !== "string" || personagem.nome.trim() === "") {
      throw new Error("O nome do personagem é obrigatório.");
    }

    const nivel = Number(personagem.nivel);

    if (!Number.isInteger(nivel) || nivel <= 0) {
      throw new Error("O nível precisa ser um número inteiro maior que 0.");
    }

    nomePersonagem.textContent = personagem.nome.trim();
    nivelPersonagem.textContent = String(nivel);
    mensagem.textContent = "Personagem carregado com sucesso.";
    mensagem.className = "mensagem sucesso";
  } catch (erro) {
    nomePersonagem.textContent = "Nenhum personagem";
    nivelPersonagem.textContent = "-";
    mensagem.textContent = "Erro: " + erro.message;
    mensagem.className = "mensagem erro";
    console.error(erro);
  }
});
