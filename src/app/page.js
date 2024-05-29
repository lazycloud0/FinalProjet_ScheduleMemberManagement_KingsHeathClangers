import LargeLogo from "../../components/logos/largeLogo";
import styles from "./page.module.css";
//import Link from "next/link";
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
    <>
      <main className={styles.main}>
        <LargeLogo className={styles.largeLogo} />

        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </main>
    </>
  );
}
