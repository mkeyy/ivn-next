import styles from "../styles/modules/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <a
          className={styles.createdBy}
          href="https://ivision.pl/"
          target="_blank"
          rel="noreferrer"
          title="IVN - Agencja Interaktywna - Kraków"
        >
          Created by IVN™
        </a>

        <div className={styles.links}>
          <a
            className={styles.solid}
            href="https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress"
            target="_blank"
            rel="noreferrer"
          >
            Official Examples
          </a>

          <a
            href="https://www.youtube.com/watch?v=zJqtmUm6oGE"
            target="_blank"
            rel="noreferrer"
          >
            Tutorial on Youtube
          </a>
        </div>
      </div>
    </footer>
  );
}
