import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './ModalForm.module.css';

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
};

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (!digits) return '';

  let normalized = digits;

  if (digits[0] === '8') {
    normalized = `7${digits.slice(1)}`;
  }

  if (digits[0] !== '7') {
    normalized = `7${digits.slice(0, 10)}`;
  }

  const parts = normalized.slice(1);

  let result = '+7';

  if (parts.length > 0) {
    result += ` (${parts.slice(0, 3)}`;
  }

  if (parts.length >= 3) {
    result += ')';
  }

  if (parts.length > 3) {
    result += ` ${parts.slice(3, 6)}`;
  }

  if (parts.length > 6) {
    result += `-${parts.slice(6, 8)}`;
  }

  if (parts.length > 8) {
    result += `-${parts.slice(8, 10)}`;
  }

  return result;
}

function isPhoneComplete(value: string) {
  return value.replace(/\D/g, '').length === 11;
}

export default function ModalForm({
  isOpen,
  onClose,
}: ModalFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialState);
      setErrors({});
      setSubmitMessage('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'phone') {
      setForm((prev) => ({
        ...prev,
        phone: formatPhone(value),
      }));

      setErrors((prev) => ({
        ...prev,
        phone: '',
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const nextErrors: Partial<FormState> = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Введите имя';
    }

    if (!isPhoneComplete(form.phone)) {
      nextErrors.phone = 'Введите корректный номер телефона';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Введите электронную почту';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Введите корректный email';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSubmitMessage('');

      const response = await fetch('/api/modalform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки формы');
      }

      setSubmitMessage('Заявка успешно отправлена');
      setForm(initialState);

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch {
      setSubmitMessage('Не удалось отправить заявку. Попробуйте ещё раз');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modalform-title">
      <div className={styles.modal__overlay} onClick={onClose} />

      <div className={styles.modal__body}>
        <button
          type="button"
          className={styles.modal__close}
          aria-label="Закрыть модальное окно"
          onClick={onClose}
        />

        <div className={styles.modal__content}>
          <div className={styles.modal__info}>
            <h2 id="modalform-title" className={styles.modal__title}>
              Запишитесь
              <br />
              на приём онлайн
            </h2>

            <p className={styles.modal__text}>
              Администратор свяжется с вами через WhatsApp в течение дня и уточнит детали
            </p>
          </div>

          <form className={styles.modal__form} onSubmit={handleSubmit} noValidate>
            <div className={styles.modal__field}>
              <input
                className={styles.modal__input}
                type="text"
                name="name"
                placeholder="ФИО"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <span className={styles.modal__error}>{errors.name}</span>}
            </div>

            <div className={styles.modal__field}>
              <input
                className={styles.modal__input}
                type="tel"
                name="phone"
                placeholder="Номер телефона"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className={styles.modal__error}>{errors.phone}</span>}
            </div>

            <div className={styles.modal__field}>
              <input
                className={styles.modal__input}
                type="email"
                name="email"
                placeholder="Электронная почта"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className={styles.modal__error}>{errors.email}</span>}
            </div>

            <button
              className={styles.modal__submit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Записаться'}
            </button>

            {submitMessage && (
              <p className={styles.modal__message}>{submitMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}