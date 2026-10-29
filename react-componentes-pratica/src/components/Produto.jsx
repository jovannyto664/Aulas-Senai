export default function Produto({ nome, descricao, preco, disponivel }) {
  return (
    <article className="produto-card">
      <div className="produto-topo">
        <h3>{nome}</h3>
        <span className={disponivel ? 'status disponivel' : 'status indisponivel'}>
          {disponivel ? 'Disponível' : 'Indisponível'}
        </span>
      </div>
      <p>{descricao}</p>
      <p className="preco">Preço: R$ {preco.toFixed(2)}</p>
      <button type="button">Comprar</button>
    </article>
  )
}
