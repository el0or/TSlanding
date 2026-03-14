import styles from './Faq.module.css';
import faqData from './faqData.json';

type FaqItem = {
    id: number;
    title: string;
    content: string[];
};

export default function Faq() {
    return (
        <section className={styles.faq}>
            <h2 className={styles.title}>Часто задаваемые вопросы</h2>
            <div className={styles.list}>
                {(faqData as FaqItem[]).map((item) => (
                    <details key={item.id} className={styles.item}>

                        <summary className={styles.summary}>
                            <span>{item.title}</span>
                            <span className={styles.icon}></span>
                        </summary>

                        <div className={styles.content}>
                            {item.content.map((text, index) => (
                                <p key={index}>{text}</p>
                            ))}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    )
}