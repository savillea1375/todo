import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TaskList } from "@/components/TaskList";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at");

  return (
    <>
      <div className="mx-auto p-4 flex flex-col items-center max-w-[660px] w-[75%] shadow-md rounded-lg bg-gray-100">
        <h1 className="text-2xl font-semibold">Todo</h1>
        <TaskList tasks={tasks}></TaskList>
      </div>
    </>
  );
}
