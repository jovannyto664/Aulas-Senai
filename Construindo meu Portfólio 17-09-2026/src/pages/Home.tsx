function Home() {
  return (
    <main className="portfolio-page">
      <section className="hero-card">
        <span className="eyebrow">Portfólio pessoal</span>
        <h1>Olá, eu sou Jeovanny Alves Almeida</h1>
        <p className="lead">
          Sou estudante de desenvolvimento de sistemas, apaixonado por
          JavaScript, TypeScript, React e pela criação de soluções digitais.
        </p>

        <div className="info-grid">
          <article className="info-card">
            <h2>Cidade</h2>
            <p>Palhoça</p>
          </article>

          <article className="info-card">
            <h2>Foco</h2>
            <p>Desenvolvimento web e programação moderna</p>
          </article>
        </div>
      </section>

      <section className="highlight-panel">
        <h2>Áreas de interesse</h2>
        <ul className="tag-list">
          <li>JavaScript</li>
          <li>TypeScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Python</li>
          <li>C++</li>
          <li>Machine Learning</li>
        </ul>
      </section>
    </main>
  );
}

export default Home;