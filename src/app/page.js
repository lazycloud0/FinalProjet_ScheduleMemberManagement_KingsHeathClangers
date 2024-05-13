import LargeLogo from "../../components/logos/largeLogo";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <LargeLogo className={styles.largeLogo} />
    </main>
  );
}
