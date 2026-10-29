import Titulo from './components/Titulo'
import Aluno from './components/Aluno'
import Nota from './components/Nota'
import Produto from './components/Produtos'
import './App.css'

function App() {
  return (
    <>
      <Titulo titulo="teste" />
      <Aluno nome="aleandro" turma={12} />
      <Nota disciplina="React" nota={8.5} />
      <Aluno nome="Carlos" turma={12} />
      <Nota disciplina="React" nota={7} />
      <Aluno nome="Moguel" turma={12} />
      <Nota disciplina="React" nota={9} />
      <Produto
        nome="Teclado Mecânico"
        descricao="Teclado com iluminação RGB e switches azuis"
        preco={250}
      /><button>Comprar</button>
      <Produto
        nome="Mouse Gamer"
        descricao="Mouse com sensor de alta precisão e seis botões"
        preco={120}
      /><button>Comprar</button>
      <Produto
        nome="Headset"
        descricao="Headset com microfone integrado e som surround"
        preco={180}
      /><button>Comprar</button>
      <Produto
        nome="Monitor Full HD"
        descricao="Monitor de 24 polegadas com resolução Full HD"
        preco={850}
      /><button>Comprar</button>
    </>
    
  )
}

export default App
