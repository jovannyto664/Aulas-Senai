
function notasAlu(lista) {
    let soma = 0
    for(let i = 0; i<lista.length;i++){
        soma = soma + lista[i]
    }
    media = soma/lista.length
    
        if (media >= 7) {
            console.log("aprovado");
        }
        else if (media < 7 && media >= 5) {
            console.log("recuperação");
        }
        else {
            console.log("reprovado");

        }
    }

alunos = [8, 6, 9, 7, 5]
notasAlu([3,7,10,10])