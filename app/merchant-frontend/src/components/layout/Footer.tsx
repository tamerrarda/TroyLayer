import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";
import styles from "./Footer.module.css";

const FOOTER_COLS = [
  {
    heading: "Customer Service",
    links: [
      "Contact us",
      "FAQs",
      "Orders and delivery",
      "Returns and refunds",
      "Payment and pricing",
      "Cryptocurrency payments",
      "Promotion terms",
      "FARFETCH Customer Promise",
    ],
  },
  {
    heading: "About FARFETCH",
    links: [
      "About us",
      "FARFETCH partner boutiques",
      "Careers",
      "FARFETCH app",
      "Modern slavery statement",
      "FARFETCH Advertising",
      "Sitemap",
    ],
  },
  {
    heading: "Discounts and membership",
    links: [
      "Affiliate program",
      "Refer a friend",
      "FARFETCH membership",
      "Student Beans and Graduates",
    ],
  },
  {
    heading: "Content and services",
    links: [
      "Second Life: sell your designer bags",
      "Fashion Feed: the latest style stories",
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className={styles.col}>
              <p className={styles.colHeading}>{col.heading}</p>
              {col.links.map((link) => (
                <Link key={link} href="#" className={styles.link}>
                  {link}
                </Link>
              ))}
            </div>
          ))}
          <div className={styles.col}>
            <p className={styles.colHeading}>Follow us</p>
            <div className={styles.social}>
              <Link href="#" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube size={20} />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.legal}>
          <div className={styles.legalLinks}>
            <Link href="#" className={styles.legalLink}>Privacy policy</Link>
            <Link href="#" className={styles.legalLink}>Terms and conditions</Link>
            <Link href="#" className={styles.legalLink}>Accessibility</Link>
            <Link href="#" className={styles.legalLink}>
              Protection of Intellectual Property
            </Link>
          </div>
          <p className={styles.copyright}>
            &apos;FARFETCH&apos; and the &apos;FARFETCH&apos; logo are trade marks of FARFETCH UK Limited and are registered in numerous jurisdictions around the world.
          </p>
          <p className={styles.copyright}>
            © Copyright 2026 FARFETCH UK Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
