const formulario = document.getElementById("formItem")
const pesquisa = document.getElementById("pesquisa")
const filtroCat = document.getElementById("filtroCategoria")
const filtroTipo = document.getElementById("filtroTipo")
const filtroSituacao = document.querySelector("#filtroSituacao")
const mensagem = document.getElementById("mensagem")
const listaItens = document.getElementById("listaItens")
formulario.addEventListener("submit", (event) =>{
    event.preventDefault()
})

