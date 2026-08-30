document.addEventListener("DOMContentLoaded", () => {
    const campoNome = document.querySelector("#nome");
    const campoTema = document.querySelector("#tema");
    const campoLinguagem = document.querySelector("#linguagem");
    const campoObservacao = document.querySelector("#observacao");
    const botaoSalvar = document.querySelector("#btn-salvar");
    const botaoApagar = document.querySelector("#btn-apagar");
    const resumoJSON = document.querySelector("#resumoJSON");

    const chavePreferencias = "preferenciasUsuario";

    function atualizarResumo(preferencias) {
        resumoJSON.textContent = "";

        const dadosResumo = [
            ["Usuário", preferencias.nome || "Não informado"],
            ["Tema escolhido", preferencias.tema || "Não informado"],
            ["Linguagem favorita", preferencias.linguagem || "Não informada"],
            ["Observação", preferencias.observacao || "Nenhuma observação salva"]
        ];

        dadosResumo.forEach((dado) => {
            const paragrafo = document.createElement("p");
            const destaque = document.createElement("strong");

            destaque.textContent = `${dado[0]}: `;
            paragrafo.append(destaque, dado[1]);
            resumoJSON.append(paragrafo);
        });
    }

    function limparCampos() {
        campoNome.value = "";
        campoTema.value = "";
        campoLinguagem.value = "";
        campoObservacao.value = "";
        resumoJSON.innerHTML = "<p>Nenhuma preferência salva ainda.</p>";
    }

    botaoSalvar.addEventListener("click", () => {
        const preferencias = {
            nome: campoNome.value.trim(),
            tema: campoTema.value.trim(),
            linguagem: campoLinguagem.value,
            observacao: campoObservacao.value.trim()
        };

        const preferenciasJSON = JSON.stringify(preferencias);

        localStorage.setItem(chavePreferencias, preferenciasJSON);
        atualizarResumo(preferencias);
    });

    botaoApagar.addEventListener("click", () => {
        localStorage.removeItem(chavePreferencias);
        limparCampos();
        campoNome.focus();
    });

    const preferenciasSalvas = localStorage.getItem(chavePreferencias);

    if (preferenciasSalvas !== null) {
        const preferenciasRecuperadas = JSON.parse(preferenciasSalvas);

        campoNome.value = preferenciasRecuperadas.nome || "";
        campoTema.value = preferenciasRecuperadas.tema || "";
        campoLinguagem.value = preferenciasRecuperadas.linguagem || "";
        campoObservacao.value = preferenciasRecuperadas.observacao || "";

        atualizarResumo(preferenciasRecuperadas);
    }
});
