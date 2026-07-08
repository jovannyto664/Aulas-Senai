const heroi = {
  nome: "Aragon",
  nivel: 1,
  energia: 100
};
heroi.treinar = function() {
  this.nivel += 1; // Aumenta o nível em 1
  this.energia -= 20; // Diminui a energia em 20
  console.log("Treino concluído! Nível atual: " + this.nivel);
};

heroi.treinar = function() {
    if (this.energia >= 20) {
        this.nivel++;
        this.energia -= 20;
    } else {
        console.log("Cansaço extremo! O herói precisa descansar.");
    }
}
console.log(heroi);
heroi.treinar(); // Chama o método de treino
console.log(heroi);