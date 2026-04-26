import Image from "next/image";
import Link from "next/link";
import SecondaryNavbar from "@/components/layout/SecondaryNavbar";
import ProductCard from "@/components/product/ProductCard";
import { MENSWEAR_GRID } from "@/data/products";
import styles from "../womenswear/page.module.css";

export const metadata = { title: "Menswear | FARFETCH" };

export default function MenswearPage() {
  return (
    <>
      <SecondaryNavbar />
      <div className={styles.page}>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.heroSub}>New season, now</p>
            <h1 className={styles.heroTitle}>Refined. Elevated. Modern.</h1>
            <p className={styles.heroDesc}>
              The finest menswear from the world&apos;s greatest boutiques, curated for you.
            </p>
            <Link href="#grid" className={styles.shopNowBtn}>
              Shop Now
            </Link>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&q=85"
              alt="Menswear editorial"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div id="grid" className={styles.gridSection}>
          <div className={styles.gridHeader}>
            <p className={styles.gridTitle}>
              New in: handpicked daily from the world&apos;s best brands and boutiques
            </p>
            <Link href="#" className={styles.shopNow}>Shop Now</Link>
          </div>
          <div className={styles.productGrid}>
            {MENSWEAR_GRID.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
