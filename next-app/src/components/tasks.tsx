import { generateMockTasks } from "@/utils";
import Link from "next/link";
import { useState } from "react";
import VerySlowComponent from "./very-slow-component";

const tasks = generateMockTasks(1000);

export default function Tasks() {
  const [filter, setFilter] = useState("all");

  const computeHeavy = (data: any[]) => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return data.map((item) => ({ ...item, computed: result }));
  };

  const filteredTasks = computeHeavy(
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed)
  );

  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-4">
        <Link href="/" className="text-blue-500">
          All Tasks
        </Link>
        <Link href="/completed" className="text-blue-500">
          Completed
        </Link>
        <Link href="/pending" className="text-blue-500">
          Pending
        </Link>
        <Link href="/stats" className="text-blue-500">
          Statistics
        </Link>
      </nav>
      <VerySlowComponent />

      <div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 p-2 border"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <div>
          {filteredTasks.map((task) => (
            <div key={task.id} className="border p-2 mb-2">
              {task.title} - {task.completed ? "Done" : "Pending"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
