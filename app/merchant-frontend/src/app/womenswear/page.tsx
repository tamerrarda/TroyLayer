import Image from "next/image";
import Link from "next/link";
import SecondaryNavbar from "@/components/layout/SecondaryNavbar";
import ProductCard from "@/components/product/ProductCard";
import { GRID_PRODUCTS, PRADA_SKIRT } from "@/data/products";
import styles from "./page.module.css";

export const metadata = { title: "Womenswear | FARFETCH" };

export default function WomenswearPage() {
  const products = [
    {
      id: PRADA_SKIRT.id,
      brand: PRADA_SKIRT.brand,
      name: PRADA_SKIRT.name,
      price: PRADA_SKIRT.price,
      image: PRADA_SKIRT.images[0]!,
    },
    ...GRID_PRODUCTS.slice(0, 7),
  ];

  return (
    <>
      <SecondaryNavbar />
      <div className={styles.page}>
        {/* Hero Banner */}
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.heroSub}>New season, now</p>
            <h1 className={styles.heroTitle}>
              The edit that defines spring
            </h1>
            <p className={styles.heroDesc}>
              A curated selection of womenswear from the world&apos;s finest boutiques.
            </p>
            <Link href="#grid" className={styles.shopNowBtn}>
              Shop Now
            </Link>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=900&q=85"
              alt="Womenswear editorial"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div id="grid" className={styles.gridSection}>
          <div className={styles.gridHeader}>
            <p className={styles.gridTitle}>
              New in: handpicked daily from the world&apos;s best brands and boutiques
            </p>
            <Link href="#" className={styles.shopNow}>Shop Now</Link>
          </div>
          <div className={styles.productGrid}>
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
