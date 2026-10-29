import './App.css'
import Titulo from './components/Titulo'
import Aluno from './components/Aluno'
import Nota from './components/Nota'
import Produto from './components/Produto'

const alunos = [
  { nome: 'Carlos', turma: 'Desenvolvimento de Sistemas' },
  { nome: 'Ana', turma: 'Desenvolvimento de Sistemas' },
  { nome: 'Pedro', turma: 'Desenvolvimento de Sistemas' },
]

const notas = [
  { disciplina: 'React', nota: 8.5 },
  { disciplina: 'JavaScript', nota: 9.2 },
  { disciplina: 'CSS', nota: 7.8 },
]

const produtos = [
  { nome: 'Teclado Mecânico', descricao: 'Teclado com iluminação RGB', preco: 250, disponivel: true },
  { nome: 'Mouse Gamer', descricao: 'Mouse sem fio com sensor preciso', preco: 120, disponivel: true },
  { nome: 'Headset', descricao: 'Headset com microfone e som imersivo', preco: 180, disponivel: false },
  { nome: 'Monitor Full HD', descricao: 'Monitor de 24 polegadas com ótimo contraste', preco: 850, disponivel: true },
]

function App() {
  return (
    <div className="app">
      <Titulo />

      <section className="section-block">
        <h2>Alunos</h2>
        <div className="card-list alunos-list">
          {alunos.map((aluno) => (
            <Aluno key={aluno.nome} nome={aluno.nome} turma={aluno.turma} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Notas</h2>
        <div className="card-list notas-list">
          {notas.map((item) => (
            <Nota key={item.disciplina} disciplina={item.disciplina} nota={item.nota} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>Produtos</h2>
        <div className="produtos-grid">
          {produtos.map((produto) => (
            <Produto
              key={produto.nome}
              nome={produto.nome}
              descricao={produto.descricao}
              preco={produto.preco}
              disponivel={produto.disponivel}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
