import { StrictMode, useEffect, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Accordion, Button, Card, CaseStudy, Checkbox, Chip, Contact, CTA, Field, Footer, Head, Hero, Hl, Icon, Input, Logo, Modal,
  Mono, Navbar, Services, Sq, Stats, Table, Tag, Testimonial, Toast, ToastRegion, Tree, type IconName, type NavItem,
} from '../src/index.js';
import './preview.css';

// Contenuti di esempio: servono solo a mostrare i componenti, non sono dati reali.
const NAV: NavItem[] = [
  { label: 'Servizi', menu: [
    { title: 'Siti', items: ['Siti vetrina', 'Landing page'] },
    { title: 'Software', items: ['Gestionali', 'SaaS su misura'] },
    { title: 'AI', items: ['Automazioni', 'Assistenti'] },
    { title: 'Studio', items: [{ label: 'Chi siamo', href: '#' }] },
  ] },
  { label: 'Lavori', href: '#' },
  { label: 'Contatti', href: '#' },
];
const ICONS: IconName[] = ['arrow-right', 'arrow-up-right', 'plus', 'minus', 'check', 'x', 'menu', 'globe', 'code', 'spark', 'layers', 'mail', 'clock', 'bolt', 'shield', 'chart', 'pin', 'user'];
const ROWS = [
  { id: '1', progetto: 'Sito vetrina', stato: 'Online', ore: '42' },
  { id: '2', progetto: 'Gestionale ordini', stato: 'In corso', ore: '310' },
  { id: '3', progetto: 'Automazione email', stato: 'Bozza', ore: '18' },
];

type Mode = 'dark' | 'light' | 'both';

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="al-section" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="al-container" style={{ display: 'grid', gap: 24 }}>
        <span className="pv-label">{title}</span>
        {children}
      </div>
    </section>
  );
}

