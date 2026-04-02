import { Navbar } from "./components/layout/navbar";

export default function Home() {
  return (
    <section className="page">
      <Navbar />

      {/* HERO */}
      <div className="hero-content">
        <h1 className="title-1">ORBITA</h1>
        <p className="subtitle-2">
          A próxima geração de experiências digitais. Conecte, crie e escale
          sua presença online com velocidade e estilo.
        </p>
        <button className="cta-button">Começar agora</button>
      </div>


      {/* FEATURES */}
      <div className="features-content">
        <h1 className="title-2">Recursos</h1>
        <div className="feature-card">

          <h3>⚡ Rápido</h3>
          <p>Performance otimizada com tecnologias modernas.</p>
        </div>
        <div className="feature-card">
          <h3>🎨 Design</h3>
          <p>Interfaces elegantes e minimalistas.</p>
        </div>
        <div className="feature-card">
          <h3>🚀 Escalável</h3>
          <p>Pronto para crescer junto com seu projeto.</p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features-content">
        <h1 className="title-2">A solução completa para o seu atendimento ao cliente</h1>
        <p className="label-1">Centralize as conversas de todos os canais, dando aos agentes o contexto de que precisam. Acesse relatórios e dados com facilidade para garantir um atendimento de alta qualidade. Resolva solicitações de forma automática com o Orbi</p>
      </div>


      {/* FEATURES */}
      <div className="features-content">
        <h1 className="title-2">Simplifique o suporte aos seus funcionários</h1>
      </div>

    </section>
  );
}