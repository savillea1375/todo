import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: tasks } = await supabase.from("tasks").select("*");

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      {tasks?.map((task) => {
        <div className="text-2xl font-semibold">{task.task}</div>;
      })}
      <h1>Hello, World</h1>
    </>
  );
}
