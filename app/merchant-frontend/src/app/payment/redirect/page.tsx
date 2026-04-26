"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import styles from "./page.module.css";

export default function PaymentRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/payment/troy"), 1500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.overlay}>
        <Spinner size={40} />
        <p className={styles.line1}>Please don&apos;t close this page.</p>
        <p className={styles.line2}>
          You&apos;re being redirected to complete your payment.
        </p>
      </div>
    </div>
  );
}
