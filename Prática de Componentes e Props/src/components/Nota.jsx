export default function Nota({ disciplina, nota }) {
  return (
    <article className="grade-card">
      <h3>{disciplina}</h3>
      <p>
        Nota: <strong>{nota}</strong>
      </p>
    </article>
  )
}
