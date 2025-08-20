import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Gallery } from "~/components/gallery";
import Tasks from "~/components/tasks";

export default component$(() => {
  const counter = useSignal(0);
  const handleToggleDarkMode = $(() => {
    document.documentElement.classList.toggle("dark");
    counter.value++;
  });
  return (
    <div class="flex flex-col gap-10">
      <div class="flex items-center gap-2">
        <button onClick$={handleToggleDarkMode}>Toggle Mode</button>
        <span>{counter.value}</span>
      </div>
      <Tasks />
      <Gallery />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
