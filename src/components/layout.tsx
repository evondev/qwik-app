import { component$, Slot } from "@builder.io/qwik";
import { Sidebar } from "./common/sidebar";

export const Layout = component$(() => {
  return (
    <div class="grid h-screen grid-cols-[300px_minmax(0,1fr)]">
      <Sidebar />
      <div class="mx-auto w-full max-w-screen-2xl px-5 py-10 lg:px-8">
        <Slot />
      </div>
    </div>
  );
});
