"use client";

import { useOptimistic } from "react";
import { createTask, deleteTask } from "@/app/actions";
import { Task } from "./Task";

export function TaskList({ tasks }: any) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
    (state, { action, task }: { action: string; task: any }) => {
      switch (action) {
        case "add":
          return [...state, task];
        case "delete":
          return state.filter(({ id }: any) => id !== task.id);
      }
    }
  );

  return (
    <div className="flex flex-col gap-1 w-[100%]">
      <form
        className="flex justify-between w-[100%] items-center text-lg pl-3 bg-white rounded-lg my-4"
        action={async (formData: FormData) => {
          setOptimisticTasks({
            action: "add",
            task: { task: formData.get("newTask") as string },
          });

          await createTask(formData);
        }}
      >
        <input
          type="text"
          name="newTask"
          placeholder="What's on your mind today?"
          className="focus:outline-none w-[100%]"
        />
        <button
          type="submit"
          className="bg-green rounded-r-lg py-1 w-8 text-center"
        >
          +
        </button>
      </form>
      {optimisticTasks?.map((task: any) => {
        return <Task task={task} key={task.id} />;
      })}
    </div>
  );
}
