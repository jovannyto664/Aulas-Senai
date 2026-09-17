let vetorFds = [];

class carro {
  constructor(marca, modelo, ano, cor) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.cor = cor;
  }

  buzinar() {
    console.log("Bibibiiiiiii");
  }
}

let celta = new carro("chevrolet", "celta", 2012, "prata");
let voyage = new carro("volkswagen", "voyage", 2014, "preto");
let uno = new carro("fiat", "uno", 2015, "branco");
let palio = new carro("fiat", "palio", 2016, "vermelho");

celta.buzinar();
voyage.buzinar();
uno.buzinar();
palio.buzinar();
