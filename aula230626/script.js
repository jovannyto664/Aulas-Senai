const caixa2 = document.querySelector(".caixa-quadrada")
caixa2.style.backgroundColor = "blue"
caixa2.style.width = "250px"
caixa2.style.border = "5px solid black"

const butao = document.querySelector("#btn-alerta")
const paranaue = document.querySelector("#mensagem")
butao.addEventListener("click", () => { document.body.classList.toggle("modo-perigo") })

const campoSenha = document.querySelector("#campo-senha")

document.querySelector("#btn-validar").addEventListener("click", () => {
    if (campoSenha.value.length < 8) {
        campoSenha.classList.add("borda-erro")
        campoSenha.classList.remove("borda-sucesso")
        console.log(campoSenha.value, campoSenha.value.length)
    } else {
        campoSenha.classList.add("borda-sucesso")
        campoSenha.classList.remove("borda-erro")
    }
})

/*const gold = window.getComputedStyle(document.querySelector(".caixa-responsiva"))
document.querySelector("#texto-largura").innerHTML = 'A largura atual é: '+gold.width */
document.querySelector("#texto-largura").innerHTML = 'A largura atual é: ' + window.getComputedStyle(document.querySelector(".caixa-responsiva")).width


const caixota = document.querySelector("#meu-card") && document.querySelector(".card-padrao")
document.querySelector("#btn-azul").addEventListener("click", () => {
    caixota.style.backgroundColor = "blue"
})
document.querySelector("#btn-classe-sucesso").addEventListener("click", () => {
    caixota.classList.add("fundo-sucesso")
})
document.querySelector("#btn-limpar").addEventListener("click", () => {
    caixota.style.backgroundColor = ""
})