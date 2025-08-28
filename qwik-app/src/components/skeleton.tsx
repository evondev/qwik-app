import { component$ } from "@builder.io/qwik";

export const Skeleton = component$(() => {
  return (
    <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          class="h-[480px] animate-pulse rounded-xl bg-gray-200"
        ></div>
      ))}
    </div>
  );
});
