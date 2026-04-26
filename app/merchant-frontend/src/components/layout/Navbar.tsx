"use client";

import Link from "next/link";
import { Search, Globe, User, Heart, ShoppingBag } from "lucide-react";
import { useBag } from "@/store/BagContext";
import MegaMenu from "./MegaMenu";
import { useState } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Womenswear", href: "/womenswear" },
  { label: "Menswear", href: "/menswear" },
  { label: "Kidswear", href: "/kidswear" },
];

export default function Navbar() {
  const { count } = useBag();
  const [megaMenu, setMegaMenu] = useState<string | null>(null);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Left cluster */}
        <div className={styles.left}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onMouseEnter={() => setMegaMenu(link.label)}
              onMouseLeave={() => setMegaMenu(null)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center logo */}
        <Link href="/" className={styles.logo}>
          FARFETCH
        </Link>

        {/* Right cluster */}
        <div className={styles.right}>
          <div className={styles.searchWrap}>
            <Search size={14} className={styles.searchIcon} />
            <input
              className={styles.search}
              placeholder="What are you looking for?"
              aria-label="Search"
            />
          </div>
          <button className={styles.iconBtn} aria-label="Language">
            <Globe size={20} />
          </button>
          <button className={styles.iconBtn} aria-label="Account">
            <User size={20} />
          </button>
          <button className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={20} />
          </button>
          <Link href="/bag" className={styles.iconBtn} aria-label="Bag">
            <ShoppingBag size={20} />
            {count > 0 && <span className={styles.badge}>{count}</span>}
          </Link>
        </div>
      </nav>

      {megaMenu && (
        <div
          onMouseEnter={() => setMegaMenu(megaMenu)}
          onMouseLeave={() => setMegaMenu(null)}
        >
          <MegaMenu dept={megaMenu} />
        </div>
      )}
    </header>
  );
}
