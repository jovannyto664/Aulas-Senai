export default function Produto({
  nome,
  descricao,
  preco,
}: {
  nome: string
  descricao: string
  preco: number
}) {
  return (
    <article>
      <h2>{nome}</h2>
      <p>{descricao}</p>
      <p>Preço: R$ {preco.toFixed(2)}</p>
    </article>
  )
}