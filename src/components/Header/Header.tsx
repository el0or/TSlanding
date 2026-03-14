import { useEffect, useState } from 'react'
import styles from './Header.module.css'
import ModalForm from '../ModalForm/ModalForm'

const NAV_ITEMS = [
  { label: 'О клинике', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Специалисты', href: '#specialists' },
  { label: 'Цены', href: '#prices' },
  { label: 'Контакты', href: '#contacts' },
]

function lockBodyScroll(locked: boolean) {
  if (typeof document === 'undefined') return
  document.body.style.overflow = locked ? 'hidden' : ''
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    lockBodyScroll(isMenuOpen)
    return () => lockBodyScroll(false)
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  const onNavClick = () => setIsMenuOpen(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={`${styles.header__container} ${styles.header__topInner}`}>
          <button
            className={styles.header__burger}
            type="button"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <a className={styles.header__logo} href="/" aria-label="Главная">
            <img className={styles.header__logoImg} src="/logo.svg" alt="LOGO" />
          </a>

          <div className={styles.header__geo}>
            <img
              className={styles.header__geoIcon}
              src="/map.svg"
              alt=""
              aria-hidden="true"
            />
            <div className={styles.header__geoText}>
              <div className={styles.header__geoCity}>Ростов-на-Дону</div>
              <div className={styles.header__geoAddr}>ул. Ленина, 2Б</div>
            </div>
          </div>

          <div className={styles.header__contacts}>
            <a className={styles.header__wa} href="https://wa.me/" aria-label="WhatsApp">
              <img
                className={styles.header__waIcon}
                src="/whatsapp.svg"
                alt=""
                aria-hidden="true"
              />
            </a>
            <a className={styles.header__phone} href="tel:+78630000000">
              +7(863) 000 00 00
            </a>
          </div>

          <div className={styles.header__overlayRight}>
            <a
              className={styles.header__overlayPhone}
              href="tel:+78630000000"
              onClick={onNavClick}
            >
              +7(863) 000 00 00
            </a>
            <div className={styles.header__overlayCity}>Ростов-на-Дону</div>
          </div>

          <button className={styles.header__cta} onClick={() => setIsModalOpen(true)}>
            Записаться на прием
          </button>
        </div>
      </div>

      <nav className={styles.header__nav} aria-label="Навигация по сайту">
        <div className={`${styles.header__container} ${styles.header__navInner}`}>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} className={styles.header__navLink} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div
        className={
          isMenuOpen
            ? `${styles.header__overlay} ${styles.header__overlayOpen}`
            : styles.header__overlay
        }
      >
        <div className={styles.header__overlayTop}>
          <button
            className={styles.header__close}
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setIsMenuOpen(false)}
          />

          <a
            className={styles.header__overlayLogo}
            href="/"
            aria-label="Главная"
            onClick={onNavClick}
          >
            <img className={styles.header__logoImg} src="/logo.svg" alt="LOGO" />
          </a>

          <div className={styles.header__overlayRight}>
            <a
              className={styles.header__overlayPhone}
              href="tel:+78630000000"
              onClick={onNavClick}
            >
              +7(863) 000 00 00
            </a>
            <div className={styles.header__overlayCity}>Ростов-на-Дону</div>
          </div>
        </div>

        <div className={styles.header__overlayBody}>
          <div className={styles.header__overlayLinks}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                className={styles.header__overlayLink}
                href={item.href}
                onClick={onNavClick}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className={styles.header__overlayCta}

            onClick={() => setIsModalOpen(true)}
          >
            Записаться на прием
          </button>
        </div>
      </div>
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  )
}