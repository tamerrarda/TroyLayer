import Image from "next/image";
import Link from "next/link";
import { User, HelpCircle, MessageCircle } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { DEPT_TILES, DEPT_STRIPS, GRID_PRODUCTS } from "@/data/products";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Department Selector */}
      <section className={styles.deptSelector}>
        <p className={styles.chooseDept}>Choose a department</p>
        <div className={styles.deptGrid}>
          {DEPT_TILES.map((tile) => (
            <Link key={tile.dept} href={tile.href} className={styles.deptTile}>
              <Image
                src={tile.image}
                alt={tile.dept}
                fill
                sizes="33vw"
                style={{ objectFit: "cover" }}
                priority
              />
              <span className={styles.deptLabel}>{tile.dept}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Womenswear Strip */}
      <section className={styles.deptStrip}>
        <h2 className={styles.stripHeading}>Womenswear</h2>
        <div className={styles.stripGrid}>
          {DEPT_STRIPS.map((item) => (
            <Link key={item.label} href="/womenswear" className={styles.stripItem}>
              <div className={styles.stripImgWrap}>
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className={styles.stripLabel}>{item.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Menswear Strip */}
      <section className={styles.deptStrip}>
        <h2 className={styles.stripHeading}>Menswear</h2>
        <div className={styles.stripGrid}>
          {[
            { label: "NEW IN", image: "https://picsum.photos/seed/mi1/320/400" },
            { label: "CLOTHING", image: "https://picsum.photos/seed/mi2/320/400" },
            { label: "SHOES", image: "https://picsum.photos/seed/mi3/320/400" },
            { label: "BAGS", image: "https://picsum.photos/seed/mi4/320/400" },
          ].map((item) => (
            <Link key={item.label} href="/menswear" className={styles.stripItem}>
              <div className={styles.stripImgWrap}>
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className={styles.stripLabel}>{item.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Info Boxes */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <User size={20} className={styles.infoIcon} />
            <p className={styles.infoTitle}>HOW TO SHOP</p>
            <p className={styles.infoDesc}>Your guide to shopping and placing orders</p>
          </div>
          <div className={styles.infoBox}>
            <HelpCircle size={20} className={styles.infoIcon} />
            <p className={styles.infoTitle}>FAQS</p>
            <p className={styles.infoDesc}>Your questions answered</p>
          </div>
          <div className={styles.infoBox}>
            <MessageCircle size={20} className={styles.infoIcon} />
            <p className={styles.infoTitle}>NEED HELP?</p>
            <p className={styles.infoDesc}>
              Contact our global Customer Service team
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <div className={styles.newsletterLeft}>
            <h2 className={styles.newsletterHeading}>Never miss a thing</h2>
            <p className={styles.newsletterDesc}>
              Sign up for promotions, tailored new arrivals, stock updates and more –
              straight to your inbox
            </p>
          </div>
          <div className={styles.newsletterRight}>
            <p className={styles.newsletterLabel}>
              GET UPDATES BY <strong>Email</strong>
            </p>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.newsletterInput}
              aria-label="Email address"
            />
            <button className={styles.newsletterBtn}>Sign Up</button>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <p className={styles.featuredText}>
            New in: handpicked daily from the world&apos;s best brands and boutiques
          </p>
          <Link href="/womenswear" className={styles.shopNow}>
            Shop Now
          </Link>
        </div>
        <div className={styles.productGrid}>
          {GRID_PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              brand={p.brand}
              name={p.name}
              price={p.price}
              image={p.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
