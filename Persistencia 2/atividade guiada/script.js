const campoNome = document.querySelector("#nome");
const campoTelefone = document.querySelector("#telefone");
const botaoSalvar = document.querySelector("#salvar");

botaoSalvar.addEventListener("click", () => {

    const contato = {
        nome: campoNome.value,
        telefone: campoTelefone.value
    };

});

botaoSalvar.addEventListener("click", () => {

    const contato = {
        nome: campoNome.value,
        telefone: campoTelefone.value
    };

    localStorage.setItem(
        "contato_principal",
        JSON.stringify(contato)
    );

});

document.addEventListener("DOMContentLoaded", () => {

    const contatoSalvo = localStorage.getItem("contato_principal");

});

document.addEventListener("DOMContentLoaded", () => {

    const contatoSalvo = localStorage.getItem("contato_principal");

    if (contatoSalvo !== null) {

        const contato = JSON.parse(contatoSalvo);

        campoNome.value = contato.nome;
        campoTelefone.value = contato.telefone;

    }

});