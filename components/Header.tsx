import Link from "next/link";

export function Header() {
  return (
    <div className="flex justify-between px-4 my-2 items-center">
      <Link
        href="/"
        className="text-primary text-3xl font-semibold hover:bg-gray-200 rounded-lg px-4 py-2 cursor-pointer active:scale-[0.90] transition-transform"
      >
        Todo
      </Link>
      <div className="flex gap-2 w-[12.5%]">
        <form className="flex-1" action="">
          <button className="bg-gray-400 rounded-lg py-3 w-[100%] text-white hover:brightness-[0.8] active:scale-[0.9] transition-all">
            Log In
          </button>
        </form>
        <form className="flex-1" action="">
          <button className="bg-primary rounded-lg py-3 w-[100%] hover:brightness-[0.8] active:scale-[0.9] transition-all">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
