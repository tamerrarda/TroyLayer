"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  currency?: string;
}

export default function ProductCard({
  id,
  brand,
  name,
  price,
  image,
  currency = "USD",
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <Link href={`/product/${id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={`${brand} ${name}`}
          fill
          sizes="(max-width: 1440px) 25vw"
          style={{ objectFit: "cover" }}
          className={styles.image}
        />
        <button
          className={`${styles.heart} ${wishlisted ? styles.heartActive : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((v) => !v);
          }}
          aria-label="Add to wishlist"
        >
          <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>
      <p className={styles.brand}>{brand}</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>
        {currency} {price.toLocaleString("en-US")}
      </p>
    </Link>
  );
}
