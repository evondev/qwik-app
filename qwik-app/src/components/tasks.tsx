import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default component$(() => {
  const todos = useStore<Todo[]>([]);
  const input = useSignal<string>("");
  const filter = useSignal<"all" | "completed">("all");

  useVisibleTask$(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = localStorage.getItem("todos");
      if (saved) {
        todos.splice(0, todos.length, ...JSON.parse(saved));
      }
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => todos.length);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  const handleAddTodo = $((event: KeyboardEvent) => {
    if (event.key === "Enter" && input.value.trim()) {
      todos.push({
        id: Date.now(),
        text: input.value.trim(),
        completed: false,
      });
      input.value = "";
    }
  });

  const toggleTodo = $((id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  });

  const removeTodo = $((id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
  });

  const filteredTodos = () => {
    switch (filter.value) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div class="mx-auto flex w-full max-w-xl flex-col gap-5">
      <input
        type="text"
        placeholder="Enter your task"
        class="w-full rounded-lg border border-gray-200 p-3 transition-all outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-200/10 dark:text-white"
        value={input.value}
        onInput$={(e) => (input.value = (e.target as HTMLInputElement).value)}
        onKeyDown$={handleAddTodo}
      />
      <div class="flex gap-2">
        <button
          class={`rounded px-4 py-2 ${filter.value === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick$={() => (filter.value = "all")}
        >
          All
        </button>
        <button
          class={`rounded px-4 py-2 ${filter.value === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick$={() => (filter.value = "completed")}
        >
          Completed
        </button>
      </div>
      <div class="flex flex-col gap-2">
        {filteredTodos().map((todo, index) => (
          <div class="flex items-center justify-between gap-2" key={index}>
            <h3 class={`font-semibold ${todo.completed ? "line-through" : ""}`}>
              {todo.text}
            </h3>
            <div class="flex items-center gap-2">
              <button
                class="flex size-6 items-center justify-center"
                onClick$={() => removeTodo(todo.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange$={() => toggleTodo(todo.id)}
                class="h-5 w-5"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
