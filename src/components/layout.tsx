import { component$, Slot } from "@builder.io/qwik";
import { Sidebar } from "./common/sidebar";

export const Layout = component$(() => {
  return (
    <div class="grid h-screen grid-cols-[300px_minmax(0,1fr)]">
      <Sidebar />
      <div class="p-5">
        <Slot />
      </div>
    </div>
  );
});
