import Image from "next/image";
import Link from "next/link";
import styles from "./MegaMenu.module.css";

const ACCESSORIES_COLS = [
  {
    heading: "ACCESSORIES",
    links: [
      "All accessories",
      "Sunglasses",
      "Hats",
      "Belts",
      "Wallets & cardholders",
      "Glasses & Frames",
      "Scarves",
      "Ties & bow ties",
      "Keyrings & chains",
      "Gloves",
      "Phone, computer & gadgets",
      "Cufflinks",
    ],
  },
  {
    heading: "JEWELRY",
    links: [
      "All jewelry",
      "All fine jewelry",
      "Bracelets",
      "Necklaces",
      "Rings",
      "Earrings",
    ],
  },
  {
    heading: "DISCOVER",
    links: [
      "New accessories & bags",
      "Gifts",
      "Ski Accessories",
      "Pre-owned accessories",
    ],
  },
];

const WOMENSWEAR_COLS = [
  {
    heading: "CLOTHING",
    links: ["All clothing", "Dresses", "Tops", "Knitwear", "Coats & Jackets", "Skirts", "Trousers", "Activewear"],
  },
  {
    heading: "SHOES",
    links: ["All shoes", "Heels", "Flats", "Trainers", "Boots", "Sandals"],
  },
  {
    heading: "DISCOVER",
    links: ["New in", "Sale", "Pre-owned", "Brands"],
  },
];

const MENSWEAR_COLS = [
  {
    heading: "CLOTHING",
    links: ["All clothing", "Suits", "Shirts", "Knitwear", "Coats & Jackets", "Trousers", "T-shirts"],
  },
  {
    heading: "SHOES",
    links: ["All shoes", "Trainers", "Boots", "Formal shoes", "Sandals"],
  },
  {
    heading: "DISCOVER",
    links: ["New in", "Sale", "Pre-owned", "Brands"],
  },
];

function getCols(dept: string) {
  if (dept === "Womenswear") return WOMENSWEAR_COLS;
  if (dept === "Menswear") return MENSWEAR_COLS;
  return ACCESSORIES_COLS;
}

export default function MegaMenu({ dept }: { dept: string }) {
  const cols = getCols(dept);

  return (
    <div className={styles.menu}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          {cols.map((col) => (
            <div key={col.heading} className={styles.col}>
              <p className={styles.colHeading}>{col.heading}</p>
              {col.links.map((link) => (
                <Link key={link} href="#" className={styles.link}>
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.spotlight}>
          <div className={styles.spotlightImg}>
            <Image
              src="https://picsum.photos/seed/spot1/300/200"
              alt="Spotlight"
              width={300}
              height={200}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <p className={styles.spotlightCaption}>Spotlight on</p>
          <p className={styles.spotlightTitle}>NEW SEASON</p>
          <Link href="#" className={styles.spotlightLink}>
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
