const personagem = {
    nome: "carlinhos",
    vida: 2000,
    energia: 500,
    nivel: 675,
    ouro: 43278146986,
    inventário: ["espada", "escudo", "poção de cura"],
    atacar() {
        this.energia -= 15
        console.log("ataque realizado, energia atual: " + this.energia);
    },
    treinar() {
        this.nivel += 1
        this.energia -= 20
        console.log("treino concluído, nível atual: " + this.nivel);
    },
    descançar() {
        if (this.energia < 100) {
            this.energia += 50;
            console.log("descanso concluído, energia atual: " + this.energia);
        } if (this.energia >= 100) {
            console.log("energia já está cheia, não é necessário descansar.");
        }
    },
    comprarpotions() {
        if (this.ouro >= 1000) {
            this.ouro -= 1000;
            this.energia += 100;
            console.log("poção comprada, energia atual: " + this.energia + ", ouro restante: " + this.ouro);
        } else {
            console.log("ouro insuficiente para comprar poção.");
        }
    },
    adicionarItem(item) {
        this.inventário.push(item);
        console.log("item " + item + " adicionado ao inventário.");
    }
}
personagem.treinar()
personagem.atacar()
personagem.descançar()
personagem.comprarpotions()
personagem.adicionarItem("flamingo dourado")
console.log(personagem);