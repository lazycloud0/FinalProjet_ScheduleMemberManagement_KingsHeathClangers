"use server";

//import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  //const data = {
  const email = formData.get("email");
  const password = formData.get("password");
  //

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/error");
  }

  //revalidatePath("/", "layout");
  redirect("/");

  // error handling
}

export async function signup(formData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  //const data = {
  const email = formData.get("email");
  const password = formData.get("password");
  //};

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log(error);
    //redirect("/error");
    // error for signing up twice
    // error handling (account existing, etc)
  }

  //revalidatePath("/", "layout");
  // return true
  redirect("/");
}
