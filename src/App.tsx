import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

const navigation = ['Početna', 'Leasing', 'Usluge', 'Prodaja i najam', 'O nama', 'Kontakt']

const navigationRoutes: Record<string, string> = {
  Početna: '/',
  Leasing: '/leasing',
  'Usluge': '/usluge',
  'Prodaja i najam': '/prodaja-i-najam',
  'O nama': '/o-nama',
  Kontakt: '/kontakt',
}

const legalLinks = [
  { label: 'Opći uvjeti i naknade', path: '/opci-uvjeti-i-naknade' },
  { label: 'Financijska izvješća', path: '/financijska-izvjesca' },
  { label: 'Informacije o obradi osobnih podataka', path: '/informacije-o-obradi-osobnih-podataka' },
  { label: 'Etički kodeks', path: '/eticki-kodeks' },
]

const valueBlocks = [
  {
    number: '01',
    title: 'Financiranje IT opreme',
    text: 'Pružamo različite mogućnosti financiranja IT opreme i projekata uz dodatne usluge.',
  },
  {
    number: '02',
    title: 'Kompletna usluga',
    text: 'Uz leasing nudimo savjetovanje, osiguranje, održavanje i druge usluge prilagođene potrebama klijenta.',
  },
  {
    number: '03',
    title: 'Rješenja po mjeri',
    text: 'Iskustvo u IT leasingu omogućuje nam razvoj modela prilagođenih različitim potrebama poslovanja.',
  },
]

const reasons = [
  'Oblikovanje otplate prema Vašim potrebama i mogućnostima.',
  'Raznolika ponuda struktura otplate — mjesečne, kvartalne ili godišnje rate — uz fiksnu ili promjenjivu kamatnu stopu.',
  'Ponuda različitih modela objekta leasinga.',
]

const leasingModels = [
  {
    number: '01',
    title: 'Project Leasing',
    text: 'Financiranje projekta s uključenim plaćanjem dobavljača u fazi dobave i implementacije. Po isteku ugovora moguće je zadržavanje opreme do završetka migracije.',
  },
  {
    number: '02',
    title: 'Solution Leasing',
    text: 'Financiranje programskog rješenja i pripadajućeg hardvera, odnosno kompletnog sustava za obavljanje određene funkcije.',
  },
  {
    number: '03',
    title: 'Tech Exchange',
    text: 'Financiranje opreme uz mogućnost isključenja ili zamjene određenog dijela opreme u slučaju odlaska djelatnika ili nezadovoljavajućih karakteristika.',
  },
  {
    number: '04',
    title: 'Managed Workplace',
    text: 'Financiranje opreme uz uključeno održavanje i osiguranje opreme.',
  },
  {
    number: '05',
    title: 'Print Solution',
    text: 'Financiranje pisača uz dobavu potrošnog materijala i održavanje, uz model plaćanja temeljen na ugovorenoj cijeni ispisa i stvarnom utrošku.',
  },
  {
    number: '06',
    title: 'Go Mobile',
    text: 'Financiranje mobilnih uređaja uz usluge osiguranja opreme i sigurnosnu platformu.',
  },
  {
    number: '07',
    title: 'Sale & Lease Back',
    text: 'Otkup postojeće opreme i povratni leasing iste opreme radi unovčavanja ili outsourcinga.',
  },
  {
    number: '08',
    title: 'Go Smart',
    text: 'Financiranje Smart City rješenja kroz projekt uvođenja Smart rješenja i otplatu kroz leasing ugovor uz usklađivanje prihoda i rashoda.',
  },
]

const financeGroups = {
  it: ['Prijenosnici', 'Osobna računala', 'Monitori', 'Printeri', 'Serverska i podatkovna oprema', 'Data centre oprema', 'Mrežna oprema', 'Mobilna oprema'],
  other: ['Komunalna oprema', 'Lokalna samouprava', 'Medicinska oprema', 'Ugostiteljska oprema', 'Industrijski strojevi i oprema'],
}

const leasingScenarios = [
  {
    title: 'Nedostatak sredstava za trenutnu investiciju',
    text: 'Ako vam se smiješe poslovne prilike koje zahtijevaju ulaganje u resurse, leasing može pomoći da ih ostvarite bez velike jednokratne investicije.',
  },
  {
    title: 'Outsourcing opreme',
    text: 'Ako razmišljate o outsourcingu opreme, leasing vam može dati pregledni i prilagođeni model korištenja opreme bez dodatnog operativnog tereta.',
  },
  {
    title: 'Velike količine IT opreme',
    text: 'Ako posjedujete veliku količinu informatičke opreme, leasing može pomoći u strukturiranom upravljanju održavanjem, promjenama i troškovima.',
  },
  {
    title: 'Oslobađanje kapitala kroz Sale & Lease Back',
    text: 'U situacijama kada je potrebno oslobađanje kapitala, moguće je iskoristiti postojeću opremu kroz model unovčavanja i povratnog leasinga.',
  },
  {
    title: 'ÄŒesta zamjena tehnologije',
    text: 'Ako vaše poslovanje zahtijeva čestu zamjenu tehnologije, leasing pomaže da se nova oprema uvede bez dugoročnih velikih ulaganja.',
  },
]

const steps = ['Pošaljite zahtjev', 'Dostavite dokumentaciju', 'Preuzmite objekt leasinga']

const services = [
  {
    title: 'SafeGuard',
    text: 'Dodatna zaštita i podrška za poslovnu opremu kroz strukturiran i održiv model zaštite imovine.',
  },
  {
    title: 'SafePlan',
    text: 'Planiranje i usklađivanje financijskih i operativnih potreba uz jasan pregled modela otplate i korištenja opreme.',
  },
  {
    title: 'Asset Management',
    text: 'Upravljanje imovinom kroz cijeli životni ciklus, s fokusom na učinkovitost, sigurnost i optimalno korištenje resursa.',
  },
]

