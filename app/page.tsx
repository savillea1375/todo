import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const { data: tasks } = await supabase.from("tasks").select("*");
  console.log(tasks);

  return (
    <>
      {tasks?.map((task) => {
        <div className="text-2xl font-semibold">{task.task}</div>;
      })}
      <h1>Hello, World</h1>
    </>
  );
}
