import Link from "next/link";
import styles from "./SecondaryNavbar.module.css";

const SECONDARY_LINKS = [
  { label: "New in", href: "#" },
  { label: "Brands", href: "#" },
  { label: "Clothing", href: "#" },
  { label: "Shoes", href: "#" },
  { label: "Bags", href: "#" },
  { label: "Accessories", href: "#" },
  { label: "Jewelry", href: "#" },
  { label: "Lifestyle", href: "#" },
  { label: "Pre-owned", href: "#" },
  { label: "Sale", href: "/sale", sale: true },
];

export default function SecondaryNavbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {SECONDARY_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`${styles.link} ${link.sale ? styles.sale : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
