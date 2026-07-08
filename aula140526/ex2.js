const conta = {
    dono: "dsdsadsdsasd",
    saldo: 214693438,
    depositar(valor) {
        this.saldo = this.saldo + valor
        console.log("seu saldo agora é R$: " + this.saldo);
    },
    sacar(valor) {
        if (valor > this.saldo) {
            "Saldo insuficiente."
        } else {
            this.saldo = this.saldo - valor
            console.log('valor sacado, seu saldo agora é R$: ' + this.saldo);
        }
    },
    verSaldo() {
        console.log(this.saldo);
    }
}
conta.verSaldo()
conta.depositar(314)
conta.sacar(10000000)