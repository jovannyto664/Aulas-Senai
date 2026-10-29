export default function Aluno({ nome, turma }) {
  return (
    <article className="info-card aluno-card">
      <h3>{nome}</h3>
      <p>Turma: {turma}</p>
    </article>
  )
}
