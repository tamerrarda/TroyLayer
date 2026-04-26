import styles from "./page.module.css";

export const metadata = { title: "Wishlist | FARFETCH" };

export default function WishlistPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Wishlist</h1>
      <p className={styles.desc}>
        Sign in or create an account to save your favourite items.
      </p>
      <button className={styles.signInBtn}>Sign In</button>
    </div>
  );
}