const additionalServices = [
  {
    number: '01',
    title: 'SAFEGUARD',
    subtitle: 'ZAŠTITA OPREME KADA VAM JE NAJPOTREBNIJA.',
    paragraphs: [
      'Oprema se financira s jamstvom proizvođača za vrijeme trajanja ugovora. Ako ono ne postoji ili nije isplativo, nudimo jamstvo koje odgovara uvjetima proizvođačkog jamstva.',
      'Za štete koje nisu pokrivene proizvođačkim jamstvom nudimo prošireno jamstvo SafeGuard kojim se pokrivaju štete i rizici koji mogu nastati tijekom korištenja objekta leasinga elektroničkih uređaja.',
    ],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '02',
    title: 'SAFEPLAN',
    subtitle: 'ODRŽAVANJE I SERVIS UZ PREDVIDLJIVIJE TROŠKOVE.',
    paragraphs: [
      'Nudimo usluge održavanja opreme i servisa koje se mogu naplaćivati uz ratu leasinga ili najma.',
      'Time se smanjuje rizik nepredviđenih troškova u slučaju kvara i štede interni resursi.',
      'U slučaju kvara korisnik prijavljuje problem, a i4next koordinira daljnji postupak.',
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '03',
    title: 'ASSET MANAGEMENT',
    subtitle: 'POTPUNA KONTROLA NAD OPREMOM.',
    paragraphs: [
      'Asset Management omogućuje praćenje opreme u leasingu i sklopljenih ugovora.',
      'Rješenje pruža pristup informacijama o opremi, uključujući serijske brojeve i lokacije, te uvid u trenutno stanje opreme.',
    ],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
  },
]

const productOfferings = [
  'Monitori',
  'Računala',
  'Laptopi',
  'Printeri',
]

const salesEditorial = [
  {
    number: '01',
    title: 'NOVA OPREMA',
    text: 'Nabava nove opreme za poslovanje s naglaskom na pouzdanost, performanse i dugoročnu vrijednost.',
  },
  {
    number: '02',
    title: 'RABLJENA OPREMA',
    text: 'Rješenje za korisnike koji žele kvalitetnu opremu uz pažljivo odabrane, funkcionalne i provjerene jedinice.',
  },
  {
    number: '03',
    title: 'REFURBISHED OPREMA',
    text: 'Obnovljena oprema prilagođena korisnicima koji traže uravnotežen odnos između vrijednosti i radne učinkovitosti.',
  },
]

const aboutValues = [
  {
    number: '01',
    title: 'KLIJENT',
    text: 'Klijent je uvijek na prvom mjestu.',
  },
  {
    number: '02',
    title: 'NAŠ TIM',
    text: 'Naš tim je naša najveća snaga.',
  },
  {
    number: '03',
    title: 'POLITIKA KVALITETE',
    text: 'Radimo po najvišim standardima.',
  },
  {
    number: '04',
    title: 'DOGOVOR',
    text: 'Ostvarenog dogovora držimo se uvijek i bez iznimke.',
  },
  {
    number: '05',
    title: 'IZVRŠNOST',
    text: 'Dajemo sve od sebe za ostvarenje cilja.',
  },
  {
    number: '06',
    title: 'INOVATIVNOST',
    text: 'Kontinuirano radimo na kreiranju novih inovativnih rješenja.',
  },
]

const aboutCompanyData = [
  { label: 'IME TVRTKE', value: 'i4next leasing Croatia d.o.o. za leasing' },
  { label: 'SJEDIŠTE', value: 'Oreškovićeva ulica 20A, Zagreb, 10 000' },
  { label: 'OIB', value: '05273526923' },
  { label: 'SUDSKI REGISTAR', value: 'Trgovački sud u Zagrebu' },
  { label: 'MBS', value: '081099831' },
  { label: 'ČLANOVI UPRAVE', value: 'Dino Stipković, direktor\nDarko Vodopija, direktor' },
  { label: 'TEMELJNI KAPITAL', value: '132.722,81 EUR' },
  { label: 'BANKA', value: 'Zagrebačka banka' },
  { label: 'IBAN', value: 'HR9823600001101921419' },
]

const leasingTwoTypes = [
  {
    title: 'Operativni leasing',
    body: 'Operativni leasing je model koji omogućuje korištenje opreme uz plaćanje najma, bez potrebe za dugoročnim vlasništvom. To je često prikladno rješenje kada je cilj koristiti tehnologiju uz fleksibilnost, uslugu i održavanje prilagođeno poslovnim potrebama.',
  },
  {
    title: 'Financijski leasing',
    body: 'Financijski leasing predstavlja model financiranja kojim se oprema koristi kroz duži period uz strukturiranu otplatu. i4next razvija modele prilagođene potrebama različitih projekata i korisnika, s naglaskom na jasno definirane poslovne uvjete i financijski okvir.',
  },
]

const leasingModelsDetailed = [
  {
    title: 'Project Leasing',
    points: [
      'Financiranje projekta s uključenim plaćanjem dobavljača u fazi dobave i implementacije.',
      'Po isteku ugovora zadržavanje opreme do završetka migracije.',
      'Bez povećanja troškova.',
    ],
  },
  {
    title: 'Solution Leasing',
    points: ['Financiranje programskog rješenja i pripadajućeg hardvera, odnosno kompletnog sustava za određenu funkciju.'],
  },
  {
    title: 'Tech Exchange',
    points: ['Financiranje opreme uz mogućnost isključenja ili zamjene određenog dijela opreme.'],
  },
  {
    title: 'Managed Workplace',
    points: ['Financiranje opreme uz uključeno održavanje i osiguranje.'],
  },
  {
    title: 'Print Solution',
    points: ['Financiranje pisača, potrošnog materijala i održavanja uz model obračuna temeljen na ugovorenoj cijeni ispisa i stvarnom utrošku.'],
  },
  {
    title: 'Go Mobile',
    points: ['Financiranje mobilnih uređaja uz osiguranje opreme i sigurnosnu platformu.'],
  },
  {
    title: 'Sale & Lease Back',
    points: ['Otkup postojeće opreme i povratni leasing iste radi unovčavanja ili outsourcinga.'],
  },
  {
    title: 'Go Smart',
    points: ['Financiranje Smart City rješenja kroz projekt uvođenja Smart rješenja i leasing model.'],
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

function SectionHeader({ eyebrow, title, copy, align = 'left' }: { eyebrow: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return (
    <header className={`section-header section-header--${align}`}>
      <p className="section-header__eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </header>
  )
}

function CTASection({ eyebrow = 'Zatražite ponudu', title = 'Spremni za sljedeći korak?', copy = 'Razgovarajmo o financiranju tehnologije i rješenju koje odgovara vašem poslovanju.' }: { eyebrow?: string; title?: string; copy?: string }) {
  return (
    <section className="cta-section">
      <div className="cta-section__inner">
        <div>
          <p className="section-header__eyebrow section-header__eyebrow--light">{eyebrow}</p>
          <h3>{title}</h3>
        </div>

        <div className="cta-section__actions">
          <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
          <Link to="/leasing" className="button button--secondary">Istražite leasing</Link>
        </div>

        <p className="cta-section__copy">{copy}</p>
      </div>
    </section>
  )
}

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="site-shell">
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="i4next Leasing Croatia">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark__dot" />
              <span className="brand-mark__line" />
            </span>
            <span className="brand-copy">
              <span className="brand-copy__main">i4next</span>
              <span className="brand-copy__sub">leasing Croatia</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Glavna navigacija">
            {navigation.map((item) => (
              <Link key={item} to={navigationRoutes[item]} className="desktop-nav__link">
                {item}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Otvorite navigaciju"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((state) => !state)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              className="mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="mobile-nav" aria-label="Mobilna navigacija">
                {navigation.map((item) => (
                  <Link key={item} to={navigationRoutes[item]} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="mobile-panel__actions">
                <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="home-page">
        <section className="hero section-shell">
          <div className="container hero-grid">
            <motion.div className="hero-content" initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <p className="eyebrow">i4NEXT LEASING CROATIA</p>
              <h1>FINANCIRANJE TEHNOLOGIJE<br />ZA POSLOVANJE KOJE RASTE.</h1>
              <p className="hero-copy">
                Leasing IT opreme i projekata uz fleksibilna financijska rješenja i dodatne usluge prilagođene potrebama vašeg poslovanja.
              </p>

              <div className="hero-actions">
                <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
                <Link to="/leasing" className="button button--secondary">Istražite leasing</Link>
              </div>
            </motion.div>

            <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
              <div className="hero-image" aria-label="IT infrastructure and enterprise technology" />
              <div className="hero-badge">
                <span>Leasing</span>
                <strong>IT i projekti</strong>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell value-section">
          <div className="container">
            <SectionHeader eyebrow="i4NEXT" title="VAŠ PARTNER ZA FINANCIRANJE TEHNOLOGIJE." />

            <div className="value-grid">
              {valueBlocks.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="value-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.42, delay: index * 0.08, ease: 'easeOut' }}
                >
                  <span className="value-card__num">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell why-section">
          <div className="container why-layout">
            <div className="why-copy">
              <SectionHeader eyebrow="ZAŠTO i4NEXT?" title="LEASING KOJI SE PRILAGOĐAVA POSLOVANJU." />
            </div>

            <div className="why-list-wrap">
              <ul className="reason-list">
                {reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-shell model-section">
          <div className="container">
            <SectionHeader eyebrow="LEASING" title="MODEL PREMA VAŠEM PROJEKTU." />

            <div className="model-list" aria-label="Leasing models">
              {leasingModels.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="model-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
                >
                  <div className="model-item__meta">
                    <span className="model-item__num">{item.number}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.text}</p>
                  <span className="model-item__arrow" aria-hidden="true">→</span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell finance-section">
          <div className="container finance-layout">
            <div className="finance-header">
              <SectionHeader eyebrow="ŠTO FINANCIRAMO?" title="ŠTO FINANCIRAMO?" />
            </div>

            <div className="finance-grid">
              <div className="finance-panel finance-panel--dark">
                <div className="finance-panel__top">
                  <span>Informatička oprema</span>
                </div>
                <ul>
                  {financeGroups.it.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="finance-panel finance-panel--light">
                <div className="finance-panel__top">
                  <span>Ostala oprema</span>
                </div>
                <ul>
                  {financeGroups.other.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell scenarios-section">
          <div className="container">
            <SectionHeader eyebrow="KADA LEASING?" title="KADA LEASING IMA SMISLA?" />

            <div className="scenarios-list">
              {leasingScenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.title}
                  className="scenario-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
                >
                  <span className="scenario-item__num">0{index + 1}</span>
                  <div>
                    <h3>{scenario.title}</h3>
                    <p>{scenario.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell steps-section">
          <div className="container">
            <SectionHeader eyebrow="DO LEASINGA" title="DO LEASINGA U 3 KORAKA." align="center" />

            <div className="steps-list">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  className="step-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
                >
                  <span className="step-item__number">{index + 1}</span>
                  <span className="step-item__text">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell services-section">
          <div className="container">
            <SectionHeader eyebrow="DODATNE USLUGE" title="OPREMA JE SAMO POČETAK." />

            <div className="services-grid">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  className="service-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
                >
                  <div className="service-card__top">
                    <span className="service-card__number">0{index + 1}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.text}</p>
                </motion.article>
              ))}
            </div>

            <div className="services-cta">
              <Link to="/usluge" className="button button--secondary">Pogledajte usluge</Link>
            </div>
          </div>
        </section>

        <section className="section-shell about-section">
          <div className="container about-layout">
            <div className="about-visual" aria-label="i4next office and technology" />
            <div className="about-content">
              <SectionHeader eyebrow="O i4NEXT" title="SPECIJALIZIRANI ZA IT LEASING OD 2006." />
              <p>
                i4next Leasing Croatia d.o.o. osnovan je 2006. godine i specijaliziran je za leasing IT opreme i IT projekata.
              </p>
              <p>
                Naše poslovanje temelji se na razumijevanju tehnologije, potreba klijenata i fleksibilnih modela financiranja.
              </p>
              <div className="about-cta">
                <Link to="/o-nama" className="button button--primary">Saznajte više</Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <CTASection eyebrow="Zatražite ponudu" title="SPREMNI ZA SLJEDEĆI KORAK?" copy="Razgovarajmo o financiranju tehnologije i rješenju koje odgovara vašem poslovanju." />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__block site-footer__block--brand">
            <Link to="/" className="brand brand--footer" aria-label="i4next Leasing Croatia">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark__dot" />
                <span className="brand-mark__line" />
              </span>
              <span className="brand-copy">
                <span className="brand-copy__main">i4next</span>
                <span className="brand-copy__sub">leasing Croatia</span>
              </span>
            </Link>

            <p className="footer-copy">Vaš pouzdani partner za leasing.</p>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Navigacija</p>
            <ul className="footer-list">
              {navigation.map((item) => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Kontakt</p>
            <ul className="footer-list footer-list--contacts">
              <li>Oreškovićeva ulica 20A</li>
              <li>10000 Zagreb</li>
              <li>01 580 2887</li>
              <li>01 6195 109</li>
              <li>
                <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Dokumenti</p>
            <ul className="footer-list">
              {legalLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container site-footer__bottom">
          <p>© i4next Leasing Croatia d.o.o.</p>
          <p>OIB: 05273526923</p>
        </div>
      </footer>
    </div>
  )
}

function LeasingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="site-shell leasing-page-shell">
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="i4next Leasing Croatia">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark__dot" />
              <span className="brand-mark__line" />
            </span>
            <span className="brand-copy">
              <span className="brand-copy__main">i4next</span>
              <span className="brand-copy__sub">leasing Croatia</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Glavna navigacija">
            {navigation.map((item) => (
              <Link key={item} to={navigationRoutes[item]} className="desktop-nav__link">
                {item}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Otvorite navigaciju"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((state) => !state)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              className="mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="mobile-nav" aria-label="Mobilna navigacija">
                {navigation.map((item) => (
                  <Link key={item} to={navigationRoutes[item]} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="mobile-panel__actions">
                <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="leasing-page">
        <section className="section-shell leasing-hero">
          <div className="container leasing-hero__grid">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <p className="eyebrow">LEASING</p>
              <h1>FLEKSIBILNO FINANCIRANJE<br />VAŠE TEHNOLOGIJE.</h1>
              <p className="leasing-hero__copy">
                i4next Leasing Croatia nudi operativni i financijski leasing te razvija modele financiranja prilagođene potrebama različitih projekata i korisnika.
              </p>
              <div className="hero-actions">
                <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
              </div>
            </motion.div>

            <motion.div className="leasing-hero__visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
              <div className="leasing-hero__image" aria-label="Leasing and enterprise technology" />
            </motion.div>
          </div>
        </section>

        <section className="section-shell two-types">
          <div className="container">
            <SectionHeader eyebrow="LEASING" title="DVA OSNOVNA OBLIKA LEASINGA." />

            <div className="two-types__grid">
              {leasingTwoTypes.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="type-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                >
                  <span className="type-card__index">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell models-section">
          <div className="container">
            <SectionHeader eyebrow="MODELI LEASINGA" title="MODELI LEASINGA" />

            <div className="accordion-list">
              {leasingModelsDetailed.map((item, index) => (
                <motion.details
                  key={item.title}
                  className="accordion-item"
                  open={index === 0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
                >
                  <summary>
                    <span className="accordion-item__num">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                    <span className="accordion-item__title">{item.title}</span>
                  </summary>
                  <div className="accordion-item__body">
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell finance-section leasing-finance">
          <div className="container finance-layout">
            <div className="finance-header">
              <SectionHeader eyebrow="ŠTO MOŽEMO FINANCIRATI?" title="ŠTO MOŽEMO FINANCIRATI?" />
            </div>

            <div className="finance-grid">
              <div className="finance-panel finance-panel--dark">
                <div className="finance-panel__top">
                  <span>IT oprema</span>
                </div>
                <ul>
                  {financeGroups.it.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="finance-panel finance-panel--light">
                <div className="finance-panel__top">
                  <span>Ostala oprema</span>
                </div>
                <ul>
                  {financeGroups.other.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell scenarios-section leasing-scenarios">
          <div className="container">
            <SectionHeader eyebrow="KADA LEASING MOŽE BITI RJEŠENJE?" title="KADA LEASING MOŽE BITI RJEŠENJE?" />

            <div className="scenarios-list">
              {leasingScenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.title}
                  className="scenario-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
                >
                  <span className="scenario-item__num">0{index + 1}</span>
                  <div>
                    <h3>{scenario.title}</h3>
                    <p>{scenario.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell steps-section">
          <div className="container">
            <SectionHeader eyebrow="OD ZAHTJEVA DO OPREME." title="OD ZAHTJEVA DO OPREME." align="center" />

            <div className="steps-list">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  className="step-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
                >
                  <span className="step-item__number">{index + 1}</span>
                  <span className="step-item__text">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell form-cta">
          <div className="container form-cta__wrap">
            <div className="form-cta__content">
              <SectionHeader eyebrow="ZATRAŽITE PONUDU." title="ZATRAŽITE PONUDU." />
              <p className="form-cta__copy">Ispunite zahtjev i dobit ćete ponudu sa svim potrebnim informacijama, bez obveze.</p>
              <Link to="/kontakt" className="button button--primary form-cta__button">Zatražite ponudu</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__block site-footer__block--brand">
            <Link to="/" className="brand brand--footer" aria-label="i4next Leasing Croatia">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark__dot" />
                <span className="brand-mark__line" />
              </span>
              <span className="brand-copy">
                <span className="brand-copy__main">i4next</span>
                <span className="brand-copy__sub">leasing Croatia</span>
              </span>
            </Link>

            <p className="footer-copy">Vaš pouzdani partner za leasing.</p>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Navigacija</p>
            <ul className="footer-list">
              {navigation.map((item) => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Kontakt</p>
            <ul className="footer-list footer-list--contacts">
              <li>Oreškovićeva ulica 20A</li>
              <li>10000 Zagreb</li>
              <li>01 580 2887</li>
              <li>01 6195 109</li>
              <li>
                <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Dokumenti</p>
            <ul className="footer-list">
              {legalLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container site-footer__bottom">
          <p>© i4next Leasing Croatia d.o.o.</p>
          <p>OIB: 05273526923</p>
        </div>
      </footer>
    </div>
  )
}

function ServicesPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="site-shell service-page-shell">
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="i4next Leasing Croatia">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark__dot" />
              <span className="brand-mark__line" />
            </span>
            <span className="brand-copy">
              <span className="brand-copy__main">i4next</span>
              <span className="brand-copy__sub">leasing Croatia</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Glavna navigacija">
            {navigation.map((item) => (
              <Link key={item} to={navigationRoutes[item]} className="desktop-nav__link">
                {item}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Otvorite navigaciju"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((state) => !state)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              className="mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="mobile-nav" aria-label="Mobilna navigacija">
                {navigation.map((item) => (
                  <Link key={item} to={navigationRoutes[item]} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="mobile-panel__actions">
                <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="service-page">
        <section className="section-shell service-hero">
          <div className="container service-hero__grid">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <p className="eyebrow">DODATNE USLUGE</p>
              <h1>OPREMA JE SAMO POČETAK.</h1>
              <p className="service-hero__copy">
                Uz financiranje opreme, i4next pruža dodatne usluge koje olakšavaju zaštitu, održavanje i upravljanje opremom.
              </p>
              <div className="hero-actions">
                <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
              </div>
            </motion.div>

            <motion.div className="service-hero__visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
              <div className="service-hero__image" aria-label="IT equipment and support" />
            </motion.div>
          </div>
        </section>

        {additionalServices.map((service, index) => (
          <motion.section
            key={service.title}
            className={`section-shell service-editorial ${index % 2 === 1 ? 'service-editorial--reverse' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
          >
            <div className="container service-editorial__grid">
              <div className="service-editorial__visual-wrap">
                <div className="service-editorial__visual" style={{ backgroundImage: `url(${service.image})` }} aria-label={service.title} />
              </div>

              <div className="service-editorial__content">
                <span className="service-editorial__number">{service.number}</span>
                <h2>{service.title}</h2>
                <p className="service-editorial__subtitle">{service.subtitle}</p>

                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="service-editorial__copy">{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.section>
        ))}

        <section className="section-shell service-lifecycle">
          <div className="container">
            <div className="service-lifecycle__head">
              <p className="eyebrow">ASSET MANAGEMENT</p>
              <h2>POTPUNA KONTROLA NAD OPREMOM.</h2>
            </div>

            <div className="lifecycle" aria-label="Životni ciklus opreme">
              <span>NABAVA</span>
              <span aria-hidden="true">↓</span>
              <span>LEASING</span>
              <span aria-hidden="true">↓</span>
              <span>PRAĆENJE</span>
              <span aria-hidden="true">↓</span>
              <span>ODRŽAVANJE</span>
              <span aria-hidden="true">↓</span>
              <span>STATUS OPREME</span>
            </div>
          </div>
        </section>

        <section className="section-shell service-cta">
          <div className="container service-cta__wrap">
            <div className="service-cta__content">
              <p className="eyebrow">KONTAKT</p>
              <h2>TREBATE VIŠE OD SAMOG FINANCIRANJA?</h2>
              <p>Razgovarajmo o kombinaciji financiranja i usluga koja odgovara vašem poslovanju.</p>
              <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__block site-footer__block--brand">
            <Link to="/" className="brand brand--footer" aria-label="i4next Leasing Croatia">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark__dot" />
                <span className="brand-mark__line" />
              </span>
              <span className="brand-copy">
                <span className="brand-copy__main">i4next</span>
                <span className="brand-copy__sub">leasing Croatia</span>
              </span>
            </Link>
            <p className="footer-copy">Vaš pouzdani partner za leasing.</p>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Navigacija</p>
            <ul className="footer-list">
              {navigation.map((item) => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Kontakt</p>
            <ul className="footer-list footer-list--contacts">
              <li>Oreškovićeva ulica 20A</li>
              <li>10000 Zagreb</li>
              <li>01 580 2887</li>
              <li>01 6195 109</li>
              <li>
                <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Dokumenti</p>
            <ul className="footer-list">
              {legalLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container site-footer__bottom">
          <p>© i4next Leasing Croatia d.o.o.</p>
          <p>OIB: 05273526923</p>
        </div>
      </footer>
    </div>
  )
}

function SalesRentalPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="site-shell sales-page-shell">
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="i4next Leasing Croatia">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark__dot" />
              <span className="brand-mark__line" />
            </span>
            <span className="brand-copy">
              <span className="brand-copy__main">i4next</span>
              <span className="brand-copy__sub">leasing Croatia</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Glavna navigacija">
            {navigation.map((item) => (
              <Link key={item} to={navigationRoutes[item]} className="desktop-nav__link">
                {item}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/kontakt" className="button button--primary">Pogledajte ponudu</Link>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Otvorite navigaciju"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((state) => !state)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              className="mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="mobile-nav" aria-label="Mobilna navigacija">
                {navigation.map((item) => (
                  <Link key={item} to={navigationRoutes[item]} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="mobile-panel__actions">
                <Link to="/kontakt" className="button button--primary">Pogledajte ponudu</Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="sales-page">
        <section className="section-shell sales-hero">
          <div className="container sales-hero__grid">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <p className="eyebrow">PRODAJA I NAJAM</p>
              <h1>OPREMA ZA VAŠE<br />POSLOVANJE.</h1>
              <p className="sales-hero__copy">
                U suradnji s partnerskom tvrtkom dostupna je ponuda nove, rabljene i obnovljene IT opreme za kupnju i najam.
              </p>
              <div className="hero-actions">
                <a href="https://expert-i4next.hr" target="_blank" rel="noreferrer" className="button button--primary">Pogledajte ponudu</a>
              </div>
            </motion.div>

            <motion.div className="sales-hero__visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
              <div className="sales-hero__image" aria-label="IT equipment and production" />
            </motion.div>
          </div>
        </section>

        <section className="section-shell sales-editorial">
          <div className="container">
            <SectionHeader eyebrow="PRODAJA" title="NOVA, RABLJENA I OBNOVLJENA OPREMA." />

            <div className="sales-editorial__list">
              {salesEditorial.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="editorial-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.42, delay: index * 0.08, ease: 'easeOut' }}
                >
                  <span className="editorial-item__number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell sales-catalogue">
          <div className="container">
            <SectionHeader eyebrow="ŠTO MOŽETE PRONAĆI?" title="ŠTO MOŽETE PRONAĆI?" />

            <div className="catalogue-grid">
              {productOfferings.map((item, index) => (
                <motion.div
                  key={item}
                  className="catalogue-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
                >
                  <span className="catalogue-item__index">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell sales-purpose">
          <div className="container sales-purpose__grid">
            <div className="sales-purpose__content">
              <SectionHeader eyebrow="OPREMA" title="OPREMA KOJA ODGOVARA VAŠIM POTREBAMA." />
              <p>
                U ponudi je oprema za poslovna okruženja kojima je potrebna pouzdana i funkcionalna tehnologija, bez dodatnih komplikacija u odabiru i implementaciji.
              </p>
            </div>
            <div className="sales-purpose__note">
              <p>Naša suradnja s partnerskom tvrtkom omogućuje dodatnu fleksibilnost u odabiru novih, rabljenih i obnovljenih rješenja za kupnju ili najam.</p>
            </div>
          </div>
        </section>

        <section className="section-shell sales-partner">
          <div className="container partner-box">
            <div className="partner-box__content">
              <p className="eyebrow partner-eyebrow">PARTNER</p>
              <h2>OPREMU MOŽETE KUPITI ILI NAJMITI.</h2>
              <p>
                Za aktualnu ponudu opreme posjetite web stranicu partnerske tvrtke Expert i4next.
              </p>
            </div>

            <div className="partner-box__cta">
              <a href="https://expert-i4next.hr" target="_blank" rel="noreferrer" className="button button--secondary">
                Pogledajte ponudu opreme
              </a>
              <span className="partner-box__meta">Vanjska partner web stranica</span>
            </div>
          </div>
        </section>

        <section className="section-shell sales-final-cta">
          <div className="container sales-final-cta__wrap">
            <div className="sales-final-cta__content">
              <p className="eyebrow">KONTAKT</p>
              <h2>TREBATE OPREMU ILI FINANCIRANJE?</h2>
              <p>Kontaktirajte i4next i razgovarajmo o rješenju za vaše poslovanje.</p>
              <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__block site-footer__block--brand">
            <Link to="/" className="brand brand--footer" aria-label="i4next Leasing Croatia">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark__dot" />
                <span className="brand-mark__line" />
              </span>
              <span className="brand-copy">
                <span className="brand-copy__main">i4next</span>
                <span className="brand-copy__sub">leasing Croatia</span>
              </span>
            </Link>
            <p className="footer-copy">Vaš pouzdani partner za leasing.</p>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Navigacija</p>
            <ul className="footer-list">
              {navigation.map((item) => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Kontakt</p>
            <ul className="footer-list footer-list--contacts">
              <li>Oreškovićeva ulica 20A</li>
              <li>10000 Zagreb</li>
              <li>01 580 2887</li>
              <li>01 6195 109</li>
              <li>
                <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Dokumenti</p>
            <ul className="footer-list">
              {legalLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container site-footer__bottom">
          <p>© i4next Leasing Croatia d.o.o.</p>
          <p>OIB: 05273526923</p>
        </div>
      </footer>
    </div>
  )
}

function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="site-shell about-page-shell">
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="i4next Leasing Croatia">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark__dot" />
              <span className="brand-mark__line" />
            </span>
            <span className="brand-copy">
              <span className="brand-copy__main">i4next</span>
              <span className="brand-copy__sub">leasing Croatia</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Glavna navigacija">
            {navigation.map((item) => (
              <Link key={item} to={navigationRoutes[item]} className="desktop-nav__link">
                {item}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Otvorite navigaciju"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((state) => !state)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              className="mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="mobile-nav" aria-label="Mobilna navigacija">
                {navigation.map((item) => (
                  <Link key={item} to={navigationRoutes[item]} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="mobile-panel__actions">
                <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="about-main">
        <section className="section-shell about-hero">
          <div className="container about-hero__grid">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <p className="eyebrow">O i4NEXT</p>
              <h1>ISKUSTVO U IT LEASINGU<br />OD 2006. GODINE.</h1>
              <p className="about-hero__copy">
                i4next Leasing Croatia d.o.o. specijaliziran je za leasing IT opreme i IT projekata.
              </p>
            </motion.div>

            <motion.div className="about-hero__visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
              <div className="about-hero__image" aria-label="Company history and office" />
            </motion.div>
          </div>
        </section>

        <section className="section-shell about-story">
          <div className="container about-story__grid">
            <div className="about-story__intro">
              <p className="eyebrow">PODRIJETLO</p>
              <h2>SPECIJALIZACIJA KOJA TRAJE.</h2>
            </div>

            <div className="about-story__text">
              <p>i4next Leasing Croatia d.o.o. osnovan je 2006. godine.</p>
              <p>Tvrtku je osnovala i4next International Trading & Leasing d.o.o., austrijska tvrtka sa sjedištem u Beču.</p>
              <p>2008. godine izdana je licenca za obavljanje poslova leasinga od strane Hrvatske agencije za nadzor financijskih usluga (HANFA).</p>
              <p>Na internetskim stranicama tvrtka je opisana kao specijalizirana za leasing IT opreme i IT projekata.</p>
            </div>
          </div>
        </section>

        <section className="section-shell about-timeline-section">
          <div className="container">
            <div className="about-timeline">
              <div className="about-timeline__item">
                <span className="about-timeline__year">2006</span>
                <span className="about-timeline__label">OSNIVANJE DRUŠTVA</span>
              </div>
              <div className="about-timeline__line" aria-hidden="true" />
              <div className="about-timeline__item">
                <span className="about-timeline__year">2008</span>
                <span className="about-timeline__label">HANFA LICENCA</span>
              </div>
              <div className="about-timeline__line" aria-hidden="true" />
              <div className="about-timeline__item about-timeline__item--highlight">
                <span className="about-timeline__year">DANAS</span>
                <span className="about-timeline__label">SPECIJALIZACIJA ZA IT LEASING I IT PROJEKTE</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell about-what-we-do">
          <div className="container about-what-we-do__grid">
            <div className="about-what-we-do__copy">
              <p className="eyebrow">USLUGE</p>
              <h2>VIŠE OD LEASINGA.</h2>
            </div>
            <div className="about-what-we-do__text">
              <p>Naše usluge nadilaze leasing IT opreme i rješenja.</p>
              <p>Uz leasing povezujemo usluge prodaje, iznajmljivanja i održavanja IT opreme.</p>
              <p>Na taj način nudimo cjelovita rješenja za različite IT potrebe.</p>
            </div>
          </div>
        </section>

        <section className="section-shell about-values-section">
          <div className="container">
            <SectionHeader eyebrow="VRIJEDNOSTI" title="NAŠE TEMELJNE VRIJEDNOSTI." />

            <div className="about-values-grid">
              {aboutValues.map((value, index) => (
                <motion.article
                  key={value.title}
                  className="about-value"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.18 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
                >
                  <span className="about-value__number">{value.number}</span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell about-company-data">
          <div className="container">
            <SectionHeader eyebrow="OPĆE INFORMACIJE" title="OPĆE INFORMACIJE." />

            <div className="company-data">
              {aboutCompanyData.map((item) => (
                <details key={item.label} className="company-data__item" open={item.label === 'IME TVRTKE'}>
                  <summary>{item.label}</summary>
                  <p>{item.value}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell about-final-cta">
          <div className="container about-final-cta__wrap">
            <div className="about-final-cta__content">
              <p className="eyebrow">KONTAKT</p>
              <h2>RAZGOVARAJMO O VAŠIM POTREBAMA.</h2>
              <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__block site-footer__block--brand">
            <Link to="/" className="brand brand--footer" aria-label="i4next Leasing Croatia">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark__dot" />
                <span className="brand-mark__line" />
              </span>
              <span className="brand-copy">
                <span className="brand-copy__main">i4next</span>
                <span className="brand-copy__sub">leasing Croatia</span>
              </span>
            </Link>
            <p className="footer-copy">Vaš pouzdani partner za leasing.</p>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Navigacija</p>
            <ul className="footer-list">
              {navigation.map((item) => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Kontakt</p>
            <ul className="footer-list footer-list--contacts">
              <li>Oreškovićeva ulica 20A</li>
              <li>10000 Zagreb</li>
              <li>01 580 2887</li>
              <li>01 6195 109</li>
              <li>
                <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Dokumenti</p>
            <ul className="footer-list">
              {legalLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container site-footer__bottom">
          <p>© i4next Leasing Croatia d.o.o.</p>
          <p>OIB: 05273526923</p>
        </div>
      </footer>
    </div>
  )
}

function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    legalEntity: false,
    legalEntityOib: '',
    equipmentValue: '',
    contractMonths: '',
    financingShare: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value, checked } = event.target as HTMLInputElement

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setErrors((current) => {
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {}

    if (!form.fullName.trim()) nextErrors.fullName = 'Unesite ime i prezime.'
    if (!form.phone.trim()) nextErrors.phone = 'Unesite broj mobitela.'
    if (!form.email.trim()) {
      nextErrors.email = 'Unesite e-mail adresu.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Unesite ispravnu e-mail adresu.'
    }
    if (!form.equipmentValue.trim()) nextErrors.equipmentValue = 'Unesite vrijednost financirane opreme.'
    if (!form.contractMonths.trim()) nextErrors.contractMonths = 'Odaberite željeni broj mjeseci.'
    if (!form.financingShare.trim()) nextErrors.financingShare = 'Odaberite pretežiti dio financiranja.'
    if (form.legalEntity && !form.legalEntityOib.trim()) {
      nextErrors.legalEntityOib = 'Unesite OIB pravne osobe.'
    }

    return nextErrors
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitState('error')
      return
    }

    setErrors({})
    setSubmitState('loading')

    window.setTimeout(() => {
      setSubmitState('success')
      setForm({
        fullName: '',
        phone: '',
        email: '',
        legalEntity: false,
        legalEntityOib: '',
        equipmentValue: '',
        contractMonths: '',
        financingShare: '',
      })
    }, 900)
  }

  const contactDetails = [
    { label: 'Telefon', href: 'tel:+38515802887', value: '01 580 2887' },
    { label: 'Telefon', href: 'tel:+38516195109', value: '01 6195 109' },
    { label: 'E-mail', href: 'mailto:info@i4next.hr', value: 'info@i4next.hr' },
  ]

  return (
    <div className="site-shell contact-page-shell">
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="i4next Leasing Croatia">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark__dot" />
              <span className="brand-mark__line" />
            </span>
            <span className="brand-copy">
              <span className="brand-copy__main">i4next</span>
              <span className="brand-copy__sub">leasing Croatia</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Glavna navigacija">
            {navigation.map((item) => (
              <Link key={item} to={navigationRoutes[item]} className="desktop-nav__link">
                {item}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Otvorite navigaciju"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((state) => !state)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              className="mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="mobile-nav" aria-label="Mobilna navigacija">
                {navigation.map((item) => (
                  <Link key={item} to={navigationRoutes[item]} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="mobile-panel__actions">
                <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="contact-page">
        <section className="section-shell contact-hero">
          <div className="container contact-hero__grid">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <p className="eyebrow">KONTAKT</p>
              <h1>RAZGOVARAJMO O VAŠEM<br />SLJEDEĆEM PROJEKTU.</h1>
              <p className="contact-hero__copy">Imate projekt, potrebu za financiranjem ili pitanje o leasingu? Javite nam se.</p>
            </motion.div>
            <motion.div className="contact-hero__panel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}>
              <span className="contact-hero__badge">i4next leasing Croatia d.o.o.</span>
              <p>Oreškovićeva ulica 20A<br />10000 Zagreb</p>
              <div className="contact-hero__meta">
                <a href="tel:+38515802887">01 580 2887</a>
                <a href="tel:+38516195109">01 6195 109</a>
                <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell contact-section">
          <div className="container contact-layout">
            <div className="contact-info">
              <p className="section-header__eyebrow">KONTAKT INFORMACIJE</p>
              <h2>i4next leasing Croatia d.o.o.</h2>

              <div className="contact-info__block">
                <p>Oreškovićeva ulica 20A</p>
                <p>10000 Zagreb</p>
              </div>

              <ul className="contact-details">
                {contactDetails.map((item) => (
                  <li key={item.value}>
                    <a href={item.href}>{item.value}</a>
                  </li>
                ))}
              </ul>

              <div className="contact-info__oib">
                <span>OIB:</span>
                <strong>05273526923</strong>
              </div>
            </div>

            <div className="contact-form-panel">
              <div className="contact-form-panel__header">
                <p className="section-header__eyebrow">ZAHTJEV</p>
                <h3>Zatražite ponudu.</h3>
                <p>Ispunite obrazac i dobit ćete ponudu sa svim potrebnim informacijama, bez obveze.</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  <label className="field">
                    <span>Ime i prezime</span>
                    <input
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                    {errors.fullName ? <small id="fullName-error" className="error-text" role="alert">{errors.fullName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Broj mobitela</span>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone ? <small id="phone-error" className="error-text" role="alert">{errors.phone}</small> : null}
                  </label>

                  <label className="field field--full">
                    <span>E-mail adresa</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email ? <small id="email-error" className="error-text" role="alert">{errors.email}</small> : null}
                  </label>

                  <label className="field field--checkbox field--full">
                    <input
                      name="legalEntity"
                      type="checkbox"
                      checked={form.legalEntity}
                      onChange={handleChange}
                    />
                    <span>Pravna osoba</span>
                  </label>

                  {form.legalEntity ? (
                    <label className="field field--full">
                      <span>OIB pravne osobe</span>
                      <input
                        name="legalEntityOib"
                        type="text"
                        value={form.legalEntityOib}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.legalEntityOib)}
                        aria-describedby={errors.legalEntityOib ? 'legalEntityOib-error' : undefined}
                      />
                      {errors.legalEntityOib ? <small id="legalEntityOib-error" className="error-text" role="alert">{errors.legalEntityOib}</small> : null}
                    </label>
                  ) : null}

                  <label className="field field--full">
                    <span>Vrijednost financirane opreme</span>
                    <div className="input-with-suffix">
                      <input
                        name="equipmentValue"
                        type="number"
                        min="0"
                        step="100"
                        value={form.equipmentValue}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.equipmentValue)}
                        aria-describedby={errors.equipmentValue ? 'equipmentValue-error' : undefined}
                      />
                      <span>EUR s PDV-om</span>
                    </div>
                    {errors.equipmentValue ? <small id="equipmentValue-error" className="error-text" role="alert">{errors.equipmentValue}</small> : null}
                  </label>

                  <label className="field field--full">
                    <span>Željeni broj mjeseci trajanja ugovora</span>
                    <select
                      name="contractMonths"
                      value={form.contractMonths}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.contractMonths)}
                      aria-describedby={errors.contractMonths ? 'contractMonths-error' : undefined}
                    >
                      <option value="">Odaberite</option>
                      <option value="24 mjeseca">24 mjeseca</option>
                      <option value="36 mjeseci">36 mjeseci</option>
                      <option value="48 mjeseci">48 mjeseci</option>
                      <option value="60 mjeseci">60 mjeseci</option>
                      <option value="Drugo">Drugo</option>
                    </select>
                    {errors.contractMonths ? <small id="contractMonths-error" className="error-text" role="alert">{errors.contractMonths}</small> : null}
                  </label>

                  <label className="field field--full">
                    <span>Pretežiti dio financiranja</span>
                    <select
                      name="financingShare"
                      value={form.financingShare}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.financingShare)}
                      aria-describedby={errors.financingShare ? 'financingShare-error' : undefined}
                    >
                      <option value="">Odaberite</option>
                      <option value="Do 30%">Do 30%</option>
                      <option value="30% - 50%">30% - 50%</option>
                      <option value="50% - 70%">50% - 70%</option>
                      <option value="70% - 100%">70% - 100%</option>
                      <option value="Drugo">Drugo</option>
                    </select>
                    {errors.financingShare ? <small id="financingShare-error" className="error-text" role="alert">{errors.financingShare}</small> : null}
                  </label>
                </div>

                {submitState === 'error' ? (
                  <div className="form-alert form-alert--error" role="alert">
                    Molimo popunite sva obavezna polja kako bismo mogli procijeniti zahtjev.
                  </div>
                ) : null}

                {submitState === 'success' ? (
                  <div className="form-alert form-alert--success" role="status">
                    Zahtjev je uspješno pripremljen za slanje. Za stvarno dostavljanje potrebna je backend integracija.
                  </div>
                ) : null}

                <button type="submit" className="button button--primary contact-form__submit" disabled={submitState === 'loading'}>
                  {submitState === 'loading' ? 'Slanje...' : 'Pošalji zahtjev'}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="section-shell contact-map-section">
          <div className="container contact-map__wrap">
            <div className="contact-map__copy">
              <p className="section-header__eyebrow">LOKACIJA</p>
              <h2>Oreškovićeva ulica 20A<br />10000 Zagreb</h2>
            </div>

            <div className="contact-map__frame">
              <iframe
                title="Lokacija i4next leasing Croatia d.o.o."
                src="https://www.google.com/maps?q=Ore%C5%A1kovi%C4%87eva%20ulica%2020A%2C%2010000%20Zagreb&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="section-shell contact-faq-section">
          <div className="container">
            <div className="section-header section-header--center">
              <p className="section-header__eyebrow">FAQ</p>
              <h2>Najčešća pitanja.</h2>
            </div>

            <div className="faq-list">
              <details open>
                <summary>Koje vrste leasinga nudite?</summary>
                <p>i4next nudi operativni i financijski leasing te niz modela prilagođenih različitim potrebama.</p>
              </details>
              <details>
                <summary>Što mogu financirati?</summary>
                <p>Financirati se može IT oprema poput računala, prijenosnika, monitora, printera, serverske i podatkovne opreme, mrežne i mobilne opreme te određene kategorije ostale opreme.</p>
              </details>
              <details>
                <summary>Kako započeti?</summary>
                <p>Pošaljite zahtjev, dostavite potrebnu dokumentaciju i nakon odobrenja preuzmite objekt leasinga.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="section-shell contact-final-cta">
          <div className="container contact-final-cta__wrap">
            <div className="contact-final-cta__content">
              <p className="eyebrow">IMATE PITANJE?</p>
              <h2>01 580 2887</h2>
              <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              <Link to="/kontakt" className="button button--primary">Pošaljite upit</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__block site-footer__block--brand">
            <Link to="/" className="brand brand--footer" aria-label="i4next Leasing Croatia">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark__dot" />
                <span className="brand-mark__line" />
              </span>
              <span className="brand-copy">
                <span className="brand-copy__main">i4next</span>
                <span className="brand-copy__sub">leasing Croatia</span>
              </span>
            </Link>
            <p className="footer-copy">Vaš pouzdani partner za leasing.</p>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Navigacija</p>
            <ul className="footer-list">
              {navigation.map((item) => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Kontakt</p>
            <ul className="footer-list footer-list--contacts">
              <li>Oreškovićeva ulica 20A</li>
              <li>10000 Zagreb</li>
              <li>01 580 2887</li>
              <li>01 6195 109</li>
              <li>
                <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Dokumenti</p>
            <ul className="footer-list">
              {legalLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container site-footer__bottom">
          <p>© i4next Leasing Croatia d.o.o.</p>
          <p>OIB: 05273526923</p>
        </div>
      </footer>
    </div>
  )
}

function LegalDocumentPage({
  title,
  intro,
  slug,
  showDownloadCards = false,
  downloadCards = [],
}: {
  title: string
  intro?: string
  slug: string
  showDownloadCards?: boolean
  downloadCards?: Array<{ title: string; href: string }>
}) {
  const [contentHtml, setContentHtml] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchPage = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://i4next.hr/wp-json/wp/v2/pages?slug=${slug}`, { signal: controller.signal })
        if (!response.ok) {
          throw new Error('Request failed')
        }
        const data = await response.json()
        const page = Array.isArray(data) ? data[0] : null
        const html = page?.content?.rendered ?? ''
        setContentHtml(html)
      } catch {
        setContentHtml('')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPage()
    return () => controller.abort()
  }, [slug])

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="site-shell document-page-shell">
      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="i4next Leasing Croatia">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark__dot" />
              <span className="brand-mark__line" />
            </span>
            <span className="brand-copy">
              <span className="brand-copy__main">i4next</span>
              <span className="brand-copy__sub">leasing Croatia</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Glavna navigacija">
            {navigation.map((item) => (
              <Link key={item} to={navigationRoutes[item]} className="desktop-nav__link">
                {item}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Otvorite navigaciju"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((state) => !state)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              className="mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="mobile-nav" aria-label="Mobilna navigacija">
                {navigation.map((item) => (
                  <Link key={item} to={navigationRoutes[item]} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="mobile-panel__actions">
                <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="document-page">
        <section className="section-shell document-page__hero">
          <div className="container legal-shell">
            <div className="document-header">
              <p className="section-header__eyebrow">Informacije</p>
              <h1>{title}</h1>
              {intro ? <p className="document-intro">{intro}</p> : null}
            </div>

            {showDownloadCards ? (
              <div className="document-cards">
                {downloadCards.map((item) => (
                  <article key={item.title} className="document-card">
                    <h3>{item.title}</h3>
                    <a href={item.href} target="_blank" rel="noreferrer" className="button button--secondary document-card__button">
                      Preuzmi dokument
                    </a>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="section-shell document-content-area">
          <div className="container legal-shell">
            {loading ? (
              <div className="document-loading">Učitavanje dokumenta...</div>
            ) : (
              <div className="document-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__block site-footer__block--brand">
            <Link to="/" className="brand brand--footer" aria-label="i4next Leasing Croatia">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark__dot" />
                <span className="brand-mark__line" />
              </span>
              <span className="brand-copy">
                <span className="brand-copy__main">i4next</span>
                <span className="brand-copy__sub">leasing Croatia</span>
              </span>
            </Link>
            <p className="footer-copy">Vaš pouzdani partner za leasing.</p>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Navigacija</p>
            <ul className="footer-list">
              {navigation.map((item) => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Kontakt</p>
            <ul className="footer-list footer-list--contacts">
              <li>Oreškovićeva ulica 20A</li>
              <li>10000 Zagreb</li>
              <li>01 580 2887</li>
              <li>01 6195 109</li>
              <li>
                <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Dokumenti</p>
            <ul className="footer-list">
              {legalLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container site-footer__bottom">
          <p>© i4next Leasing Croatia d.o.o.</p>
          <p>OIB: 05273526923</p>
        </div>
      </footer>
    </div>
  )
}

function GeneralTermsPage() {
  return (
    <LegalDocumentPage
      title="OPĆI UVJETI I NAKNADE"
      intro="Opći uvjeti ugovora o leasingu sastavni su dio ugovorne dokumentacije. Dokumenti su objavljeni radi transparentnog odnosa s klijentima."
      slug="opci-uvjeti-i-naknade"
      showDownloadCards
      downloadCards={[
        { title: 'Opći uvjeti ugovora o leasingu', href: 'https://i4next.hr/wp-content/uploads/2023/08/Opci-uvijeti-ugovora-o-leasingu.pdf' },
        { title: 'Cjenik i4next leasing Croatia d.o.o.', href: 'https://i4next.hr/wp-content/uploads/2023/08/TARIFA-i4next-leasing-Croatia-d.o.o.pdf' },
      ]}
    />
  )
}

function FinancialReportsPage() {
  const reports = [
    { year: '2025', title: 'Revizorsko izvješće društva za 2025.', href: '#' },
    { year: '2024', title: 'Revizorsko izvješće društva za 2024.', href: '#' },
    { year: '2023', title: 'Revizorsko izvješće za 2023.', href: '#' },
    { year: '2022', title: 'Revizorsko izvješće društva za 2022.', href: '#' },
    { year: '2021', title: 'Revizorsko izvješće društva za 2021.', href: '#' },
  ]

  return (
    <div className="site-shell document-page-shell">
      <header className="site-header site-header--scrolled">
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="i4next Leasing Croatia">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark__dot" />
              <span className="brand-mark__line" />
            </span>
            <span className="brand-copy">
              <span className="brand-copy__main">i4next</span>
              <span className="brand-copy__sub">leasing Croatia</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Glavna navigacija">
            {navigation.map((item) => (
              <Link key={item} to={navigationRoutes[item]} className="desktop-nav__link">
                {item}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/kontakt" className="button button--primary">Zatražite ponudu</Link>
          </div>
        </div>
      </header>

      <main className="document-page">
        <section className="section-shell document-page__hero">
          <div className="container legal-shell">
            <div className="document-header">
              <p className="section-header__eyebrow">Informacije</p>
              <h1>FINANCIJSKA IZVJEŠĆA</h1>
            </div>
          </div>
        </section>

        <section className="section-shell document-content-area">
          <div className="container legal-shell">
            <div className="finance-list" aria-label="Financijska izvješća">
              {reports.map((report) => (
                <article key={report.year} className="finance-report-item">
                  <div className="finance-report-item__year">{report.year}</div>
                  <div className="finance-report-item__meta">
                    <h3>{report.title}</h3>
                  </div>
                  <a href={report.href} className="finance-report-item__link" onClick={(event) => event.preventDefault()}>
                    Preuzmi
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__block site-footer__block--brand">
            <Link to="/" className="brand brand--footer" aria-label="i4next Leasing Croatia">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark__dot" />
                <span className="brand-mark__line" />
              </span>
              <span className="brand-copy">
                <span className="brand-copy__main">i4next</span>
                <span className="brand-copy__sub">leasing Croatia</span>
              </span>
            </Link>
            <p className="footer-copy">Vaš pouzdani partner za leasing.</p>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Navigacija</p>
            <ul className="footer-list">
              {navigation.map((item) => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Kontakt</p>
            <ul className="footer-list footer-list--contacts">
              <li>Oreškovićeva ulica 20A</li>
              <li>10000 Zagreb</li>
              <li>01 580 2887</li>
              <li>01 6195 109</li>
              <li>
                <a href="mailto:info@i4next.hr">info@i4next.hr</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__block">
            <p className="footer-label">Dokumenti</p>
            <ul className="footer-list">
              {legalLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container site-footer__bottom">
          <p>© i4next Leasing Croatia d.o.o.</p>
          <p>OIB: 05273526923</p>
        </div>
      </footer>
    </div>
  )
}

function PrivacyPage() {
  return (
    <LegalDocumentPage
      title="INFORMACIJE O OBRADI OSOBNIH PODATAKA"
      slug="informacije-o-obradi-osobnih-podataka"
    />
  )
}

function EthicalCodePage() {
  return (
    <LegalDocumentPage
      title="ETIČKI KODEKS"
      slug="eticki-kodeks"
    />
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leasing" element={<LeasingPage />} />
        <Route path="/usluge" element={<ServicesPage />} />
        <Route path="/prodaja-i-najam" element={<SalesRentalPage />} />
        <Route path="/o-nama" element={<AboutPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/opci-uvjeti-i-naknade" element={<GeneralTermsPage />} />
        <Route path="/financijska-izvjesca" element={<FinancialReportsPage />} />
        <Route path="/informacije-o-obradi-osobnih-podataka" element={<PrivacyPage />} />
        <Route path="/eticki-kodeks" element={<EthicalCodePage />} />
      </Routes>
    </>
  )
}

export default App


