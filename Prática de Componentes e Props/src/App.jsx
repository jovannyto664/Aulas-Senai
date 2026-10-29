import Aluno from './components/Aluno.jsx'
import Nota from './components/Nota.jsx'
import Produto from './components/Produto.jsx'
import Titulo from './components/Titulo.jsx'
import './App.css'

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
  {
    nome: 'Teclado Mecânico',
    descricao: 'Teclado com iluminação RGB e switches confortáveis.',
    preco: 250,
    disponivel: true,
  },
  {
    nome: 'Mouse sem Fio',
    descricao: 'Mouse leve com sensor de alta precisão.',
    preco: 120,
    disponivel: true,
  },
  {
    nome: 'Headset',
    descricao: 'Headset com microfone integrado e som imersivo.',
    preco: 180,
    disponivel: false,
  },
  {
    nome: 'Monitor Full HD',
    descricao: 'Monitor de 24 polegadas com resolução Full HD.',
    preco: 850,
    disponivel: true,
  },
]

function App() {
  return (
    <main className="page">
      <Titulo />

      <section className="content-section" aria-labelledby="alunos-title">
        <div className="section-heading">
          <p className="eyebrow">Etapa 3</p>
          <h2 id="alunos-title">Alunos</h2>
        </div>
        <div className="people-grid">
          {alunos.map((aluno) => (
            <Aluno
              key={aluno.nome}
              nome={aluno.nome}
              turma={aluno.turma}
            />
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="notas-title">
        <div className="section-heading">
          <p className="eyebrow">Etapa 4</p>
          <h2 id="notas-title">Notas</h2>
        </div>
        <div className="people-grid">
          {notas.map((item) => (
            <Nota
              key={item.disciplina}
              disciplina={item.disciplina}
              nota={item.nota}
            />
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="produtos-title">
        <div className="section-heading">
          <p className="eyebrow">Etapas 5 e 6</p>
          <h2 id="produtos-title">Produtos</h2>
          <p className="section-description">
            Um mesmo componente recebe informações diferentes por meio de props.
          </p>
        </div>
        <div className="products-grid">
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
    </main>
  )
}

export default App
