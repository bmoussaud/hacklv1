import { collection, constructionDisclaimer, exhibits, facts, illustrationCaption, questions } from './content.js'
import './App.css'

function ConceptFigure({ item, hero = false }) {
  return (
    <figure className={hero ? 'hero-study' : 'object-study'}>
      <img
        src={item.image.src}
        alt={item.image.alt}
        width={item.image.width}
        height={item.image.height}
        loading={hero ? 'eager' : 'lazy'}
        fetchPriority={hero ? 'high' : undefined}
        decoding="async"
      />
      <figcaption>{illustrationCaption}</figcaption>
    </figure>
  )
}

function CollectionItem({ item }) {
  return (
    <article className="collection-item" aria-labelledby={`${item.id}-title`}>
      <ConceptFigure item={item} />
      <div className="object-copy">
        <h3 id={`${item.id}-title`}>{item.name}</h3>
        <p className="object-category">{item.category} &middot; Fictional design</p>
        <p>{item.description}</p>
        <details className="material-details">
          <summary>Explore {item.name}: materials and construction</summary>
          <div className="material-content">
            <p className="construction-notice">{constructionDisclaimer}</p>
            <dl className="material-notes">
              {item.materialNotes.map((note) => (
                <div key={note.label}>
                  <dt>{note.label}</dt>
                  <dd>{note.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </details>
      </div>
    </article>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#main" aria-label="Atelier 404, beginning of page">
          ATELIER <span>404</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#discovery">The discovery</a>
          <a href="#collection">The capsule</a>
          <a href="#record">The record</a>
        </nav>
        <span className="project-label">Louis Vuitton hackathon study</span>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">ASYM-P <span>/ Passage</span></h1>
            <p className="hero-intro">An interrupted collection.<br />A new point of departure.</p>
            <p>
              A fold for the city. A form for departure. A fragment to keep close.
              Three proposed objects for travellers who see design in what they carry.
            </p>
            <p className="fiction-notice">
              <strong>A fictional 2026 reconstruction.</strong> Inspired by the
              Operation Atelier 404 brief. The name, products, and visuals shown
              here are creative proposals, not authenticated archive objects.
            </p>
            <a className="text-link" href="#collection">Explore the proposed capsule <span aria-hidden="true">&rarr;</span></a>
          </div>
          <ConceptFigure item={collection[0]} hero />
        </section>

        <section id="discovery" className="discovery section" aria-labelledby="discovery-title">
          <h2 id="discovery-title">A seal broken.<br />A story still open.</h2>
          <div className="section-copy">
            <p>
              While digitizing the Asni&egrave;res archive, heritage archivist
              Margaux Fontenay opens crate SC-87-114. Its seal has remained
              intact since 1987. Inside: sixty finished pieces signed by Janus.
            </p>
            <p>
              Matte stri&eacute; leather, thermoformed vinyl, geometric padding,
              and deliberately asymmetric cuts form the material language
              described in the brief. The release authorization was withheld
              on 8 October 1987. No reason was entered.
            </p>
            <p>
              Passage begins with those surfaces and cuts, not with an answer.
              The crash came later; it does not explain the hold. Our new objects
              imagine a continuation while leaving the unfinished history intact.
            </p>
          </div>
        </section>

        <section id="collection" className="collection section" aria-labelledby="collection-title">
          <div className="section-heading">
            <h2 id="collection-title">Objects for passage.</h2>
            <p>
              One material language, three scales of movement: shoulder, journey,
              hand. Every category, name, and construction below is a fictional
              design proposal; the original category is redacted.
            </p>
          </div>
          <div className="collection-list">
            {collection.map((item) => <CollectionItem item={item} key={item.id} />)}
          </div>
        </section>

        <section id="record" className="record section" aria-labelledby="record-title">
          <div className="section-heading">
            <h2 id="record-title">The record.<br />And its silences.</h2>
            <p>
              What the brief tells us is not the same as what we imagine.
              The six source exhibits have not been supplied in this repository.
            </p>
          </div>
          <div className="record-columns">
            <div>
              <h3>Known from the brief</h3>
              <dl className="fact-list">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3>Still unanswered</h3>
              <ul className="question-list">
                {questions.map((question) => <li key={question}>{question}</li>)}
              </ul>
              <p className="record-note">
                <strong>Our proposal, not a discovery:</strong> &ldquo;Passage&rdquo;
                names a new journey for the material language. It does not
                complete Janus&apos;s missing history.
              </p>
              <a className="text-link" href="./operation_atelier_404_brief.pdf">
                Read the source brief (PDF) <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <section className="exhibit-index" aria-labelledby="exhibit-title">
            <h3 id="exhibit-title">Six exhibits. One incomplete record.</h3>
            <p className="exhibit-intro">
              An index of the evidence described in the brief, not a reproduction
              of the evidence itself. All six original exhibits remain unavailable.
            </p>
            <ol className="exhibit-list">
              {exhibits.map((exhibit) => (
                <li key={exhibit.id}>
                  <h4>{exhibit.id} / {exhibit.name}</h4>
                  <p>{exhibit.summary}</p>
                  <p className="exhibit-status">Source exhibit unavailable &middot; Brief summary only</p>
                </li>
              ))}
            </ol>
          </section>
        </section>
      </main>

      <footer className="site-footer">
        <p>Operation Atelier 404 &middot; ASYM-P / Passage</p>
        <p>Fictional hackathon concept. Not an official collection or store.</p>
        <a href="#main">Back to beginning <span aria-hidden="true">&uarr;</span></a>
      </footer>
    </>
  )
}

export default App
