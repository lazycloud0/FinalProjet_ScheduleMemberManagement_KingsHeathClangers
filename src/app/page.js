import styles from "./page.module.css";
import  {fetchGames}  from "./route.js";


export default function Home() {
  return (
    <main className={styles.main}>
      <p>Hello World</p>

      <button onClick={fetchGames}>Fetch Games</button>
    </main>
  );
}
