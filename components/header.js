import Link from "next/link";

import styles from "../styles/modules/Header.module.css";

export default function Header({ menuItems: { menuItems } }) {
  if (!menuItems) return;

  return (
    <header className={styles.header}>
      <ul className={styles.menu}>
        {menuItems.edges.map((link) => (
          <li className={styles.link} key={link?.node?.path}>
            <Link
              href={link?.node?.path === "/homepage/" ? "/" : link?.node?.path}
            >
              <a target={link?.node?.target}>{link?.node?.label}</a>
            </Link>
          </li>
        ))}
      </ul>

      <p className={styles.title}>
        IVN example using{" "}
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          Next.js
        </a>{" "}
        and{" "}
        <a href="https://wordpress.org/" target="_blank" rel="noreferrer">
          WordPress
        </a>
      </p>
    </header>
  );
}
