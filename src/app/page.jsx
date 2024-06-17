import LargeLogo from "../../components/logos/largeLogo";
import styles from "./page.module.css";
import AuthButton from "../../components/auth/AuthButton.jsx";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <main className={styles.main}>
      <section className={styles.welcome}>
        <h1 className={styles.title}>WELCOME TO THE HOME OF</h1>
        <LargeLogo className={styles.largeLogo} />
        {isSupabaseConnected && <AuthButton />}
      </section>
    </main>
  );
}
