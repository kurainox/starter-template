import styles from "./page.module.css";
import { openSans } from "@/global/fonts";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={`${openSans.className}`}>Landing page</section>
    </main>
  );
}
