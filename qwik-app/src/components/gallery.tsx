import { component$ } from "@builder.io/qwik";

export const Gallery = component$(() => {
  console.log("re-renders");
  return (
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          class="rounded-lg border border-gray-200 p-4 dark:border-gray-200/10"
        >
          <img
            src="https://images.unsplash.com/photo-1538998073820-4dfa76300194?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            width={400}
            height={400}
          />
        </div>
      ))}
    </div>
  );
});
