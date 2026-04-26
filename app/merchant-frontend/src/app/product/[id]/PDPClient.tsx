"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useBag } from "@/store/BagContext";
import type { Product } from "@/data/products";
import styles from "./page.module.css";

export default function PDPClient({ product }: { product: Product }) {
  const { addItem } = useBag();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [sizeError, setSizeError] = useState(false);

  function handleAddToBag() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize);
    setAdded(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Thumbnails */}
        <div className={styles.thumbnails}>
          {product.images.map((img, i) => (
            <button
              key={img}
              className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ""}`}
              onClick={() => setActiveImage(i)}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img} alt="" width={80} height={100} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className={styles.mainImage}>
          <Image
            src={product.images[activeImage]!}
            alt={`${product.brand} ${product.name}`}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Info panel */}
        <div className={styles.info}>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.name}>{product.name}</p>
          <p className={styles.price}>
            {product.currency} {product.price.toLocaleString("en-US")}
          </p>
          <p className={styles.duties}>Import duties included</p>

          <p className={styles.sizeGuide}>
            <Link href="#">Size guide →</Link>
          </p>

          {/* Size selector */}
          <div className={`${styles.sizeSelect} ${sizeError ? styles.sizeError : ""}`}>
            {!selectedSize ? (
              <select
                className={styles.select}
                value=""
                onChange={(e) => {
                  setSelectedSize(e.target.value);
                  setSizeError(false);
                }}
              >
                <option value="" disabled>Select size ▼</option>
                {product.sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ) : (
              <div className={styles.selectedSize}>
                <span>Size: {selectedSize}</span>
                <button onClick={() => { setSelectedSize(null); setAdded(false); }} className={styles.changeSize}>
                  Change
                </button>
              </div>
            )}
          </div>
          {sizeError && <p className={styles.sizeErrorMsg}>Please select a size</p>}

          {/* Add to Bag */}
          <button
            className={styles.addBtn}
            onClick={added ? () => {} : handleAddToBag}
          >
            {added ? (
              <Link href="/bag" className={styles.goToBag}>Go To Bag</Link>
            ) : (
              "Add To Bag"
            )}
          </button>

          {/* Delivery */}
          <div className={styles.delivery}>
            <p className={styles.deliveryLabel}>Estimated delivery</p>
            <p className={styles.deliveryDate}>May 6 – May 7</p>
          </div>

          {/* Returns banner */}
          <div className={styles.returns}>
            Free returns for 30 days | We can collect from your home
          </div>
        </div>
      </div>

      {/* Details accordion */}
      <div className={styles.accordion}>
        <button
          className={styles.accordionToggle}
          onClick={() => setDetailsOpen((v) => !v)}
        >
          <span>THE DETAILS</span>
          {detailsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {detailsOpen && (
          <div className={styles.accordionBody}>
            <div className={styles.detailsCols}>
              <div>
                <p className={styles.detailsTitle}>Highlights</p>
                <p className={styles.detailsDesc}>{product.description}</p>
                <ul className={styles.highlightList}>
                  {product.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
                <p className={styles.detailsMeta}>FARFETCH ID: {product.farfetchId}</p>
                <p className={styles.detailsMeta}>Brand style ID: {product.brandStyleId}</p>
              </div>
              <div>
                <p className={styles.detailsTitle}>Composition</p>
                <p className={styles.detailsDesc}>{product.composition}</p>
                <p className={styles.detailsTitle} style={{ marginTop: "1.6rem" }}>
                  Washing instructions
                </p>
                <p className={styles.detailsDesc}>Read Manufacturer Guidelines</p>
              </div>
            </div>
          </div>
        )}

        <button className={styles.accordionToggle}>
          <span>DELIVERY, RETURNS & SELLER</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}
