import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Task } from "@/components/Task";
import { createTask } from "./actions";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at");

  return (
    <>
      <div className="mx-auto py-2 flex flex-col items-center w-[75%] shadow-md rounded-lg bg-gray-100">
        <h1 className="text-2xl font-semibold">Todo</h1>
        <form id="createForm" action={createTask}>
          <input
            type="text"
            name="newTask"
            placeholder="What's on your mind today?"
          />
          <button type="submit">Add</button>
        </form>
        <div className="flex flex-col gap-1 p-2 w-[100%]">
          {data?.map((task: any) => {
            return <Task key={task.id} task={task} />;
          })}
        </div>
      </div>
    </>
  );
}
