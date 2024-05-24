import LargeLogo from "../../components/logos/largeLogo";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <h1>Welcome to the home of</h1>
      <h1>Kings Heat Clangers</h1> */}
      <LargeLogo className={styles.largeLogo} />
      <button className={styles.loginButton}>
        <Link href="/login" className={styles.linkDecoration}>
          LOGIN
        </Link>
      </button>
    </main>
  );
}
