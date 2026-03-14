import styles from './Banner.module.css'

export default function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.banner__inner}>
        <div className={styles.banner__content}>
          <h1 className={styles.banner__title}>
            Многопрофильная
            <br />
            клиника для детей
            <br />
            и взрослых
          </h1>

          <p className={styles.banner__text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua
          </p>
        </div>
      </div>

      <div className={styles.banner__imageWrap}>
        <img
          className={styles.banner__image}
          src="/banner.png"
          alt="Интерьер клиники"
        />
      </div>
    </section>
  )
}