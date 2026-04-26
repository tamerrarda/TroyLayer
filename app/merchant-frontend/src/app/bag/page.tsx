"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useBag } from "@/store/BagContext";
import ProductCard from "@/components/product/ProductCard";
import { GRID_PRODUCTS } from "@/data/products";
import styles from "./page.module.css";

export default function BagPage() {
  const { items, removeItem, subtotal } = useBag();
  const delivery = 23;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyHeader}>
          <h1 className={styles.title}>Shopping Bag</h1>
          <Link href="/womenswear" className={styles.continueShopping}>
            Continue Shopping →
          </Link>
        </div>
        <p className={styles.emptyDesc}>
          There&apos;s nothing in your bag yet. Sign in or create an account to
          unlock members-only rewards and personalised recommendations.
        </p>
        <div className={styles.emptyActions}>
          <Link href="/menswear" className={styles.emptyBtn}>Shop Men</Link>
          <Link href="/womenswear" className={styles.emptyBtn}>Shop New in</Link>
        </div>
        <button className={styles.signInBtn}>Sign In</button>

        <div className={styles.recommendations}>
          <div className={styles.recoHeader}>
            <p className={styles.recoTitle}>Recommendations</p>
            <button className={styles.showMore}>Show More</button>
          </div>
          <div className={styles.recoGrid}>
            {GRID_PRODUCTS.slice(0, 4).map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.filledHeader}>
        <h1 className={styles.title}>Shopping Bag</h1>
        <Link href="/womenswear" className={styles.continueShopping}>
          Continue Shopping →
        </Link>
      </div>

      <div className={styles.importNotice}>
        Import duties are included ⓘ
      </div>

      <div className={styles.layout}>
        {/* Items */}
        <div className={styles.items}>
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}`} className={styles.item}>
              <div className={styles.itemImage}>
                <Image
                  src={item.product.images[0]!}
                  alt={item.product.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.itemTop}>
                  <div>
                    <p className={styles.itemBrand}>{item.product.brand}</p>
                    <p className={styles.itemName}>{item.product.name}</p>
                    <p className={styles.itemMeta}>FARFETCH ID: {item.product.farfetchId}</p>
                  </div>
                  <div className={styles.itemRight}>
                    <p className={styles.itemPrice}>
                      ${item.product.price.toLocaleString("en-US")}
                    </p>
                    <p className={styles.itemDuties}>Import duties included</p>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.product.id)}
                      aria-label="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className={styles.itemBottom}>
                  <p className={styles.itemSizeQty}>
                    Size: {item.size} &nbsp;|&nbsp; Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className={styles.summary}>
          <div className={styles.summaryInner}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery</span>
              <span>${delivery.toFixed(2)}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>USD ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <p className={styles.dutiesNote}>Import duties included</p>

            <Link href="/checkout" className={styles.checkoutBtn}>
              Go To Checkout
            </Link>
            <p className={styles.returnsNote}>
              Free returns for 30 days | We can collect from your home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
