const botaoImprimir = document.getElementById("btnImprimir");

if (botaoImprimir) {
  botaoImprimir.addEventListener("click", () => {
    window.print();
  });
}
