const botao = document.querySelector("#botao")
function tratarClique() {
    alert("o botao foi clicado com sucesso")
    console.log('O botão foi clicado com sucesso!');
}
botao.addEventListener("click", tratarClique)
function bonus() {
    alert("bonus")
    document.querySelector("#ativarBonus").removeEventListener("click", bonus)
}
document.querySelector("#ativarBonus").addEventListener("click", bonus, () => {
    document.querySelector("#ativarBonus").removeEventListener("click", bonus)
})
const informante = document.querySelector('#informante')
informante.addEventListener("click", (e) => {
    alert(e.target)
    alert(e.currentTarget)
})
document.querySelector("ul").addEventListener("click", () => {
    document.body.style.backgroundColor = "red";
})  
document.querySelector("#excluir").addEventListener("click", ()=>{alert("elemento removido")})

const form = document.getElementById('meuFormulario');

form.addEventListener('submit', function(event) {
  // 1. Impede o comportamento padrão de recarregar a página
  event.preventDefault();
  
  // 2. Captura os dados usando a API FormData (lê os atributos 'name' do HTML)
  const formData = new FormData(event.currentTarget);
  
  // 3. Converte as entradas do formulário diretamente em um objeto literal
  const dadosDoFormulario = Object.fromEntries(formData);
  
  // 4. Exibe o objeto estruturado no console do navegador
  console.log(dadosDoFormulario);
});
