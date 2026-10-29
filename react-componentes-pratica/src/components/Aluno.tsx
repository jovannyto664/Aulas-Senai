export default function Aluno({ nome, turma }: { nome: string; turma: number }) {
  return (
    <div>
      <p>{nome}</p>
      <p>{turma}</p>
    </div>
  )
}