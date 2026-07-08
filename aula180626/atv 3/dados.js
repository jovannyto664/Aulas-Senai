const linguagens = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "PHP"
];

console.log("Teste");


const lista = document.createElement("ul")

for (let i = 0; i < linguagens.length; i++) {
    const lista2 = document.createElement("li")
    lista2.innerText = linguagens[i];
    lista.appendChild(lista2)
}

document.getElementById("lista-container").appendChild(lista)

    