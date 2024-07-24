import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signup } from "../actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <form className="flex flex-col gap-1 my-4" action={signup}>
        <input
          className="border-2 border-gray-400 rounded-lg p-2"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="border-2 border-gray-400 rounded-lg p-2"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="bg-primary rounded-lg py-2 cursor-pointer hover:brightness-[0.9] active:scale-[0.9] transition-all"
        >
          Submit
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link
          className="text-primary active:brightness-75 hover:underline"
          href="/login"
        >
          Click here to log in.
        </Link>
      </p>
    </div>
  );
}
