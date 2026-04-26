import Image from "next/image";
import { PRADA_SKIRT } from "@/data/products";
import styles from "./OrderSummaryPanel.module.css";

interface Props {
  ctaLabel: string;
  onCta: () => void;
  total: number;
  subtotal: number;
  delivery: number;
  disabled?: boolean;
}

export default function OrderSummaryPanel({
  ctaLabel,
  onCta,
  total,
  subtotal,
  delivery,
  disabled = false,
}: Props) {
  return (
    <aside className={styles.panel}>
      <p className={styles.totalLabel}>Total</p>
      <p className={styles.totalAmount}>
        USD ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>

      <button className={styles.cta} onClick={onCta} disabled={disabled}>
        {ctaLabel}
      </button>

      <p className={styles.terms}>
        By placing your order, you agree to our{" "}
        <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
      </p>

      <div className={styles.divider} />

      <p className={styles.summaryLabel}>Summary</p>

      <div className={styles.product}>
        <div className={styles.productImg}>
          <Image
            src={PRADA_SKIRT.images[0]!}
            alt="Prada skirt"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productBrand}>{PRADA_SKIRT.brand}</p>
          <p className={styles.productPrice}>
            ${PRADA_SKIRT.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span>Delivery</span>
          <span>${delivery.toFixed(2)}</span>
        </div>
        <div className={styles.divider} />
        <div className={`${styles.row} ${styles.rowTotal}`}>
          <span>Total</span>
          <span>USD ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </div>
        <p className={styles.dutiesNote}>Import duties included</p>
      </div>

      <div className={styles.promo}>
        <p className={styles.promoLabel}>Promo code</p>
        <input
          type="text"
          placeholder="Enter promo code"
          className={styles.promoInput}
          aria-label="Promo code"
        />
        <a href="#" className={styles.referral}>
          Been referred? Get your referral offer
        </a>
      </div>

      <div className={styles.returns}>
        <span>30-day returns</span>
        <span className={styles.free}>Free</span>
      </div>
    </aside>
  );
}
