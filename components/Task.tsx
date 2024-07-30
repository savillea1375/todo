"use client";

import { deleteTask, updateTask } from "@/app/actions";
import { useState, useOptimistic } from "react";

export function Task(props: any) {
  const task = props.task;
  const [input, setInput] = useState(task.task);

  return (
    <div
      key={task.id}
      className="flex justify-between items-center text-lg pl-3 bg-white rounded-lg"
    >
      <form className="w-[100%]" action={updateTask}>
        <input
          className="focus:outline-none w-[100%]"
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="task"
          value={input}
        />
        <input type="hidden" name="id" value={task.id} />
      </form>
      <form action={deleteTask}>
        <input type="hidden" name="id" value={task.id} />
        <button
          type="submit"
          className="bg-error rounded-r-lg py-1 w-8 text-center"
        >
          X
        </button>
      </form>
    </div>
  );
}
