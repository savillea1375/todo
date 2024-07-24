import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/actions";

export async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex justify-between px-4 my-2 items-center">
      <Link
        href="/"
        className="text-primary text-3xl font-semibold hover:bg-gray-200 rounded-lg px-4 py-2 cursor-pointer active:scale-[0.90] transition-transform"
      >
        Todo
      </Link>
      {!user && (
        <div className="flex gap-1 w-[25%] justify-end">
          <Link
            href="/login"
            className="bg-gray-400 flex-1 rounded-lg py-3 w-[100%] max-w-[5rem] text-center text-white hover:brightness-[0.9] active:scale-[0.9] transition-all"
          >
            Log In
          </Link>
          <Link
            className="bg-primary flex-1 rounded-lg py-3 w-[100%] max-w-[5rem] text-center text-white hover:brightness-[0.9] active:scale-[0.9] transition-all"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      )}
      {user && (
        <form className="w-100%" action={signOut}>
          <button
            type="submit"
            className="bg-gray-400 flex-1 rounded-lg px-2 py-3 w-[100%] max-w-[5rem] text-center text-white hover:brightness-[0.9] active:scale-[0.9] transition-all"
          >
            Sign Out
          </button>
        </form>
      )}
    </div>
  );
}
