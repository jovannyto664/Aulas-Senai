export default function Nota({ disciplina, nota }) {
  return (
    <article className="info-card nota-card">
      <h3>{disciplina}</h3>
      <p>Nota: {nota}</p>
    </article>
  )
}