function Gallery({ theme }: { theme: 'dark' | 'light' }) {
  const [modal, setModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div data-theme={theme} style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Hero
        nav={<Navbar clear items={NAV} cta={{ href: '#', label: 'Parliamone' }} onMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />}
        title={<>Software in quota</>}
        lead="Siti, software su misura e automazioni per PMI."
        primary={{ href: '#', label: 'Inizia un progetto' }}
        secondary={{ href: '#', label: 'Vedi i lavori' }}
        meta={['Gallarate, VA', 'Tema ' + (theme === 'dark' ? 'Scuro' : 'Chiaro'), 'Anteprima']}
      />

      <Block title="Navbar/">
        <Navbar items={NAV} cta={{ href: '#', label: 'Parliamone' }} openMenu="Servizi" />
      </Block>

      <Block title="Logo/">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <Logo size={40} /><Logo size={40} lockup="nav" /><Logo size={40} lockup="mark" />
        </div>
      </Block>

      <Block title="Bottoni/">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button>Primario</Button>
          <Button variant="inverse">Inverso</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Elimina</Button>
          <Button variant="dark">Scuro</Button>
          <Button variant="light">Chiaro</Button>
          <Button arrow>Con freccia</Button>
          <Button size="sm">Piccolo</Button>
          <Button size="lg">Grande</Button>
          <Button loading>In corso</Button>
          <Button disabled>Disattivato</Button>
        </div>
      </Block>

      <Block title="Tag, chip e marcatori/">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag>Neutro</Tag><Tag tone="primary">Primario</Tag><Tag tone="soft">Soft</Tag>
          <Tag tone="success" dot>Online</Tag><Tag tone="warning" dot>In attesa</Tag><Tag tone="danger" dot>Errore</Tag>
          <Sq /><Sq on /><Sq>→</Sq><Mono>Servizi/</Mono>
        </div>
        <h2 style={{ font: '400 36px/40px var(--font-sans)', letterSpacing: '-0.025em', margin: 0 }}>
          Le PMI hanno bisogno di <Chip icon="code" />software e di <Hl>tempi chiari</Hl>
        </h2>
      </Block>

      <Block title="Icone/">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', color: 'var(--text-muted)' }}>
          {ICONS.map((n) => <span key={n} title={n}><Icon name={n} /></span>)}
        </div>
      </Block>

      <Block title="Form/">
        <form className="al-form" style={{ maxWidth: 560 }} onSubmit={(e) => e.preventDefault()}>
          <div className="al-form-row">
            <Field label="Nome" required><Input placeholder="Mario Rossi" /></Field>
            <Field label="Email" error="Inserisci un'email valida."><Input type="email" defaultValue="mario@" /></Field>
          </div>
          <Field label="Servizio"><Input as="select" options={['Sito vetrina', 'Software su misura', 'AI e automazioni']} /></Field>
          <Field label="Messaggio" hint="Obiettivo e tempi bastano."><Input as="textarea" /></Field>
          <Field label="Disattivato"><Input disabled defaultValue="Non modificabile" /></Field>
          <Checkbox defaultChecked>Ho letto l’informativa privacy.</Checkbox>
        </form>
      </Block>

      <Block title="Card e statistiche/">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 0 }}>
          <Card label="Servizio/" title="Siti vetrina" footer={<Mono>Da 4 settimane</Mono>}>Veloci, accessibili, facili da aggiornare.</Card>
          <Card label="Servizio/" title="Software su misura" href="#">Gestionali e SaaS costruiti attorno ai tuoi processi.</Card>
          <Card label="Servizio/" title="AI e automazioni" aside={<Tag tone="soft">Nuovo</Tag>}>Meno lavoro ripetitivo.</Card>
        </div>
        <Stats items={[
          { label: 'Esempio A', value: '12', note: 'valore dimostrativo', icon: 'chart', highlight: true },
          { label: 'Esempio B', value: '3', note: 'valore dimostrativo', icon: 'user' },
          { label: 'Esempio C', value: '48h', note: 'valore dimostrativo', icon: 'clock' },
        ]} />
      </Block>

      <Block title="Albero, tabella, accordion/">
        <Tree title="Servizi/" items={['Siti vetrina', 'Software su misura', { label: 'AI e automazioni', href: '#' }]} />
        <Table caption="Progetti di esempio" rows={ROWS} columns={[
          { key: 'progetto', label: 'Progetto' },
          { key: 'stato', label: 'Stato', render: (r) => <Tag tone={r.stato === 'Online' ? 'success' : r.stato === 'In corso' ? 'warning' : 'neutral'} dot>{r.stato}</Tag> },
          { key: 'ore', label: 'Ore', numeric: true },
        ]} />
        <Accordion openFirst items={[
          { q: 'Quanto costa un sito vetrina?', a: 'Dipende da pagine e contenuti: ti mandiamo un preventivo scritto.' },
          { q: 'Lavorate anche fuori Lombardia?', a: 'Sì, quasi tutto si fa da remoto.' },
        ]} />
      </Block>

      <Block title="Feedback/">
        <div style={{ display: 'flex', gap: 8 }}><Button variant="outline" onClick={() => setModal(true)}>Apri modale</Button></div>
        <ToastRegion>
          <Toast tone="info" title="Bozza salvata" time="ora">Puoi riprenderla quando vuoi.</Toast>
          <Toast tone="success" title="Messaggio inviato" onClose={() => {}}>Ti rispondiamo entro un giorno lavorativo.</Toast>
          <Toast tone="warning" title="Connessione lenta" />
          <Toast tone="danger" title="Invio non riuscito">Riprova tra qualche minuto.</Toast>
        </ToastRegion>
        <Modal open={modal} title="Eliminare il progetto?" onClose={() => setModal(false)}
          actions={<><Button variant="ghost" onClick={() => setModal(false)}>Annulla</Button><Button variant="danger" onClick={() => setModal(false)}>Elimina</Button></>}>
          <p style={{ margin: 0 }}>L’operazione non si può annullare.</p>
        </Modal>
      </Block>

      <section className="al-section">
        <div className="al-container" style={{ display: 'grid', gap: 'var(--space-32)' }}>
          <Head label="Sezioni/" icon="layers" title="Intestazione di sezione" lead="Etichetta mono nelle colonne 1–3, titolo dalla 4." />
          <Services label="Servizi/" title="Cosa facciamo" items={[
            { label: '01/', title: 'Siti vetrina', text: 'Per attività locali che vogliono farsi trovare.', points: ['Design', 'Sviluppo', 'SEO di base'] },
            { label: '02/', title: 'Software su misura', text: 'Gestionali e SaaS B2B.', points: ['Analisi', 'Sviluppo', 'Assistenza'] },
          ]} />
          <CaseStudy client="Cliente di esempio" year="2026" title="Gestionale ordini" summary="Testo dimostrativo per mostrare il layout del case study."
            spec={[{ label: 'Stack', value: 'React · Spring Boot · PostgreSQL' }, { label: 'Durata', value: '3 mesi' }]} href="#" />
          <Testimonial quote="Citazione dimostrativa per vedere il layout della testimonianza." name="Nome Cognome" role="Ruolo" company="Azienda di esempio" />
          <Contact title="Parliamo del tuo progetto" lead="Rispondiamo entro un giorno lavorativo." email="info@example.com" hours="Entro 24 ore" />
        </div>
      </section>

      <Block title="Tailwind (theme.css)/">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="bg-primary text-primary-fg rounded-xs px-3 py-1 text-label">bg-primary</span>
          <span className="bg-surface-raised border border-line-strong text-ink-muted px-3 py-1 text-body-sm">bg-surface-raised</span>
          <span className="font-mono text-mono-label uppercase text-ink-subtle">font-mono text-mono-label</span>
          <span className="text-link text-mono-data font-mono">text-link</span>
          <span className="bg-horizon w-24 h-8 inline-block" />
        </div>
      </Block>

      <CTA title="Iniziamo" text="Raccontaci il progetto in due righe." action={{ href: '#', label: 'Scrivici' }} secondary={{ href: '#', label: 'Prenota una call' }} />
      <Footer tagline="Siti, software su misura e automazioni per PMI."
        columns={[{ title: 'Servizi/', links: ['Siti vetrina', 'Software', 'AI'] }, { title: 'Studio/', links: [{ label: 'Contatti', href: '#' }] }]}
        legal="© 2026 Alpwise Studio" note="Anteprima @alpwise/ui" />
    </div>
  );
}

function App() {
  const [mode, setMode] = useState<Mode>('both');
  useEffect(() => { document.documentElement.dataset.theme = mode === 'light' ? 'light' : 'dark'; }, [mode]);
  return (
    <>
      <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 100, display: 'flex', gap: 4, padding: 4, background: 'var(--surface-raised)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-overlay)' }}>
        {(['dark', 'light', 'both'] as const).map((m) => (
          <Button key={m} size="sm" variant={mode === m ? 'primary' : 'ghost'} aria-pressed={mode === m} onClick={() => setMode(m)}>
            {m === 'dark' ? 'Scuro' : m === 'light' ? 'Chiaro' : 'Entrambi'}
          </Button>
        ))}
      </div>
      {mode !== 'light' && <Gallery theme="dark" />}
      {mode !== 'dark' && <Gallery theme="light" />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
