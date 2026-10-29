const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function Produto({ nome, descricao, preco, disponivel }) {
  return (
    <article className="product-card">
      <div className="product-heading">
        <h3>{nome}</h3>
        <span
          className={`availability ${disponivel ? 'available' : 'unavailable'}`}
        >
          {disponivel ? 'Disponível' : 'Indisponível'}
        </span>
      </div>
      <p className="product-description">{descricao}</p>
      <p className="product-price">{currencyFormatter.format(preco)}</p>
      <button type="button" className="buy-button">
        Comprar
      </button>
    </article>
  )
}
