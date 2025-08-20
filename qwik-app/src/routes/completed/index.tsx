import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { VerySlowComponent } from "~/components/very-slow-component";
import { generateMockTasks } from "~/utils";

const tasks = generateMockTasks(1000);

export default component$(() => {
  const filter = useSignal("all");

  const computeHeavy = (data: any[]) => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return data.map((item) => ({ ...item, computed: result }));
  };

  const filteredTasks = computeHeavy(
    filter.value === "all"
      ? tasks
      : filter.value === "completed"
        ? tasks.filter((task) => task.completed)
        : tasks.filter((task) => !task.completed),
  );

  return (
    <div class="p-4">
      <nav class="mb-4 flex gap-4">
        <Link href="/" class="text-blue-500">
          All Tasks
        </Link>
        <Link href="/completed" class="text-blue-500">
          Completed
        </Link>
        <Link href="/pending" class="text-blue-500">
          Pending
        </Link>
        <Link href="/stats" class="text-blue-500">
          Statistics
        </Link>
      </nav>
      <div>
        <select
          value={filter.value}
          onChange$={(e) =>
            (filter.value = (e.target as HTMLSelectElement).value)
          }
          class="mb-4 border p-2"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <VerySlowComponent />
        <div>
          {filteredTasks.map((task) => (
            <div key={task.id} class="mb-2 border p-2">
              {task.title} - {task.completed ? "Done" : "Pending"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
