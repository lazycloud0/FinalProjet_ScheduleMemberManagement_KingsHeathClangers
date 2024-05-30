// import React from "react";
import LargeLogo from "../../../components/logos/largeLogo";
import styles from "./login.module.css";

// import LoginForm from "/components/loginform/loginform.jsx";

// export default function Login() {
//   return (
//     <div className={styles.LoginPage}>
//       <div className={styles.container}>
//         <LargeLogo className={styles.largeLogo} />
//         <LoginForm />
//       </div>
//     </div>
//   );
// }

import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.container}>
          <LargeLogo className={styles.largeLogo} />
          <form className={styles.form}>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <span>
              <button formAction={login} className={styles.loginButton}>
                Log in
              </button>
              <button formAction={signup} className={styles.loginButton}>
                Sign up
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

// export default function Login({ searchParams }) {
//   async function signIn(formData) {
//     "use server";

//     const email = formData.get("email");
//     const password = formData.get("password");
//     const supabase = createClient();

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       return redirect("/login?message=Could not authenticate user");
//     }

//     return redirect("/protected");
//   }

//   const signUp = async (formData) => {
//     "use server";

//     const origin = headers().get("origin");
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const supabase = createClient();

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: `${origin}/auth/callback`,
//       },
//     });

//     if (error) {
//       return redirect("/login?message=Could not authenticate user");
//     }

//     return redirect("/login?message=Check email to continue sign in process");
//   };

//   return (
//     <div
//       className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2"
//       style={{ marginTop: "100px !important" }}
//     >
//       <Link
//         href="/"
//         className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
//         >
//           <polyline points="15 18 9 12 15 6" />
//         </svg>{" "}
//         Back
//       </Link>

//       <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
//         <label className="text-md" htmlFor="email">
//           Email
//         </label>
//         <input
//           className="rounded-md px-4 py-2 bg-inherit border mb-6"
//           name="email"
//           placeholder="you@example.com"
//           required
//         />
//         <label className="text-md" htmlFor="password">
//           Password
//         </label>
//         <input
//           className="rounded-md px-4 py-2 bg-inherit border mb-6"
//           type="password"
//           name="password"
//           placeholder="••••••••"
//           required
//         />
//         <SubmitButton
//           formAction={signIn}
//           className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
//           pendingText="Signing In..."
//         >
//           Sign In
//         </SubmitButton>
//         <SubmitButton
//           formAction={signUp}
//           className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
//           pendingText="Signing Up..."
//         >
//           Sign Up
//         </SubmitButton>
//         {searchParams?.message && (
//           <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
//             {searchParams.message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }
