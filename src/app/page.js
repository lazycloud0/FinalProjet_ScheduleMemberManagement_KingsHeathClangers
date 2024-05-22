import LargeLogo from "../../components/logos/largeLogo";
import styles from "./page.module.css";
import AuthButton from "../../components/auth/AuthButton.jsx";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
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

        <div
          className="flex-1 w-full flex flex-col gap-20 items-center"
          style={{ margin: "100px !important" }}
        >
          {/* <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16"> */}
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            {isSupabaseConnected && <AuthButton />}
          </div>
          {/* </nav> */}
        </div>
      </main>
    </>
  );
}
