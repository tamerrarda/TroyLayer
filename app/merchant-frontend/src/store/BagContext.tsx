"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "@/data/products";

interface BagItem {
  product: Product;
  size: string;
  quantity: number;
}

interface BagContextValue {
  items: BagItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string) => void;
  count: number;
  subtotal: number;
}

const BagContext = createContext<BagContextValue | null>(null);

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("troy-bag");
      if (saved) setItems(JSON.parse(saved) as BagItem[]);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("troy-bag", JSON.stringify(items));
  }, [items]);

  function addItem(product: Product, size: string) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <BagContext.Provider value={{ items, addItem, removeItem, count, subtotal }}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag(): BagContextValue {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used within BagProvider");
  return ctx;
}
