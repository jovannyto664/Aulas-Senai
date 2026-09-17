"use strict";

const inputDividendo = document.querySelector("#dividendo");
const inputDivisor = document.querySelector("#divisor");
const btnCalcular = document.querySelector("#btn-calcular");
const resultado = document.querySelector("#resultado");

btnCalcular.addEventListener("click", function() {
  try {
    const textoDividendo = inputDividendo.value.trim();
    const textoDivisor = inputDivisor.value.trim();
    const dividendo = Number(textoDividendo);
    const divisor = Number(textoDivisor);

    if (textoDividendo === "" || textoDivisor === "") {
      throw new Error("Preencha os dois campos.");
    }

    if (Number.isNaN(dividendo) || Number.isNaN(divisor)) {
      throw new Error("Digite apenas números válidos.");
    }

    if (divisor === 0) {
      throw new Error("Não é possível dividir por zero.");
    }

    const divisao = dividendo / divisor;

    if (!Number.isFinite(divisao)) {
      throw new Error("O resultado da divisão não é válido.");
    }

    resultado.textContent = "Resultado: " + divisao;
    resultado.className = "mensagem sucesso";
  } catch (erro) {
    resultado.textContent = "Erro: " + erro.message;
    resultado.className = "mensagem erro";
    console.error(erro);
  }
});
