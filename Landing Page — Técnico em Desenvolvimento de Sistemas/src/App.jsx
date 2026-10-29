import './App.css'

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Tecnologias', href: '#tecnologias' },
  { label: 'Mercado', href: '#mercado' },
  { label: 'Projetos', href: '#projetos' },
]

const aprendizados = [
  'Lógica de programação',
  'Desenvolvimento web',
  'Frontend',
  'Backend',
  'Banco de dados',
  'APIs',
  'Aplicativos',
  'Versionamento de código',
]

const tecnologias = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Node.js',
  'SQL',
  'Git',
  'GitHub',
]

const areas = [
  'Desenvolvimento Frontend',
  'Desenvolvimento Backend',
  'Desenvolvimento Full Stack',
  'Desenvolvimento de aplicações',
  'Banco de dados',
  'Suporte e manutenção de sistemas',
]

const projetos = [
  'Sistema de cadastro de clientes',
  'Sistema de estoque',
  'Aplicação de agendamentos',
  'Loja virtual',
  'Dashboard administrativo',
  'Aplicativo de tarefas',
]

function App() {
  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <div className="brand">SENAI • Dev Sistemas</div>
          <nav className="menu" aria-label="Menu principal">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Técnico em Desenvolvimento de Sistemas</p>
              <h1>Transforme ideias em soluções digitais.</h1>
              <p className="lead">
                Desenvolva sistemas, aprenda novas tecnologias e construa um futuro
                promissor na área de tecnologia.
              </p>
              <div className="hero-actions">
                <a href="#sobre" className="button primary">
                  Saiba mais
                </a>
                <a href="#projetos" className="button secondary">
                  Ver projetos
                </a>
              </div>
              <ul className="hero-stats" aria-label="Indicadores do curso">
                <li>
                  <strong>+6</strong>
                  <span>meses de aprendizado</span>
                </li>
                <li>
                  <strong>8</strong>
                  <span>áreas de atuação</span>
                </li>
                <li>
                  <strong>100%</strong>
                  <span>prático e aplicado</span>
                </li>
              </ul>
            </div>

            <div className="hero-visual" aria-label="Ilustração do curso">
              <div className="device-card">
                <div className="window-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="device-content">
                  <div className="code-line small" />
                  <div className="code-line large" />
                  <div className="code-line medium" />
                  <div className="mini-cards">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="sobre">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Sobre o curso</p>
              <h2>Aprenda a criar sistemas que resolvem problemas reais.</h2>
            </div>

            <div className="about-grid">
              <div className="about-copy">
                <p>
                  O Desenvolvimento de Sistemas é uma área que combina lógica,
                  criatividade e tecnologia para criar soluções digitais. Em vez de só
                  usar programas prontos, os profissionais dessa área montam sistemas,
                  automatizam processos e desenvolvem ferramentas que ajudam empresas,
                  pessoas e comunidades.
                </p>
                <p>
                  No curso, você aprende a pensar de forma estruturada, construir
                  interfaces, programar regras de negócio, organizar dados e entregar
                  aplicações funcionais. O objetivo é formar pessoas capazes de criar,
                  manter e evoluir sistemas digitais com qualidade.
                </p>
              </div>

              <div className="about-card">
                <h3>O que um profissional faz?</h3>
                <ul>
                  <li>Cria páginas e sistemas web</li>
                  <li>Organiza informações em bancos de dados</li>
                  <li>Desenvolve e integra APIs</li>
                  <li>Ajuda a automatizar processos</li>
                  <li>Cuida da manutenção e melhorias dos sistemas</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="aprendizados">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">O que você aprende</p>
              <h2>Conhecimentos que formam um desenvolvedor completo.</h2>
            </div>

            <div className="card-grid">
              {aprendizados.map((item) => (
                <article key={item} className="info-card">
                  <div className="card-icon">✓</div>
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="tecnologias">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Tecnologias</p>
              <h2>Ferramentas que fazem parte do dia a dia da área.</h2>
            </div>

            <div className="chip-list">
              {tecnologias.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="mercado">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Áreas de atuação</p>
              <h2>Você pode trabalhar em vários caminhos dentro da tecnologia.</h2>
            </div>

            <div className="card-grid market-grid">
              {areas.map((area) => (
                <article key={area} className="info-card market-card">
                  <div className="card-icon accent">•</div>
                  <h3>{area}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projetos">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Projetos</p>
              <h2>Exemplos de soluções que um desenvolvedor pode criar.</h2>
            </div>

            <div className="project-grid">
              {projetos.map((projeto, index) => (
                <article key={projeto} className="project-card">
                  <div className="project-number">0{index + 1}</div>
                  <h3>{projeto}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section" id="inscreva-se">
          <div className="container cta-box">
            <div>
              <p className="eyebrow light">Seu futuro começa aqui</p>
              <h2>Conheça o curso Técnico em Desenvolvimento de Sistemas.</h2>
            </div>
            <a href="#inicio" className="button primary light-button">
              Quero saber mais
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div>
            <strong>Técnico em Desenvolvimento de Sistemas</strong>
            <p>SENAI</p>
          </div>
          <div>
            <p>2026</p>
          </div>
          <div>
            <p>Jeovanny Almeida</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
