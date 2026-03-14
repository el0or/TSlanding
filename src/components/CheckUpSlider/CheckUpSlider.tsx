import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ModalForm from '../ModalForm/ModalForm';

import styles from './CheckUpSlider.module.css';
import checkupData from './CheckUpSlider.json';

import 'swiper/css';

type CheckupSlide = {
  id: number;
  title: string;
  subtitle: string;
  list: string[];
  price: string;
  oldPrice: string;
  image: string;
  imageAlt: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
};

const slides: CheckupSlide[] = checkupData;

export default function CheckupSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles.checkup} aria-labelledby="checkup-title">
      <div className={styles.checkup__inner}>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.realIndex + 1);
          }}
          className={styles.checkup__slider}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
                <article
                    className={styles.card}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                <div className={styles.card__content}>
                    <div className={styles.card__textBlock}>
                        <h3 className={styles.card__title}>{slide.title}</h3>
                        <p className={styles.card__subtitle}>{slide.subtitle}</p>

                        <ul className={styles.card__list}>
                            {slide.list.map((item, index) => (
                            <li key={index} className={styles.card__item}>
                                {item}
                            </li>
                            ))}
                        </ul>

                        <div className={styles.card__priceBlock}>
                            <span className={styles.card__priceLabel}>Всего</span>
                            <span className={styles.card__price}>{slide.price}</span>
                            <span className={styles.card__oldPrice}>{slide.oldPrice}</span>
                        </div>

                        <div className={styles.card__actions}>
                            <button
                            className={`${styles.card__button} ${styles.card__buttonPrimary}`}
                            onClick={() => setIsModalOpen(true)}
                            >
                            {slide.primaryButton.label}
                            </button>

                            <a
                            className={`${styles.card__button} ${styles.card__buttonSecondary}`}
                            href={slide.secondaryButton.href}
                            >
                            {slide.secondaryButton.label}
                            </a>
                        </div>
                    </div>
                </div>

                <img className={styles.card__srOnlyImage} src={slide.image} alt={slide.imageAlt} />
                </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.checkup__controls}>
          <button
            type="button"
            className={styles.checkup__arrow}
            aria-label="Предыдущий слайд"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={currentSlide === 1}
            >
                <svg
                    width="30"
                    height="14"
                    viewBox="0 0 30 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M30 7H1M1 7L7 1M1 7L7 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                </svg>
            </button>

            <div className={styles.checkup__fraction} aria-label={`Слайд ${currentSlide} из ${slides.length}`}>
                <span className={styles.checkup__fractionCurrent}>{currentSlide}</span>
                <span className={styles.checkup__fractionDivider}>/</span>
                <span className={styles.checkup__fractionTotal}>{slides.length}</span>
            </div>

            <button
                type="button"
                className={styles.checkup__arrow}
                aria-label="Следующий слайд"
                onClick={() => swiperRef.current?.slideNext()}
                disabled={currentSlide === slides.length}
                >
                <svg
                    width="30"
                    height="14"
                    viewBox="0 0 30 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 7H29M29 7L23 1M29 7L23 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            </button>
        </div>
      </div>
      <ModalForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
    </section>
  );
}