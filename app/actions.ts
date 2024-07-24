"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function login(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function deleteTask(formData: FormData) {
  const supabase = createClient();

  const id = formData.get("id") as string;

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.log(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function createTask(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const newTask = formData.get("newTask") as string;

  const { error } = await supabase
    .from("tasks")
    .insert({ user_id: user?.id, task: newTask });

  if (error) {
    console.log(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateTask(formData: FormData) {
  const supabase = createClient();

  const data = {
    task: formData.get("task") as string,
    id: formData.get("id"),
  };

  const { error } = await supabase
    .from("tasks")
    .update({ task: data.task })
    .eq("id", data.id);

  if (error) {
    console.log(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
