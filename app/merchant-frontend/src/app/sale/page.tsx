import Link from "next/link";
import SecondaryNavbar from "@/components/layout/SecondaryNavbar";
import ProductCard from "@/components/product/ProductCard";
import { GRID_PRODUCTS } from "@/data/products";
import styles from "./page.module.css";

export const metadata = { title: "Sale | FARFETCH" };

const FILTER_CHIPS = [
  "All Filters",
  "Clothing",
  "Shoes",
  "Accessories",
  "Bags",
  "Jewelry",
  "Underwear & Socks",
  "Pre-Owned",
  "Activewear",
];

export default function SalePage() {
  return (
    <>
      <SecondaryNavbar />
      <div className={styles.page}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> &gt; Sale
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>The FARFETCH sale</h1>
          <p className={styles.desc}>
            Your style, our unique curation. Start exploring this season&apos;s
            highlights with up to 70% off selected styles now.
          </p>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.tabActive}`}>Shop Women</button>
            <button className={styles.tab}>Shop Men</button>
          </div>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.chips}>
            {FILTER_CHIPS.map((chip) => (
              <button key={chip} className={styles.chip}>
                {chip} {chip === "All Filters" && "▼"}
              </button>
            ))}
          </div>
          <button className={styles.sortBtn}>Sort by ▼</button>
        </div>

        <div className={styles.productGrid}>
          {GRID_PRODUCTS.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </>
  );
}
